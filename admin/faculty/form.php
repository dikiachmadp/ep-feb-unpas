<?php
/**
 * Bespoke create/edit form for a dosen. Unlike the other flat CRUD screens,
 * a dosen carries repeating detail sections (pendidikan, pengajaran, publikasi,
 * sertifikasi, organisasi, jejaring) stored in faculty_items — so this screen
 * is hand-rolled, mirroring admin/pages/edit.php's item[id][col] / new_item /
 * _delete pattern. list.php and delete.php still use the generic engine.
 */
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';
require dirname(__DIR__) . '/_crud.php'; // reuse crudInput() for the flat fields

use App\Core\Csrf;
use App\Core\Database;
use App\Core\LocalFilesystemStorage;
use App\Core\Session;
use App\Models\Faculty;

/** Flat columns on the faculty row, rendered via crudInput(). */
$flatFields = [
    'full_name'     => ['label' => 'Nama lengkap (dengan gelar)', 'type' => 'text', 'required' => true],
    'position'      => ['label' => 'Status', 'type' => 'select', 'required' => true,
                        'options' => array_combine(Faculty::STATUSES, Faculty::STATUSES)],
    'expertise'     => ['label' => 'Bidang keahlian', 'type' => 'text', 'required' => true, 'hint' => 'Pisahkan dengan koma untuk beberapa bidang keahlian, mis. Ekonomi Industri, Ekonomi Kreatif, Metodologi Penelitian.'],
    'nidn'          => ['label' => 'NIDN', 'type' => 'text'],
    'email'         => ['label' => 'Email', 'type' => 'email'],
    'bio'           => ['label' => 'Biografi Singkat', 'type' => 'textarea', 'hint' => 'Ringkasan naratif tentang dosen. Tampil sebagai paragraf pembuka di halaman profil.'],
    'scholar_url'   => ['label' => 'Link Google Scholar', 'type' => 'url', 'hint' => 'Alamat lengkap profil, mis. https://scholar.google.com/citations?user=...'],
    'sinta_url'     => ['label' => 'Link SINTA ID', 'type' => 'url', 'hint' => 'Mis. https://sinta.kemdiktisaintek.go.id/authors/profile/12345'],
    'scopus_url'    => ['label' => 'Link Scopus ID', 'type' => 'url', 'hint' => 'Mis. https://www.scopus.com/authid/detail.uri?authorId=12345'],
    'photo_path'    => ['label' => 'Foto', 'type' => 'image'],
    'display_order' => ['label' => 'Urutan tampil', 'type' => 'number', 'default' => 99],
    'is_active'     => ['label' => 'Tampilkan di website', 'type' => 'checkbox', 'default' => 1],
];

/** Which faculty_items columns each section uses (col => header label). */
const FACULTY_SECTION_COLS = [
    'education'      => ['title' => 'Jenjang & Program', 'subtitle' => 'Institusi', 'meta' => 'Tahun'],
    'teaching'       => ['title' => 'Mata Kuliah'],
    'publications'   => ['title' => 'Judul', 'subtitle' => 'Jurnal / Penerbit', 'meta' => 'Tahun', 'url' => 'Link'],
    'certifications' => ['title' => 'Nama Sertifikasi', 'subtitle' => 'Penerbit', 'meta' => 'Tahun'],
    'organizations'  => ['title' => 'Organisasi', 'subtitle' => 'Peran', 'meta' => 'Periode'],
    'networks'       => ['title' => 'Nama', 'subtitle' => 'Keterangan', 'url' => 'Link'],
];

