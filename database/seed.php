<?php
/**
 * One-time seed migration. Reads seed-data.json (exported verbatim from the
 * old React constants by export-data.mjs) and:
 *
 *   1. copies faculty photos / news images into public/uploads/ with safe
 *      slugged filenames (idempotent — skips files already copied),
 *   2. wipes and re-seeds the local dev database (SQLite or MySQL, whatever
 *      config.local.php points at),
 *   3. writes database/seed.sql — a MySQL dump to import once via phpMyAdmin
 *      on Hostinger (there is no SSH to run this script on the server).
 *
 * Run from the repo root:  php database/seed.php
 * Admin password: set ADMIN_PASSWORD env var, otherwise one is generated and
 * printed once — save it.
 */

if (PHP_SAPI !== 'cli') {
    exit("Jalankan dari CLI: php database/seed.php\n");
}

require dirname(__DIR__) . '/app/bootstrap.php';

use App\Core\Database;
use App\Core\Html;

$data = json_decode(file_get_contents(__DIR__ . '/seed-data.json'), true);
if (!$data) {
    exit("seed-data.json tidak ditemukan/tidak valid. Jalankan: node database/export-data.mjs\n");
}

$publicDir = APP_ROOT . '/public';

/** Collected [table, row] pairs so the MySQL dump matches the dev DB exactly. */
$dump = [];

/** Tables without an auto-increment `id` column (composite primary key instead). */
const NO_ID_TABLES = ['page_fields'];

function seedInsert(string $table, array $row): int
{
    global $dump;
    $id = Database::insert($table, $row);
    // Record the actual id explicitly so seed.sql assigns the SAME ids on
    // MySQL as the dev DB used — otherwise foreign keys (category_id,
    // news_id, year_id, semester_id, ...) drift out of sync whenever this
    // script has been re-run before (SQLite's AUTOINCREMENT counter is not
    // reset by DELETE, so re-seeding a dev DB keeps inflating ids).
    $dump[] = [$table, in_array($table, NO_ID_TABLES, true) ? $row : ['id' => $id] + $row];
    return $id;
}

function slugify(string $text): string
{
    $slug = strtolower(trim($text));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    return trim($slug, '-');
}

function parseIndonesianDate(string $date): string
{
    static $months = [
        'januari' => 1, 'februari' => 2, 'maret' => 3, 'april' => 4,
        'mei' => 5, 'juni' => 6, 'juli' => 7, 'agustus' => 8,
        'september' => 9, 'oktober' => 10, 'november' => 11, 'desember' => 12,
    ];
    if (preg_match('/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i', trim($date), $m)) {
        $month = $months[strtolower($m[2])] ?? null;
        if ($month !== null) {
            return sprintf('%04d-%02d-%02d', $m[3], $month, $m[1]);
        }
    }
    throw new RuntimeException("Tanggal tidak dikenali: $date");
}

/** Copy an image into uploads/ and return its public path. */
function copyImage(string $source, string $subdir, string $slugBase): string
{
    global $publicDir;
    $ext = strtolower(pathinfo($source, PATHINFO_EXTENSION));
    $dir = "$publicDir/uploads/$subdir";
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    $name = slugify($slugBase) . '.' . $ext;
    $dest = "$dir/$name";
    if (!is_file($dest)) {
        if (!is_file($source)) {
            throw new RuntimeException("Gambar sumber tidak ada: $source");
        }
        copy($source, $dest);
    }
    return "/uploads/$subdir/$name";
}

$now = Database::now();

// ---------------------------------------------------------------- wipe tables
$tables = [
    'news_gallery', 'news', 'news_categories', 'faculty_items', 'faculty',
    'curriculum_courses', 'curriculum_semesters', 'curriculum_years',
    'graduate_profiles', 'page_fields', 'page_items', 'admin_users',
];
foreach ($tables as $t) {
    Database::run("DELETE FROM $t");
}
// SQLite's AUTOINCREMENT counter survives DELETE — reset it so re-running
// this script keeps producing the same, predictable ids (1, 2, 3, ...).
if ((APP_CONFIG['db']['driver'] ?? 'mysql') === 'sqlite') {
    Database::run(
        'DELETE FROM sqlite_sequence WHERE name IN (' . implode(',', array_fill(0, count($tables), '?')) . ')',
        $tables
    );
}

// ------------------------------------------------------------------ categories
$categoryIds = [];
foreach (array_unique(array_column($data['news'], 'category')) as $cat) {
    $categoryIds[$cat] = seedInsert('news_categories', [
        'name' => $cat,
        'slug' => slugify($cat),
    ]);
}

