<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';

use App\Core\Csrf;
use App\Core\Database;
use App\Core\Html;
use App\Core\LocalFilesystemStorage;
use App\Core\Session;

$id = isset($_GET['id']) ? (int) $_GET['id'] : null;
$news = $id ? Database::fetch('SELECT * FROM news WHERE id = ?', [$id]) : null;
if ($id && !$news) {
    http_response_code(404);
    exit('Berita tidak ditemukan.');
}
$gallery = $id ? Database::fetchAll('SELECT * FROM news_gallery WHERE news_id = ? ORDER BY sort_order', [$id]) : [];
$categories = Database::fetchAll('SELECT * FROM news_categories ORDER BY name');

function makeSlug(string $title): string
{
    $slug = strtolower(trim($title));
    $slug = preg_replace('/[^a-z0-9]+/', '-', $slug);
    return substr(trim($slug, '-'), 0, 180);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::require();
    $storage = new LocalFilesystemStorage();
    try {
        $title = trim($_POST['title'] ?? '');
        $excerpt = trim($_POST['excerpt'] ?? '');
        $content = Html::sanitize($_POST['content'] ?? '');
        if ($title === '' || $excerpt === '' || $content === '') {
            throw new RuntimeException('Judul, ringkasan, dan isi berita wajib diisi.');
        }

        $slug = makeSlug($_POST['slug'] !== '' ? $_POST['slug'] : $title);
        $clash = Database::fetch('SELECT id FROM news WHERE slug = ? AND id != ?', [$slug, $id ?? 0]);
        if ($clash) {
            throw new RuntimeException("Slug \"$slug\" sudah dipakai berita lain — ubah slug-nya.");
        }

        $data = [
            'slug'            => $slug,
            'title'           => $title,
            'excerpt'         => $excerpt,
            'category_id'     => (int) $_POST['category_id'],
            'content'         => $content,
            'published_date'  => $_POST['published_date'] ?: date('Y-m-d'),
            'status'          => $_POST['status'] === 'published' ? 'published' : 'draft',
            'seo_title'       => trim($_POST['seo_title'] ?? '') ?: null,
            'seo_description' => trim($_POST['seo_description'] ?? '') ?: null,
            'updated_at'      => Database::now(),
        ];

        if (!empty($_FILES['cover']['tmp_name'])) {
            $data['cover_image_path'] = $storage->storeImage($_FILES['cover'], 'news', $slug);
            if ($news && $news['cover_image_path']) {
                $storage->delete($news['cover_image_path']);
            }
        } elseif (!$news) {
            throw new RuntimeException('Gambar cover wajib diunggah untuk berita baru.');
        }

        if ($news) {
            Database::update('news', $id, $data);
        } else {
            $data['created_at'] = Database::now();
            $data['created_by'] = (int) Session::get('admin_id');
            $id = Database::insert('news', $data);
        }

        // Gallery: delete the checked ones, then append new uploads
        foreach ((array) ($_POST['delete_gallery'] ?? []) as $gid) {
            $g = Database::fetch('SELECT * FROM news_gallery WHERE id = ? AND news_id = ?', [(int) $gid, $id]);
            if ($g) {
                Database::run('DELETE FROM news_gallery WHERE id = ?', [$g['id']]);
                $storage->delete($g['image_path']);
            }
        }
        $maxOrder = (int) (Database::fetch('SELECT MAX(sort_order) AS m FROM news_gallery WHERE news_id = ?', [$id])['m'] ?? 0);
        foreach (($_FILES['gallery']['tmp_name'] ?? []) as $i => $tmp) {
            if (!$tmp) {
                continue;
            }
            $file = [
                'tmp_name' => $tmp,
                'error'    => $_FILES['gallery']['error'][$i],
                'size'     => $_FILES['gallery']['size'][$i],
            ];
            Database::insert('news_gallery', [
                'news_id'    => $id,
                'image_path' => $storage->storeImage($file, 'news', $slug),
                'sort_order' => ++$maxOrder,
            ]);
        }

        Session::flash('ok', 'Berita berhasil disimpan.');
        header('Location: ' . adminUrl('news/list.php'));
        exit;
    } catch (RuntimeException $ex) {
        Session::flash('err', $ex->getMessage());
        $news = array_merge($news ?? [], $_POST);
    }
}

