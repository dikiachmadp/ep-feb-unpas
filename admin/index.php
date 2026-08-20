<?php
require __DIR__ . '/_bootstrap.php';
require __DIR__ . '/_layout.php';

use App\Core\Database;

$stats = [
    'Berita'          => ['news/list.php', Database::fetch('SELECT COUNT(*) AS n FROM news')['n']],
    'Dosen'           => ['faculty/list.php', Database::fetch('SELECT COUNT(*) AS n FROM faculty WHERE is_active = 1')['n']],
    'Profil Lulusan'  => ['profiles/list.php', Database::fetch('SELECT COUNT(*) AS n FROM graduate_profiles WHERE is_active = 1')['n']],
    'Mitra'           => ['partners/list.php', Database::fetch('SELECT COUNT(*) AS n FROM partners WHERE is_active = 1')['n']],
    'Mata Kuliah'     => ['curriculum/index.php', Database::fetch('SELECT COUNT(*) AS n FROM curriculum_courses')['n']],
];

$recentNews = Database::fetchAll(
    "SELECT id, slug, title, status, published_date FROM news ORDER BY published_date DESC LIMIT 5"
);

adminHeader('Dashboard', ['subtitle' => 'Ringkasan konten website']);
?>

<div class="stats">
  <?php foreach ($stats as $label => [$href, $n]): ?>
  <a class="stat" href="<?= adminUrl($href) ?>">
    <div class="num"><?= (int) $n ?></div>
    <div class="lbl"><?= e($label) ?></div>
  </a>
  <?php endforeach; ?>
</div>

<div class="card">
  <div class="toolbar">
    <strong>Berita Terbaru</strong>
    <a class="btn small" href="<?= adminUrl('news/form.php') ?>">+ Tulis Berita</a>
  </div>
  <table class="list">
    <tr><th>Judul</th><th>Tanggal</th><th>Status</th></tr>
    <?php foreach ($recentNews as $n): ?>
    <tr>
      <td><a href="<?= adminUrl('news/form.php?id=' . $n['id']) ?>"><?= e($n['title']) ?></a></td>
      <td><?= e($n['published_date']) ?></td>
      <td><span class="badge <?= e($n['status']) ?>"><?= e($n['status']) ?></span></td>
    </tr>
    <?php endforeach; ?>
  </table>
</div>

<?php adminFooter(); ?>