// ------------------------------------------------------------------------ news
foreach ($data['news'] as $n) {
    $cover = copyImage($publicDir . $n['image'], 'news', pathinfo($n['image'], PATHINFO_FILENAME));
    $newsId = seedInsert('news', [
        'slug'             => $n['slug'],
        'title'            => $n['title'],
        'excerpt'          => $n['excerpt'],
        'category_id'      => $categoryIds[$n['category']],
        'content'          => Html::fromParagraphs($n['content']),
        'cover_image_path' => $cover,
        'published_date'   => parseIndonesianDate($n['date']),
        'status'           => 'published',
        'created_at'       => $now,
        'updated_at'       => $now,
    ]);
    foreach ($n['gallery'] as $i => $img) {
        seedInsert('news_gallery', [
            'news_id'    => $newsId,
            'image_path' => copyImage($publicDir . $img, 'news', pathinfo($img, PATHINFO_FILENAME)),
            'sort_order' => $i + 1,
        ]);
    }
}

// --------------------------------------------------------------------- faculty
$statuses = \App\Models\Faculty::STATUSES;
$facultyIds = [];
foreach ($data['faculty'] as $f) {
    // Old photos are named exactly after the lecturer, commas and all
    $oldPhoto = $publicDir . '/' . $f['full_name'] . '.jpg';
    $photo = is_file($oldPhoto)
        ? copyImage($oldPhoto, 'faculty', $f['full_name'])
        : null;
    // Mirror the 002 migration: map the old "jabatan fungsional" to the new
    // Status vocabulary (Guru Besar kept; everything else → Dosen Pengajar).
    $status = in_array($f['position'], $statuses, true) ? $f['position'] : 'Dosen Pengajar';
    $facultyIds[] = seedInsert('faculty', array_merge($f, [
        'position'   => $status,
        'photo_path' => $photo,
        'is_active'  => 1,
    ]));
}

// Sample detail items for the first dosen so the new profile sections can be
// verified locally. Production content is filled in by staff via the admin.
function seedFacultyItem(int $facultyId, string $section, int $order, array $cols): void
{
    seedInsert('faculty_items', array_merge([
        'faculty_id'  => $facultyId,
        'section_key' => $section,
        'sort_order'  => $order,
        'is_active'   => 1,
    ], $cols));
}
if (!empty($facultyIds)) {
    $fid = $facultyIds[0];
    seedFacultyItem($fid, 'education', 1, ['title' => 'S3 Ilmu Ekonomi', 'subtitle' => 'Universitas Padjadjaran', 'meta' => '2012']);
    seedFacultyItem($fid, 'education', 2, ['title' => 'S2 Ilmu Ekonomi', 'subtitle' => 'Universitas Indonesia', 'meta' => '2004']);
    seedFacultyItem($fid, 'education', 3, ['title' => 'S1 Ekonomi Pembangunan', 'subtitle' => 'Universitas Pasundan', 'meta' => '1998']);
    seedFacultyItem($fid, 'teaching', 1, ['title' => 'Ekonomi Internasional']);
    seedFacultyItem($fid, 'teaching', 2, ['title' => 'Ekonomi Moneter']);
    seedFacultyItem($fid, 'teaching', 3, ['title' => 'Perekonomian Indonesia']);
    seedFacultyItem($fid, 'publications', 1, ['title' => 'Foreign Direct Investment and Regional Economic Growth in Indonesia', 'subtitle' => 'Journal of Regional and Indonesia Economy', 'meta' => '2023', 'url' => 'https://jrie.feb.unpas.ac.id/index.php/jrie']);
    seedFacultyItem($fid, 'publications', 2, ['title' => 'Analisis Daya Saing Ekspor Jawa Barat', 'subtitle' => 'BRAINY', 'meta' => '2021']);
    seedFacultyItem($fid, 'certifications', 1, ['title' => 'Sertifikasi Dosen (SERDOS)', 'subtitle' => 'Kemendikbudristek', 'meta' => '2015']);
    seedFacultyItem($fid, 'organizations', 1, ['title' => 'Ikatan Sarjana Ekonomi Indonesia (ISEI)', 'subtitle' => 'Anggota', 'meta' => '2010–sekarang']);
    seedFacultyItem($fid, 'networks', 1, ['title' => 'Kyung Hee University', 'subtitle' => 'Kolaborasi riset ekonomi regional']);
}