$id  = isset($_GET['id']) ? (int) $_GET['id'] : null;
$row = $id ? Database::fetch('SELECT * FROM faculty WHERE id = ?', [$id]) : null;
if ($id && !$row) {
    http_response_code(404);
    exit('Data tidak ditemukan.');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::require();
    try {
        // -- flat faculty row ------------------------------------------------
        $data = [];
        foreach ($flatFields as $name => $f) {
            switch ($f['type']) {
                case 'checkbox':
                    $data[$name] = isset($_POST[$name]) ? 1 : 0;
                    break;
                case 'number':
                    $data[$name] = (int) ($_POST[$name] ?? 0);
                    break;
                case 'image':
                    if (!empty($_FILES[$name]['tmp_name'])) {
                        $storage = new LocalFilesystemStorage();
                        $data[$name] = $storage->storeImage($_FILES[$name], 'faculty', (string) ($_POST['full_name'] ?? 'dosen'));
                        if ($row && !empty($row[$name])) {
                            $storage->delete($row[$name]);
                        }
                    } // else keep existing column untouched
                    break;
                case 'select':
                    $value = (string) ($_POST[$name] ?? '');
                    if (!isset($f['options'][$value])) {
                        throw new RuntimeException($f['label'] . ' tidak valid.');
                    }
                    $data[$name] = $value;
                    break;
                default:
                    $value = trim((string) ($_POST[$name] ?? ''));
                    if (!empty($f['required']) && $value === '') {
                        throw new RuntimeException($f['label'] . ' wajib diisi.');
                    }
                    $data[$name] = $value === '' ? null : $value;
            }
        }

        if ($row) {
            Database::update('faculty', $id, $data);
        } else {
            $id = Database::insert('faculty', $data);
        }

        // -- existing items: update or delete --------------------------------
        foreach ((array) ($_POST['item'] ?? []) as $itemId => $cols) {
            $item = Database::fetch('SELECT id FROM faculty_items WHERE id = ? AND faculty_id = ?', [(int) $itemId, $id]);
            if (!$item) {
                continue;
            }
            if (!empty($cols['_delete'])) {
                Database::run('DELETE FROM faculty_items WHERE id = ?', [(int) $itemId]);
                continue;
            }
            Database::update('faculty_items', (int) $itemId, [
                'title'    => trim((string) ($cols['title'] ?? '')) ?: null,
                'subtitle' => trim((string) ($cols['subtitle'] ?? '')) ?: null,
                'meta'     => trim((string) ($cols['meta'] ?? '')) ?: null,
                'url'      => trim((string) ($cols['url'] ?? '')) ?: null,
            ]);
        }

        // -- new items per section -------------------------------------------
        foreach ((array) ($_POST['new_item'] ?? []) as $section => $rows) {
            if (!isset(FACULTY_SECTION_COLS[$section])) {
                continue;
            }
            foreach ((array) $rows as $cols) {
                if (trim(implode('', array_map('strval', $cols))) === '') {
                    continue;
                }
                $max = (int) (Database::fetch(
                    'SELECT MAX(sort_order) AS m FROM faculty_items WHERE faculty_id = ? AND section_key = ?',
                    [$id, $section]
                )['m'] ?? 0);
                Database::insert('faculty_items', [
                    'faculty_id'  => $id,
                    'section_key' => $section,
                    'sort_order'  => $max + 1,
                    'title'       => trim((string) ($cols['title'] ?? '')) ?: null,
                    'subtitle'    => trim((string) ($cols['subtitle'] ?? '')) ?: null,
                    'meta'        => trim((string) ($cols['meta'] ?? '')) ?: null,
                    'url'         => trim((string) ($cols['url'] ?? '')) ?: null,
                    'is_active'   => 1,
                ]);
            }
        }

        Session::flash('ok', 'Dosen berhasil disimpan.');
        header('Location: ' . adminUrl('faculty/list.php'));
        exit;
    } catch (RuntimeException $ex) {
        Session::flash('err', $ex->getMessage());
        $row = array_merge($row ?? [], $_POST); // re-fill the flat fields
    }
}

$itemsBySection = [];
if ($id) {
    foreach (Database::fetchAll(
        'SELECT * FROM faculty_items WHERE faculty_id = ? ORDER BY section_key, sort_order, id',
        [$id]
    ) as $it) {
        $itemsBySection[$it['section_key']][] = $it;
    }
}

adminHeader(($row ? 'Edit ' : 'Tambah ') . 'Dosen', ['subtitle' => 'Data utama dan seluruh bagian profil disimpan bersamaan lewat tombol Simpan di bawah.']);
?>
<form method="post" enctype="multipart/form-data" action="">
  <?= Csrf::field() ?>

  <div class="card form-grid">
    <strong>Data Utama</strong>
    <?php foreach ($flatFields as $name => $f): ?>
      <?php crudInput($name, $f, $row[$name] ?? ($f['default'] ?? '')) ?>
    <?php endforeach; ?>
  </div>

  <?php foreach (Faculty::SECTIONS as $section => $heading):
      $cols = FACULTY_SECTION_COLS[$section]; ?>
  <div class="card form-grid">
    <strong><?= e($heading) ?></strong>
    <table class="list">
      <tr>
        <?php foreach ($cols as $label): ?><th><?= e($label) ?></th><?php endforeach; ?><th>Hapus</th>
      </tr>
      <?php foreach ($itemsBySection[$section] ?? [] as $it): ?>
      <tr>
        <?php foreach (array_keys($cols) as $col): ?>
        <td><input type="<?= $col === 'url' ? 'url' : 'text' ?>" name="item[<?= (int) $it['id'] ?>][<?= e($col) ?>]" value="<?= e((string) $it[$col]) ?>"></td>
        <?php endforeach; ?>
        <td style="text-align:center"><input type="checkbox" name="item[<?= (int) $it['id'] ?>][_delete]" value="1"></td>
      </tr>
      <?php endforeach; ?>
      <?php for ($n = 0; $n < 3; $n++): ?>
      <tr>
        <?php foreach (array_keys($cols) as $col): ?>
        <td><input type="<?= $col === 'url' ? 'url' : 'text' ?>" name="new_item[<?= e($section) ?>][<?= $n ?>][<?= e($col) ?>]" placeholder="+ baru"></td>
        <?php endforeach; ?>
        <td></td>
      </tr>
      <?php endfor; ?>
    </table>
  </div>
  <?php endforeach; ?>

  <div>
    <button class="btn" type="submit">Simpan</button>
    <a class="btn secondary" href="<?= adminUrl('faculty/list.php') ?>">Batal</a>
  </div>
</form>
<?php adminFooter(); ?>
