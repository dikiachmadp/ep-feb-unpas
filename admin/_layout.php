<?php
/**
 * Admin layout helpers. Usage in a page script:
 *   require __DIR__ . '/_bootstrap.php';   (or ../_bootstrap.php from subdirs)
 *   adminHeader('Berita');
 *   ...page content...
 *   adminFooter();
 */

use App\Core\Auth;
use App\Core\Session;

function adminUrl(string $path = ''): string
{
    return url('/admin/' . ltrim($path, '/'));
}

function adminHeader(string $title, array $options = []): void
{
    $user = Auth::user();
    $current = $_SERVER['SCRIPT_NAME'] ?? '';
    $nav = [
        'Dashboard'      => 'index.php',
        'Berita'         => 'news/list.php',
        'Dosen'          => 'faculty/list.php',
        'Profil Lulusan' => 'profiles/list.php',
        'Kurikulum'      => 'curriculum/index.php',
        'Konten Halaman' => 'pages/index.php',
    ];
    if (Auth::isAdmin()) {
        $nav['Pengguna Admin'] = 'users/list.php';
    }
    $isActive = function (string $href) use ($current): bool {
        $dir = dirname($href);
        return $dir === '.'
            ? str_ends_with($current, '/admin/' . $href)
            : str_contains($current, '/admin/' . $dir . '/');
    };
    ?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title><?= e($title) ?> – Admin FEB UNPAS</title>
<link rel="stylesheet" href="<?= adminUrl('assets/admin.css') ?>">
<?php if (!empty($options['quill'])): ?>
<link rel="stylesheet" href="<?= adminUrl('assets/quill.snow.css') ?>">
<?php endif; ?>
</head>
<body>
<div class="admin-shell">
  <aside class="sidebar">
    <div class="brand">Admin CMS<small>Ekonomi FEB UNPAS</small></div>
    <nav>
      <?php foreach ($nav as $label => $href): ?>
      <a href="<?= adminUrl($href) ?>" class="<?= $isActive($href) ? 'active' : '' ?>"><?= e($label) ?></a>
      <?php endforeach; ?>
      <div class="logout">
        <a href="<?= url('/') ?>" target="_blank">↗ Lihat Situs</a>
        <a href="<?= adminUrl('logout.php') ?>">Keluar (<?= e($user['name'] ?? '') ?>)</a>
      </div>
    </nav>
  </aside>
  <main class="main">
    <h1><?= e($title) ?></h1>
    <?php if (!empty($options['subtitle'])): ?><p class="subtitle"><?= e($options['subtitle']) ?></p><?php endif; ?>
    <?php if ($ok = Session::flash('ok')): ?><div class="flash ok"><?= e($ok) ?></div><?php endif; ?>
    <?php if ($err = Session::flash('err')): ?><div class="flash err"><?= e($err) ?></div><?php endif; ?>
    <?php
}

function adminFooter(): void
{
    ?>
  </main>
</div>
</body>
</html>
    <?php
}