// ------------------------------------------------------------------ curriculum
foreach ($data['curriculum'] as $i => $year) {
    $yearId = seedInsert('curriculum_years', [
        'year_number' => $year['year_number'],
        'label'       => $year['label'],
        'description' => $year['description'],
        'sort_order'  => $i + 1,
    ]);
    foreach ($year['semesters'] as $j => $sem) {
        $semId = seedInsert('curriculum_semesters', [
            'year_id'         => $yearId,
            'semester_number' => $sem['semester_number'],
            'sort_order'      => $j + 1,
        ]);
        foreach ($sem['courses'] as $k => $course) {
            // "ESP201 - Matematika Ekonomi" → code + name; plain names keep code NULL
            $code = null;
            $name = $course;
            if (preg_match('/^([A-Z]{3}\d{3})\s*-\s*(.+)$/', $course, $m)) {
                $code = $m[1];
                $name = $m[2];
            }
            seedInsert('curriculum_courses', [
                'semester_id' => $semId,
                'code'        => $code,
                'name'        => $name,
                'sort_order'  => $k + 1,
            ]);
        }
    }
}

// ---------------------------------------------------------- graduate profiles
foreach ($data['graduate_profiles'] as $g) {
    seedInsert('graduate_profiles', array_merge($g, ['is_active' => 1]));
}

// ------------------------------------------------- page_fields & page_items
function seedField(string $page, string $section, string $key, ?string $value, string $type = 'text'): void
{
    global $now;
    if ($value === null || $value === '') {
        return;
    }
    seedInsert('page_fields', [
        'page_key'    => $page,
        'section_key' => $section,
        'field_key'   => $key,
        'field_type'  => $type,
        'value'       => $value,
        'updated_at'  => $now,
    ]);
}

function seedItem(string $page, string $section, int $order, array $cols): void
{
    seedInsert('page_items', array_merge([
        'page_key'    => $page,
        'section_key' => $section,
        'sort_order'  => $order,
        'is_active'   => 1,
    ], $cols));
}

/**
 * Generic flattener: scalars (recursively, path joined with '_') become
 * page_fields; arrays of rows are handled by the caller where their shape
 * needs custom column mapping.
 */
function seedScalars(string $page, string $section, array $values, string $prefix = ''): void
{
    foreach ($values as $key => $value) {
        if (is_string($value)) {
            $type = strlen($value) > 190 ? 'textarea' : 'text';
            seedField($page, $section, $prefix . $key, $value, $type);
        } elseif (is_array($value) && !array_is_list($value)) {
            seedScalars($page, $section, $value, $prefix . $key . '_');
        }
        // lists are seeded explicitly below
    }
}

$p = $data['pages'];

// -- home
seedScalars('home', 'hero', $p['home']['hero']);
foreach ($p['home']['hero']['stats'] as $i => $s) {
    seedItem('home', 'stats', $i + 1, ['icon_key' => $s['key'], 'title' => $s['value']]);
}
seedScalars('home', 'why', $p['home']['why']);
$order = 0;
foreach ($p['home']['why']['features'] as $iconKey => $feat) {
    seedItem('home', 'features', ++$order, [
        'icon_key'    => $iconKey,
        'title'       => $feat['title'],
        'description' => $feat['desc'],
    ]);
}
seedScalars('home', 'promo', $p['home']['promo']);
seedScalars('home', 'news', ['title' => $p['home']['news']['title'], 'subtitle' => $p['home']['news']['subtitle'], 'button' => $p['home']['news']['button']]);
// home.news.items intentionally skipped — the homepage now lists real rows
// from the news table, the JS dummies were superseded by NEWS_DATA
seedScalars('home', 'cta', $p['home']['cta']);

