<?php
/**
 * Assemble an upload-ready dist/ folder for Hostinger shared hosting,
 * mirroring the old workflow (upload dist/ contents into the subdomain's
 * document root via File Manager/FTP — no SSH, no Git required).
 *
 *   /opt/homebrew/opt/php@8.1/bin/php scripts/build-dist.php
 *
 * Produces a FLAT layout (everything in one docroot):
 *   dist/
 *     index.php .htaccess robots.txt assets/ uploads/ documents/ ...static...
 *     admin/          <- admin CMS (real copy; dev uses a symlink instead)
 *     app/            <- application code, blocked from the web by .htaccess
 *     app/Config/config.example.php  <- production template; copy to
 *                        config.local.php on the server and fill in credentials
 *
 * NOT included (import separately, once, via phpMyAdmin):
 *   database/schema/001_init.sql  then  database/seed.sql
 */

if (PHP_SAPI !== 'cli') {
    exit("CLI only.\n");
}

$root = dirname(__DIR__);
$dist = $root . '/dist';

/** Legacy public/ files superseded by the CMS — do not ship. */
function isExcludedPublic(string $relative): bool
{
    if ($relative === 'admin') {                 // dev symlink to ../admin
        return true;
    }
    if (str_starts_with($relative, 'news/') || $relative === 'news') {
        return true;                             // replaced by uploads/news/
    }
    if ($relative === 'images') {
        return true;                             // empty legacy dir
    }
    // old faculty photos at public root ("Dr. ... , M.T..jpg") -> uploads/faculty/
    if (!str_contains($relative, '/') && str_ends_with(strtolower($relative), '.jpg')) {
        return true;
    }
    return false;
}

function copyTree(string $from, string $to, ?callable $exclude = null, string $base = ''): int
{
    $count = 0;
    if (!is_dir($to) && !mkdir($to, 0755, true)) {
        exit("Gagal membuat folder: $to\n");
    }
    foreach (scandir($from) as $entry) {
        if ($entry === '.' || $entry === '..' || $entry === '.DS_Store') {
            continue;
        }
        $relative = $base === '' ? $entry : $base . '/' . $entry;
        if ($exclude && $exclude($relative)) {
            continue;
        }
        $src = $from . '/' . $entry;
        $dst = $to . '/' . $entry;
        if (is_dir($src) && !is_link($src)) {
            $count += copyTree($src, $dst, $exclude, $relative);
        } elseif (is_file($src)) {
            copy($src, $dst);
            $count++;
        }
    }
    return $count;
}

function removeTree(string $dir): void
{
    if (!is_dir($dir)) {
        return;
    }
    foreach (scandir($dir) as $entry) {
        if ($entry === '.' || $entry === '..') {
            continue;
        }
        $path = $dir . '/' . $entry;
        if (is_dir($path) && !is_link($path)) {
            removeTree($path);
        } else {
            unlink($path);
        }
    }
    rmdir($dir);
}

echo "Membangun dist/ ...\n";
removeTree($dist);

$nPublic = copyTree($root . '/public', $dist, 'isExcludedPublic');
$nApp = copyTree($root . '/app', $dist . '/app', fn(string $r) => $r === 'Config/config.local.php');
$nAdmin = copyTree($root . '/admin', $dist . '/admin');

// Root .htaccess: public/.htaccess + flat-layout hardening (app/ is inside
// the docroot here, unlike the repo layout, so it must be blocked).
$htaccess = file_get_contents($root . '/public/.htaccess');
$htaccess .= <<<'HT'


# ---- Flat-layout hardening (added by scripts/build-dist.php) ----
# Application code and any stray DB/config files must never be served
<IfModule mod_rewrite.c>
    RewriteRule ^app(/|$) - [F,L]
    RewriteRule ^database(/|$) - [F,L]
</IfModule>
<FilesMatch "\.(sql|sqlite|md|lock)$">
    Require all denied
</FilesMatch>
<Files "config.local.php">
    Require all denied
</Files>
HT;
file_put_contents($dist . '/.htaccess', $htaccess);

// Defense in depth: deny app/ directly too (works even if root rules change)
file_put_contents($dist . '/app/.htaccess', "Require all denied\n");

// Production-flavored config template replaces the dev-oriented example
file_put_contents($dist . '/app/Config/config.example.php', <<<'PHP'
<?php
/**
 * PRODUKSI (Hostinger) — salin file ini menjadi config.local.php di folder
 * yang sama (app/Config/) lewat File Manager, lalu isi kredensial database.
 * config.local.php tidak boleh dibagikan ke siapa pun.
 */
return [
    'app' => [
        'env'      => 'production',
        // Ganti dengan URL situs, tanpa garis miring di akhir
        'base_url' => 'https://ekonomi.feb.unpas.ac.id',
        'name'     => 'Ekonomi Pembangunan – FEB UNPAS',
    ],

    'db' => [
        'driver'  => 'mysql',
        // Dari hPanel > Databases: nama DB, user, dan password yang dibuat
        'host'    => 'localhost',
        'name'    => '',
        'user'    => '',
        'pass'    => '',
        'charset' => 'utf8mb4',
    ],

    'uploads' => [
        // Layout flat: folder uploads/ ada di document root, sejajar app/
        'dir'            => dirname(__DIR__, 2) . '/uploads',
        'url_prefix'     => '/uploads',
        'max_bytes'      => 4 * 1024 * 1024,
        'max_dimension'  => 2400,
    ],
];
PHP);

echo "  public -> dist/        : $nPublic file\n";
echo "  app    -> dist/app/    : $nApp file\n";
echo "  admin  -> dist/admin/  : $nAdmin file\n";
echo "  + .htaccess (hardened), app/.htaccess, config.example.php produksi\n";
echo "\nSelesai. Langkah upload:\n";
echo "  1. Import database/schema/001_init.sql lalu database/seed.sql via phpMyAdmin (sekali saja)\n";
echo "     (regenerate seed.sql dengan password admin baru dulu: ADMIN_PASSWORD='...' php database/seed.php)\n";
echo "  2. Upload SELURUH ISI dist/ ke document root subdomain (File Manager/FTP)\n";
echo "  3. Di server: salin app/Config/config.example.php -> config.local.php, isi kredensial MySQL\n";
echo "  4. Buka situs + /admin/login.php untuk verifikasi\n";
