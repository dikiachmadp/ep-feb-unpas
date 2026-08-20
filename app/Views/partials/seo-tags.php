<?php
/**
 * Per-page SEO head tags. Every route ships unique title/description/
 * canonical/OG/Twitter/JSON-LD in the initial HTML — the core SEO upgrade
 * over the old SPA, which rendered these only after JS ran.
 *
 * @var \App\Core\Seo $seo
 */
?>
    <title><?= e($seo->title) ?></title>
    <meta name="description" content="<?= e($seo->description) ?>">
    <meta name="keywords" content="Ekonomi FEB Unpas, Ekonomi Pembangunan FEB Unpas, Ekonomi Bisnis FEB Unpas, Prodi Ekonomi Universitas Pasundan, FEB Unpas">
    <meta name="robots" content="<?= e($seo->robots) ?>">
    <link rel="canonical" href="<?= e($seo->canonical) ?>">
    <meta property="og:type" content="<?= e($seo->type) ?>">
    <meta property="og:title" content="<?= e($seo->title) ?>">
    <meta property="og:description" content="<?= e($seo->description) ?>">
    <meta property="og:url" content="<?= e($seo->canonical) ?>">
    <meta property="og:image" content="<?= e($seo->image) ?>">
    <meta property="og:site_name" content="Ekonomi FEB UNPAS">
    <meta property="og:locale" content="id_ID">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= e($seo->title) ?>">
    <meta name="twitter:description" content="<?= e($seo->description) ?>">
    <meta name="twitter:image" content="<?= e($seo->image) ?>">
<?php foreach ($seo->jsonLd as $block): ?>
    <script type="application/ld+json"><?= json_encode($block, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?></script>
<?php endforeach; ?>