// -- profile
$pr = $p['profile'];
seedScalars('profile', 'main', ['title' => $pr['title'], 'subtitle' => $pr['subtitle'], 'hero_badge' => $pr['hero_badge']]);
seedScalars('profile', 'history', ['title' => $pr['history']['title'], 'footer' => $pr['history']['footer'], 'timeline_label' => $pr['history']['timeline_label']]);
foreach ($pr['history']['content'] as $i => $para) {
    seedItem('profile', 'history_content', $i + 1, ['description' => $para]);
}
foreach ($pr['history']['milestones'] as $i => $m) {
    seedItem('profile', 'milestones', $i + 1, ['label_year' => $m['year'], 'description' => $m['event']]);
}
seedScalars('profile', 'identity', $pr['identity']);
seedScalars('profile', 'vision', $pr['vision']);
seedScalars('profile', 'mission', ['title' => $pr['mission']['title']]);
foreach ($pr['mission']['items'] as $i => $item) {
    seedItem('profile', 'mission', $i + 1, ['description' => $item]);
}
seedScalars('profile', 'objectives', ['title' => $pr['objectives']['title']]);
foreach ($pr['objectives']['items'] as $i => $item) {
    seedItem('profile', 'objectives', $i + 1, ['description' => $item]);
}
seedScalars('profile', 'advantages', ['title' => $pr['advantages']['title']]);
foreach ($pr['advantages']['items'] as $i => $a) {
    seedItem('profile', 'advantages', $i + 1, ['title' => $a['title'], 'description' => $a['desc']]);
}
seedScalars('profile', 'achievements', ['title' => $pr['achievements']['title'], 'subtitle' => $pr['achievements']['subtitle'], 'footer' => $pr['achievements']['footer']]);
foreach ($pr['achievements']['items'] as $i => $a) {
    seedItem('profile', 'achievements', $i + 1, ['label_year' => $a['year'], 'title' => $a['title'], 'description' => $a['desc']]);
}
seedScalars('profile', 'facilities', ['title' => $pr['facilities']['title'], 'footer' => $pr['facilities']['footer']]);
foreach ($pr['facilities']['items'] as $i => $f) {
    seedItem('profile', 'facilities', $i + 1, [
        'title'       => $f['name'],
        'icon_key'    => $f['icon'],
        'description' => $f['desc'],
        'image_path'  => $f['img'],
    ]);
}

// -- academics
$ac = $p['academics'];
seedScalars('academics', 'main', array_filter($ac, 'is_string'));
seedScalars('academics', 'concentration', ['title' => $ac['concentration']['title']]);
foreach ($ac['concentration']['items'] as $i => $c) {
    seedItem('academics', 'concentration', $i + 1, [
        'title'       => $c['name'],
        'description' => $c['desc'],
        'extra_json'  => json_encode(['courses' => $c['courses']], JSON_UNESCAPED_UNICODE),
    ]);
}
seedScalars('academics', 'prospects', ['title' => $ac['prospects']['title']]);
foreach ($ac['prospects']['items'] as $i => $c) {
    seedItem('academics', 'prospects', $i + 1, [
        'icon_key'    => $c['icon'],
        'title'       => $c['title'],
        'description' => $c['desc'],
    ]);
}

// -- contact: core info only (address/phone/email/hours) — the footer reads it
// too. Brochures/cashback/extra info moved to the merged /pendaftaran page.
$contactData = $p['contact'];
unset($contactData['form'], $contactData['brochure'], $contactData['cashback'], $contactData['extra_info']);
seedScalars('contact', 'main', $contactData);

// -- footer & nav & news list page
seedScalars('footer', 'main', $p['footer']);
// Social links shown in the footer; blank value = icon hidden on the site.
// seedField skips empty values, so seed placeholders with a space-safe default
// via direct insert to keep the field editable in the admin.
foreach ([
    'instagram_url' => 'https://www.instagram.com/ekonomifebunpas',
    'facebook_url'  => '',
    'youtube_url'   => '',
    'linkedin_url'  => '',
] as $socialKey => $socialUrl) {
    seedInsert('page_fields', [
        'page_key'    => 'footer',
        'section_key' => 'socials',
        'field_key'   => $socialKey,
        'field_type'  => 'url',
        'value'       => $socialUrl,
        'updated_at'  => $now,
    ]);
}
seedScalars('nav', 'main', $p['nav']);
seedScalars('news_page', 'main', $p['news_page']);

