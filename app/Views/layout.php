<?php

use App\Core\Seo;
use App\Core\View;
use App\Models\Page;

/** @var Seo $seo set by every controller; hard fallback for safety */
$seo = $seo ?? Seo::page(config('app.name', 'Ekonomi Pembangunan FEB UNPAS'), '');

$navLabels   = Page::fields('nav')['main'] ?? [];
$navRoutes   = [
    ['key' => 'home',         'path' => '/'],
    ['key' => 'profile',      'path' => '/profil'],
    ['key' => 'academics',    'path' => '/akademik'],
    ['key' => 'student',      'path' => '/mahasiswa'],
    ['key' => 'registration', 'path' => '/pendaftaran'],
    ['key' => 'news',         'path' => '/berita-kegiatan'],
];
$currentPath = rtrim(parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/', '/') ?: '/';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php View::partial('seo-tags', ['seo' => $seo]); ?>
    <link rel="icon" type="image/webp" href="<?= e(url('/favicon.webp')) ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<?= e(url('/assets/css/app.css')) ?>">
</head>
<body>
    <?php View::partial('navbar', [
        'navLabels'   => $navLabels,
        'navRoutes'   => $navRoutes,
        'currentPath' => $currentPath,
    ]); ?>

    <main><?= $content ?? '' ?></main>

    <?php View::partial('footer', [
        'navLabels' => $navLabels,
        'navRoutes' => $navRoutes,
    ]); ?>

    <script src="<?= e(url('/assets/js/app.js')) ?>" defer></script>
</body>
</html>
