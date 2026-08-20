<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';

require __DIR__ . '/index_labels.php';

use App\Core\Database;

$counts = [];
foreach (Database::fetchAll('SELECT page_key, COUNT(*) AS n FROM page_fields GROUP BY page_key') as $r) {
    $counts[$r['page_key']] = (int) $r['n'];
}

adminHeader('Konten Halaman', ['subtitle' => 'Pilih halaman untuk mengubah teks, judul, dan pengaturan SEO-nya']);
?>
<table class="list">
  <tr><th>Halaman</th><th>Jumlah teks</th><th></th></tr>
  <?php foreach (PAGE_EDIT_LABELS as $key => $label): ?>
  <tr>
    <td><?= e($label) ?></td>
    <td><?= $counts[$key] ?? 0 ?></td>
    <td><a class="btn small secondary" href="<?= adminUrl('pages/edit.php?page=' . $key) ?>">Edit</a></td>
  </tr>
  <?php endforeach; ?>
</table>
<?php adminFooter(); ?>