// -- pendaftaran: merged registration+contact page — brochures at the top,
// external registration CTA, downloadable PDFs, cashback promo, extra info.
seedField('pendaftaran', 'main', 'title', 'Pendaftaran Mahasiswa Baru');
seedField('pendaftaran', 'main', 'description', 'Pendaftaran mahasiswa baru Program Studi Ekonomi dilakukan melalui portal SPMB Universitas Pasundan. Klik tombol di bawah untuk menuju halaman pendaftaran resmi.', 'textarea');
seedField('pendaftaran', 'main', 'button_label', 'Daftar Sekarang');
seedField('pendaftaran', 'main', 'external_registration_url', 'https://situ2.unpas.ac.id/spmbfront/program-studi-detail/detail/60201', 'url');
seedField('pendaftaran', 'main', 'brochure_title', $p['contact']['brochure']['title']);
seedField('pendaftaran', 'main', 'brochure_subtitle', $p['contact']['brochure']['subtitle']);
seedScalars('pendaftaran', 'main', $p['contact']['cashback'], 'cashback_');
seedField('pendaftaran', 'main', 'extra_info_title', $p['contact']['extra_info']['title']);
foreach ($p['contact']['extra_info']['items'] as $i => $item) {
    seedItem('pendaftaran', 'extra_info', $i + 1, ['description' => $item]);
}
for ($i = 1; $i <= 6; $i++) {
    seedItem('pendaftaran', 'brochures', $i, [
        'title'      => "Brosur Pendaftaran Halaman $i",
        'image_path' => "/brosur$i.webp",
    ]);
}
seedItem('pendaftaran', 'downloads', 1, ['title' => 'Unduh Brosur Pendaftaran', 'subtitle' => 'Klik untuk mengunduh versi cetak', 'image_path' => '/brosur.pdf']);
seedItem('pendaftaran', 'downloads', 2, ['title' => 'Unduh Brosur KIP-K', 'subtitle' => 'Klik untuk mengunduh versi cetak', 'image_path' => '/brosur2.pdf']);

// -- academics: kerjasama, akreditasi, dokumen pedoman, portal, jurnal → DB
// (previously hardcoded in the akademik view; editable via admin since G3)
foreach (['Kyung Hee University', 'Korea Foundation', 'University Utara Malaysia'] as $i => $uni) {
    seedItem('academics', 'partners_international', $i + 1, ['title' => $uni]);
}
seedField('academics', 'kerjasama', 'national_placeholder', 'Data kerjasama instansi nasional sedang dalam tahap pembaharuan');
seedField('academics', 'akreditasi', 'title', 'UNGGUL');
seedField('academics', 'akreditasi', 'subtitle', 'Sertifikasi BAN-PT');
seedField('academics', 'akreditasi', 'description', 'Berlaku hingga tahun 2029 sesuai SK resmi Badan Akreditasi Nasional Perguruan Tinggi.', 'textarea');
$pedoman = [
    ['book',         'Pedoman Akademik Mahasiswa 2025',         '/documents/1_Pedoman_Akademik_Mahasiswa_2025.pdf'],
    ['check-circle', 'Pedoman Kode Etik Mahasiswa 2025',        '/documents/2_Pedoman_Kode_Etik_Mahasiswa_2025.pdf'],
    ['map-pin',      'Pedoman Kuliah Praktek Kerja (KPK) 2025', '/documents/3_Pedoman_KPK_2025.pdf'],
    ['award',        'Pedoman Penulisan Skripsi 2025',          '/documents/4_Pedoman_Skripsi_2025.pdf'],
    ['zap',          'Pedoman RPL Mahasiswa 2025',              '/documents/5_Pedoman_RPL_Mahasiswa_2025.pdf'],
];
foreach ($pedoman as $i => [$icon, $name, $file]) {
    seedItem('academics', 'documents', $i + 1, ['icon_key' => $icon, 'title' => $name, 'image_path' => $file]);
}
seedField('academics', 'documents', 'updated_label', 'Pembaruan: April 2026');
seedField('academics', 'portal', 'title', 'Portal SITU 2 UNPAS');
seedField('academics', 'portal', 'description', 'Akses sistem informasi terpadu untuk pengisian KRS, melihat KHS, dan jadwal perkuliahan harian.', 'textarea');
seedField('academics', 'portal', 'url', 'https://situ2.unpas.ac.id/gate/login', 'url');
seedField('academics', 'portal', 'button', 'Masuk ke Portal Akademik');
$journals = [
    'jrie'   => ['JRIE', 'Journal of Regional and Indonesia Economy', 'https://jrie.feb.unpas.ac.id/index.php/jrie', '/jrie.webp',
                 'Journal of Regional and Indonesia Economy (JRIE) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi FEB Universitas Pasundan. JRIE memuat artikel hasil penelitian dan kajian di bidang ekonomi regional, ekonomi pembangunan, serta dinamika perekonomian Indonesia.'],
    'brainy' => ['BRAINY', 'Bandung Regional Investment & Economy', 'https://brainy.feb.unpas.ac.id/index.php/brainy', '/brainy.webp',
                 'Bandung Regional Investment & Economy (BRAINY) adalah jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi FEB Universitas Pasundan, menyoroti kajian investasi dan perekonomian regional, khususnya kawasan Bandung dan Jawa Barat.'],
];
foreach ($journals as $jSlug => [$name, $full, $jUrl, $cover, $desc]) {
    seedField('academics', "jurnal_$jSlug", 'name', $name);
    seedField('academics', "jurnal_$jSlug", 'full_name', $full);
    seedField('academics', "jurnal_$jSlug", 'url', $jUrl, 'url');
    seedField('academics', "jurnal_$jSlug", 'cover', $cover, 'image');
    seedField('academics', "jurnal_$jSlug", 'description', $desc, 'textarea');
}