adminHeader($id ? 'Edit Berita' : 'Tulis Berita', ['quill' => true]);
?>
<form class="form-grid" method="post" enctype="multipart/form-data" action="">
  <?= Csrf::field() ?>

  <div class="card form-grid">
    <label class="field">Judul <span class="req">*</span>
      <input type="text" name="title" required value="<?= e($news['title'] ?? '') ?>">
    </label>
    <label class="field">Ringkasan (excerpt) <span class="req">*</span>
      <textarea name="excerpt" required><?= e($news['excerpt'] ?? '') ?></textarea>
      <div class="hint">1–2 kalimat. Tampil di daftar berita dan jadi deskripsi SEO default.</div>
    </label>
    <label class="field">Isi berita <span class="req">*</span></label>
    <div id="editor"><?= $news['content'] ?? '' /* already sanitized server-side */ ?></div>
    <input type="hidden" name="content" id="content-input">
  </div>

  <div class="card form-grid">
    <label class="field">Kategori
      <select name="category_id">
        <?php foreach ($categories as $c): ?>
        <option value="<?= (int) $c['id'] ?>" <?= (int) ($news['category_id'] ?? 0) === (int) $c['id'] ? 'selected' : '' ?>><?= e($c['name']) ?></option>
        <?php endforeach; ?>
      </select>
    </label>
    <label class="field">Tanggal publikasi
      <input type="date" name="published_date" value="<?= e($news['published_date'] ?? date('Y-m-d')) ?>">
    </label>
    <label class="field">Status
      <select name="status">
        <option value="draft" <?= ($news['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>Draf (belum tayang)</option>
        <option value="published" <?= ($news['status'] ?? '') === 'published' ? 'selected' : '' ?>>Tayang</option>
      </select>
    </label>
    <label class="field">Slug (alamat URL)
      <input type="text" name="slug" value="<?= e($news['slug'] ?? '') ?>">
      <div class="hint">Kosongkan agar dibuat otomatis dari judul. Contoh: kunjungan-industri-2026</div>
    </label>
  </div>

  <div class="card form-grid">
    <label class="field">Gambar cover <?= $id ? '' : '<span class="req">*</span>' ?>
      <?php if (!empty($news['cover_image_path'])): ?>
      <img class="thumb" src="<?= e(url($news['cover_image_path'])) ?>" alt="" style="width:120px;height:80px;margin:6px 0">
      <?php endif; ?>
      <input type="file" name="cover" accept="image/jpeg,image/png,image/webp">
      <div class="hint">JPG/PNG/WebP, maks 4 MB. Kosongkan jika tidak ingin mengganti.</div>
    </label>

    <label class="field">Galeri foto (di dalam berita)</label>
    <?php if ($gallery): ?>
    <div class="gallery-grid">
      <?php foreach ($gallery as $g): ?>
      <figure>
        <img src="<?= e(url($g['image_path'])) ?>" alt="">
        <label><input type="checkbox" name="delete_gallery[]" value="<?= (int) $g['id'] ?>"> hapus</label>
      </figure>
      <?php endforeach; ?>
    </div>
    <?php endif; ?>
    <input type="file" name="gallery[]" accept="image/jpeg,image/png,image/webp" multiple>
    <div class="hint">Bisa pilih beberapa file sekaligus.</div>
  </div>

  <div class="card form-grid">
    <strong>SEO (opsional)</strong>
    <label class="field">Judul SEO
      <input type="text" name="seo_title" value="<?= e($news['seo_title'] ?? '') ?>">
      <div class="hint">Kosongkan untuk memakai judul berita.</div>
    </label>
    <label class="field">Deskripsi SEO
      <textarea name="seo_description"><?= e($news['seo_description'] ?? '') ?></textarea>
      <div class="hint">Kosongkan untuk memakai ringkasan berita.</div>
    </label>
  </div>

  <div>
    <button class="btn" type="submit">Simpan</button>
    <a class="btn secondary" href="<?= adminUrl('news/list.php') ?>">Batal</a>
  </div>
</form>

<script src="<?= adminUrl('assets/quill.min.js') ?>"></script>
<script>
const quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [
      [{ header: [2, 3, false] }],
      ['bold', 'italic', 'underline'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link'],
      ['clean'],
    ],
  },
});
document.querySelector('form').addEventListener('submit', () => {
  document.getElementById('content-input').value = quill.getSemanticHTML();
});
</script>
<?php adminFooter(); ?>
