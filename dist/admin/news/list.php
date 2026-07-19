<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';

use App\Core\Csrf;
use App\Core\Database;

$rows = Database::fetchAll(
    'SELECT n.*, c.name AS category_name
     FROM news n JOIN news_categories c ON c.id = n.category_id
     ORDER BY n.published_date DESC'
);

adminHeader('Berita & Kegiatan');
?>
<div class="toolbar">
  <span><?= count($rows) ?> berita</span>
  <a class="btn" href="<?= adminUrl('news/form.php') ?>">+ Tulis Berita</a>
</div>
<table class="list">
  <tr><th>Cover</th><th>Judul</th><th>Kategori</th><th>Tanggal</th><th>Dilihat</th><th>Status</th><th></th></tr>
  <?php foreach ($rows as $n): ?>
  <tr>
    <td><img class="thumb" src="<?= e(url($n['cover_image_path'])) ?>" alt=""></td>
    <td>
      <a href="<?= adminUrl('news/form.php?id=' . $n['id']) ?>"><?= e(mb_strimwidth($n['title'], 0, 80, '…')) ?></a>
      <?php if ($n['status'] === 'published'): ?>
        <div class="hint"><a href="<?= e(url('/berita-kegiatan/' . $n['slug'])) ?>" target="_blank">↗ lihat di situs</a></div>
      <?php endif; ?>
    </td>
    <td><?= e($n['category_name']) ?></td>
    <td><?= e($n['published_date']) ?></td>
    <td><?= number_format((int) ($n['view_count'] ?? 0), 0, ',', '.') ?></td>
    <td><span class="badge <?= e($n['status']) ?>"><?= $n['status'] === 'published' ? 'tayang' : 'draf' ?></span></td>
    <td style="white-space:nowrap">
      <a class="btn small secondary" href="<?= adminUrl('news/form.php?id=' . $n['id']) ?>">Edit</a>
      <form method="post" action="<?= adminUrl('news/delete.php') ?>" style="display:inline"
            onsubmit="return confirm('Hapus berita ini beserta semua gambarnya?')">
        <?= Csrf::field() ?>
        <input type="hidden" name="id" value="<?= (int) $n['id'] ?>">
        <button class="btn small danger" type="submit">Hapus</button>
      </form>
    </td>
  </tr>
  <?php endforeach; ?>
</table>
<?php adminFooter(); ?>
