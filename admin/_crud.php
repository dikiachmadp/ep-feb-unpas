<?php
/**
 * Generic list/form/delete engine for flat content types (faculty, graduate
 * profiles, admin users). One config array per entity; news and curriculum
 * have bespoke screens because their shapes are not flat.
 *
 * Field types: text, url, email, number, textarea, checkbox, select, image.
 */

use App\Core\Csrf;
use App\Core\Database;
use App\Core\LocalFilesystemStorage;
use App\Core\Session;

function crudEntities(): array
{
    return [
        'faculty' => [
            'table'      => 'faculty',
            'title'      => 'Dosen',
            'singular'   => 'Dosen',
            'dir'        => 'faculty',
            'order_by'   => 'display_order',
            'upload_dir' => 'faculty',
            'list'       => ['photo_path' => 'Foto', 'full_name' => 'Nama', 'position' => 'Jabatan', 'expertise' => 'Keahlian'],
            'fields'     => [
                'full_name'     => ['label' => 'Nama lengkap (dengan gelar)', 'type' => 'text', 'required' => true],
                'position'      => ['label' => 'Jabatan fungsional', 'type' => 'text', 'required' => true, 'hint' => 'Contoh: Guru Besar, Lektor Kepala, Lektor, Asisten Ahli'],
                'expertise'     => ['label' => 'Bidang keahlian', 'type' => 'text', 'required' => true],
                'nidn'          => ['label' => 'NIDN', 'type' => 'text'],
                'email'         => ['label' => 'Email', 'type' => 'email'],
                'orcid_id'      => ['label' => 'Scopus/ORCID ID', 'type' => 'text'],
                'scholar_url'   => ['label' => 'Link Google Scholar', 'type' => 'url'],
                'photo_path'    => ['label' => 'Foto', 'type' => 'image'],
                'display_order' => ['label' => 'Urutan tampil', 'type' => 'number', 'default' => 99],
                'is_active'     => ['label' => 'Tampilkan di website', 'type' => 'checkbox', 'default' => 1],
            ],
        ],
        'profiles' => [
            'table'      => 'graduate_profiles',
            'title'      => 'Profil Lulusan',
            'singular'   => 'Profil Lulusan',
            'dir'        => 'profiles',
            'order_by'   => 'sort_order',
            'list'       => ['title' => 'Judul', 'description' => 'Deskripsi', 'icon_key' => 'Ikon'],
            'fields'     => [
                'title'       => ['label' => 'Judul profil', 'type' => 'text', 'required' => true],
                'description' => ['label' => 'Deskripsi', 'type' => 'textarea', 'required' => true],
                'icon_key'    => ['label' => 'Ikon', 'type' => 'select', 'options' => [
                    'target' => 'Target', 'trending-up' => 'Grafik naik', 'search' => 'Kaca pembesar', 'briefcase' => 'Tas kerja',
                ]],
                'color_key'   => ['label' => 'Warna', 'type' => 'select', 'options' => [
                    'bg-blue-50 text-blue-600'       => 'Biru',
                    'bg-emerald-50 text-emerald-600' => 'Hijau',
                    'bg-purple-50 text-purple-600'   => 'Ungu',
                    'bg-orange-50 text-orange-600'   => 'Oranye',
                ]],
                'sort_order'  => ['label' => 'Urutan tampil', 'type' => 'number', 'default' => 99],
                'is_active'   => ['label' => 'Tampilkan di website', 'type' => 'checkbox', 'default' => 1],
            ],
        ],
        'users' => [
            'table'      => 'admin_users',
            'title'      => 'Pengguna Admin',
            'singular'   => 'Pengguna',
            'dir'        => 'users',
            'order_by'   => 'name',
            'admin_only' => true,
            'list'       => ['name' => 'Nama', 'email' => 'Email', 'role' => 'Peran'],
            'fields'     => [
                'name'      => ['label' => 'Nama', 'type' => 'text', 'required' => true],
                'email'     => ['label' => 'Email (untuk login)', 'type' => 'email', 'required' => true],
                'password'  => ['label' => 'Password', 'type' => 'password', 'hint' => 'Minimal 10 karakter. Kosongkan saat mengedit jika tidak ingin mengganti password.'],
                'role'      => ['label' => 'Peran', 'type' => 'select', 'options' => ['editor' => 'Editor (kelola konten)', 'admin' => 'Admin (konten + pengguna)']],
                'is_active' => ['label' => 'Akun aktif', 'type' => 'checkbox', 'default' => 1],
            ],
        ],
    ];
}