// -- per-page SEO (from the old getSEO map, editable by staff via admin)
$seoPages = [
    'home'        => ['Ekonomi FEB Unpas', 'Program S1 Ekonomi terakreditasi Unggul dengan kurikulum Merdeka Belajar.'],
    'profile'     => ['Profil - Visi Misi - FEB UNPAS', 'Sejarah, visi, misi, dan capaian Fakultas Ekonomi dan Bisnis Universitas Pasundan.'],
    'academics'   => ['Akademik - Kurikulum - FEB UNPAS', 'Informasi kurikulum, peminatan, prospek karier program Ekonomi.'],
    'faculty'     => ['Dosen - Tim Pengajar - FEB UNPAS', 'Profil dosen Fakultas Ekonomi dan Bisnis Universitas Pasundan.'],
    'contact'     => ['Kontak - FEB UNPAS', 'Hubungi Fakultas Ekonomi dan Bisnis Universitas Pasundan untuk informasi lebih lanjut.'],
    'pendaftaran' => ['Pendaftaran Mahasiswa Baru - FEB UNPAS', 'Informasi dan tautan pendaftaran mahasiswa baru Program Studi Ekonomi FEB UNPAS.'],
    'news_page'   => ['Berita & Kegiatan - FEB UNPAS', 'Berita dan kegiatan terbaru Program Studi Ekonomi FEB UNPAS.'],
];
foreach ($seoPages as $page => [$title, $desc]) {
    seedField($page, 'seo', 'title', $title);
    seedField($page, 'seo', 'description', $desc, 'textarea');
}

// ------------------------------------------------------------------ admin user
$password = getenv('ADMIN_PASSWORD') ?: bin2hex(random_bytes(8));
seedInsert('admin_users', [
    'name'          => 'Administrator',
    'email'         => 'admin@ekonomi.feb.unpas.ac.id',
    'password_hash' => password_hash($password, PASSWORD_DEFAULT),
    'role'          => 'admin',
    'is_active'     => 1,
    'created_at'    => $now,
]);

// -------------------------------------------------- MySQL dump for phpMyAdmin
function mysqlQuote($value): string
{
    if ($value === null) {
        return 'NULL';
    }
    if (is_int($value) || is_float($value)) {
        return (string) $value;
    }
    return "'" . str_replace(
        ['\\', "'", "\n", "\r", "\0"],
        ['\\\\', "\\'", '\\n', '\\r', '\\0'],
        (string) $value
    ) . "'";
}

$sql = "-- seed.sql — generated by database/seed.php on $now\n"
     . "-- Import ONCE via phpMyAdmin AFTER applying database/schema/001_init.sql\n"
     . "SET NAMES utf8mb4;\nSTART TRANSACTION;\n\n";
foreach ($dump as [$table, $row]) {
    $sql .= sprintf(
        "INSERT INTO %s (%s) VALUES (%s);\n",
        $table,
        implode(', ', array_keys($row)),
        implode(', ', array_map('mysqlQuote', array_values($row)))
    );
}
$sql .= "\nCOMMIT;\n";
file_put_contents(__DIR__ . '/seed.sql', $sql);

// ---------------------------------------------------------------------- report
echo "Seed selesai.\n";
foreach (['news', 'news_gallery', 'faculty', 'faculty_items', 'curriculum_courses', 'graduate_profiles', 'page_fields', 'page_items', 'admin_users'] as $t) {
    $n = Database::fetch("SELECT COUNT(*) AS n FROM $t")['n'];
    echo str_pad("  $t", 24), ": $n baris\n";
}
echo "\nAdmin login : admin@ekonomi.feb.unpas.ac.id\n";
echo "Password    : $password  (SIMPAN — hanya ditampilkan sekali ini)\n";
echo "\nDump MySQL untuk phpMyAdmin: database/seed.sql\n";