function crudConfig(string $key): array
{
    $cfg = crudEntities()[$key] ?? null;
    if ($cfg === null) {
        http_response_code(404);
        exit('Entity tidak dikenal.');
    }
    if (!empty($cfg['admin_only']) && !App\Core\Auth::isAdmin()) {
        http_response_code(403);
        exit('Hanya admin yang boleh mengakses halaman ini.');
    }
    return $cfg;
}

function crudList(string $key): void
{
    $cfg = crudConfig($key);
    $rows = Database::fetchAll("SELECT * FROM {$cfg['table']} ORDER BY {$cfg['order_by']}");

    adminHeader($cfg['title']);
    ?>
    <div class="toolbar">
      <span><?= count($rows) ?> data</span>
      <a class="btn" href="<?= adminUrl($cfg['dir'] . '/form.php') ?>">+ Tambah <?= e($cfg['singular']) ?></a>
    </div>
    <table class="list">
      <tr>
        <?php foreach ($cfg['list'] as $label): ?><th><?= e($label) ?></th><?php endforeach; ?>
        <th></th>
      </tr>
      <?php foreach ($rows as $row): ?>
      <tr>
        <?php foreach (array_keys($cfg['list']) as $col): ?>
        <td>
          <?php $type = $cfg['fields'][$col]['type'] ?? 'text'; ?>
          <?php if ($type === 'image'): ?>
            <?php if ($row[$col]): ?><img class="thumb" src="<?= e(url($row[$col])) ?>" alt=""><?php else: ?>—<?php endif; ?>
          <?php else: ?>
            <?= e(mb_strimwidth((string) $row[$col], 0, 90, '…')) ?>
            <?php if ($col === array_key_first($cfg['list']) && isset($row['is_active']) && !$row['is_active']): ?>
              <span class="badge draft">nonaktif</span>
            <?php endif; ?>
          <?php endif; ?>
        </td>
        <?php endforeach; ?>
        <td style="white-space:nowrap">
          <a class="btn small secondary" href="<?= adminUrl($cfg['dir'] . '/form.php?id=' . $row['id']) ?>">Edit</a>
          <form method="post" action="<?= adminUrl($cfg['dir'] . '/delete.php') ?>" style="display:inline"
                onsubmit="return confirm('Hapus data ini? Tindakan tidak bisa dibatalkan.')">
            <?= Csrf::field() ?>
            <input type="hidden" name="id" value="<?= (int) $row['id'] ?>">
            <button class="btn small danger" type="submit">Hapus</button>
          </form>
        </td>
      </tr>
      <?php endforeach; ?>
    </table>
    <?php
    adminFooter();
}

function crudForm(string $key): void
{
    $cfg = crudConfig($key);
    $id = isset($_GET['id']) ? (int) $_GET['id'] : null;
    $row = $id ? Database::fetch("SELECT * FROM {$cfg['table']} WHERE id = ?", [$id]) : null;
    if ($id && !$row) {
        http_response_code(404);
        exit('Data tidak ditemukan.');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        Csrf::require();
        try {
            $data = crudCollect($cfg, $row);
            if ($row) {
                Database::update($cfg['table'], $id, $data);
            } else {
                $id = Database::insert($cfg['table'], $data);
            }
            Session::flash('ok', $cfg['singular'] . ' berhasil disimpan.');
            header('Location: ' . adminUrl($cfg['dir'] . '/list.php'));
            exit;
        } catch (RuntimeException $ex) {
            Session::flash('err', $ex->getMessage());
            $row = array_merge($row ?? [], $_POST); // re-fill the form
        }
    }

    adminHeader(($row ? 'Edit ' : 'Tambah ') . $cfg['singular']);
    ?>
    <form class="card form-grid" method="post" enctype="multipart/form-data" action="">
      <?= Csrf::field() ?>
      <?php foreach ($cfg['fields'] as $name => $f): ?>
        <?php crudInput($name, $f, $row[$name] ?? ($f['default'] ?? '')) ?>
      <?php endforeach; ?>
      <div>
        <button class="btn" type="submit">Simpan</button>
        <a class="btn secondary" href="<?= adminUrl($cfg['dir'] . '/list.php') ?>">Batal</a>
      </div>
    </form>
    <?php
    adminFooter();
}

function crudInput(string $name, array $f, $value): void
{
    $req = !empty($f['required']);
    ?>
    <label class="field"><?= e($f['label']) ?><?= $req ? ' <span class="req">*</span>' : '' ?>
      <?php switch ($f['type']):
          case 'textarea': ?>
        <textarea name="<?= e($name) ?>" <?= $req ? 'required' : '' ?>><?= e((string) $value) ?></textarea>
      <?php break; ?>
      <?php case 'select': ?>
        <select name="<?= e($name) ?>">
          <?php foreach ($f['options'] as $opt => $label): ?>
          <option value="<?= e($opt) ?>" <?= (string) $value === (string) $opt ? 'selected' : '' ?>><?= e($label) ?></option>
          <?php endforeach; ?>
        </select>
      <?php break; ?>
      <?php case 'checkbox': ?>
        <input type="checkbox" name="<?= e($name) ?>" value="1" <?= $value ? 'checked' : '' ?> style="width:auto">
      <?php break; ?>
      <?php case 'image': ?>
        <?php if ($value): ?><img class="thumb" src="<?= e(url((string) $value)) ?>" alt="" style="margin:6px 0"><?php endif; ?>
        <input type="file" name="<?= e($name) ?>" accept="image/jpeg,image/png,image/webp">
        <div class="hint">JPG/PNG/WebP, maks 4 MB. Kosongkan jika tidak ingin mengganti.</div>
      <?php break; ?>
      <?php case 'password': ?>
        <input type="password" name="<?= e($name) ?>" autocomplete="new-password">
      <?php break; ?>
      <?php default: ?>
        <input type="<?= e($f['type']) ?>" name="<?= e($name) ?>" value="<?= e((string) $value) ?>" <?= $req ? 'required' : '' ?>>
      <?php endswitch; ?>
      <?php if (!empty($f['hint'])): ?><div class="hint"><?= e($f['hint']) ?></div><?php endif; ?>
    </label>
    <?php
}

/** Collect + validate POSTed fields into a DB row. Throws RuntimeException. */
function crudCollect(array $cfg, ?array $existing): array
{
    $data = [];
    foreach ($cfg['fields'] as $name => $f) {
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
                    $slugBase = $_POST[array_key_first($cfg['fields'])] ?? 'img';
                    $data[$name] = $storage->storeImage($_FILES[$name], $cfg['upload_dir'] ?? 'misc', (string) $slugBase);
                    if ($existing && !empty($existing[$name])) {
                        $storage->delete($existing[$name]);
                    }
                } // else: keep existing value, don't touch the column
                break;
            case 'password':
                $plain = (string) ($_POST[$name] ?? '');
                if ($plain !== '') {
                    if (strlen($plain) < 10) {
                        throw new RuntimeException('Password minimal 10 karakter.');
                    }
                    $data['password_hash'] = password_hash($plain, PASSWORD_DEFAULT);
                } elseif (!$existing) {
                    throw new RuntimeException('Password wajib diisi untuk pengguna baru.');
                }
                break;
            default:
                $value = trim((string) ($_POST[$name] ?? ''));
                if (!empty($f['required']) && $value === '') {
                    throw new RuntimeException($f['label'] . ' wajib diisi.');
                }
                $data[$name] = $value === '' ? null : $value;
        }
    }
    if ($cfg['table'] === 'admin_users' && !$existing) {
        $data['created_at'] = Database::now();
    }
    return $data;
}

function crudDelete(string $key): void
{
    $cfg = crudConfig($key);
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        exit('Metode tidak diizinkan.');
    }
    Csrf::require();
    $id = (int) ($_POST['id'] ?? 0);

    // Never let an admin delete their own account mid-session
    if ($cfg['table'] === 'admin_users' && $id === (int) Session::get('admin_id')) {
        Session::flash('err', 'Tidak bisa menghapus akun yang sedang dipakai.');
        header('Location: ' . adminUrl($cfg['dir'] . '/list.php'));
        exit;
    }

    $row = Database::fetch("SELECT * FROM {$cfg['table']} WHERE id = ?", [$id]);
    if ($row) {
        Database::run("DELETE FROM {$cfg['table']} WHERE id = ?", [$id]);
        // Clean up an uploaded image if the entity had one
        foreach ($cfg['fields'] as $name => $f) {
            if ($f['type'] === 'image' && !empty($row[$name])) {
                (new LocalFilesystemStorage())->delete($row[$name]);
            }
        }
        Session::flash('ok', $cfg['singular'] . ' dihapus.');
    }
    header('Location: ' . adminUrl($cfg['dir'] . '/list.php'));
    exit;
}
