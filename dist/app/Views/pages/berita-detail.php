<?php

use App\Core\Icons;
use App\Core\View;

/**
 * @var array $news     article row (content = sanitized HTML)
 * @var array $gallery  image paths
 * @var array $related  up to 3 other articles
 * @var array $adjacent ['prev' => ?row, 'next' => ?row] in reading order
 */
$coverImage = $gallery[0] ?? $news['cover_image_path'];
$extraImages = array_slice($gallery, 1);

// Interleave gallery images between content blocks, mirroring the old page:
// split after each closing </p>, insert an image every `step` blocks.
$blocks = preg_split('#(?<=</p>)\s*#', $news['content'], -1, PREG_SPLIT_NO_EMPTY) ?: [$news['content']];
$totalBlocks = count($blocks);
$totalImages = count($extraImages);
$step = $totalImages > 0 ? max(1, (int) floor($totalBlocks / ($totalImages + 1))) : $totalBlocks + 1;

$articleUrl = url('/berita-kegiatan/' . $news['slug']);
$readMinutes = max(1, (int) ceil(str_word_count(strip_tags($news['content'])) / 200));
$viewCount = (int) ($news['view_count'] ?? 0);

$shareText = rawurlencode($news['title'] . ' — ' . $articleUrl);
$shareLinks = [
    ['icon' => 'whatsapp',  'label' => 'Bagikan ke WhatsApp', 'href' => 'https://wa.me/?text=' . $shareText],
    ['icon' => 'facebook',  'label' => 'Bagikan ke Facebook', 'href' => 'https://www.facebook.com/sharer/sharer.php?u=' . rawurlencode($articleUrl)],
    ['icon' => 'twitter-x', 'label' => 'Bagikan ke X',        'href' => 'https://twitter.com/intent/tweet?url=' . rawurlencode($articleUrl) . '&text=' . rawurlencode($news['title'])],
];
?>
<div class="page-wrapper pt-28 pb-20 bg-gray-50 font-sans">
    <div class="max-w-4xl mx-auto px-6">

        <nav class="flex items-center gap-2 text-xs text-gray-400 font-medium mb-6 flex-wrap" aria-label="Breadcrumb">
            <a href="<?= e(url('/')) ?>" class="hover:text-forest-600 transition-colors">Beranda</a>
            <span aria-hidden="true">/</span>
            <a href="<?= e(url('/berita-kegiatan')) ?>" class="hover:text-forest-600 transition-colors">Berita &amp; Kegiatan</a>
            <span aria-hidden="true">/</span>
            <span class="text-gray-600 line-clamp-1 max-w-[220px] sm:max-w-md" aria-current="page"><?= e($news['title']) ?></span>
        </nav>

        <div class="flex items-center gap-x-4 gap-y-2 mb-4 flex-wrap">
            <span class="bg-forest-100 text-forest-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <?= e($news['category_name'] ?? '') ?>
            </span>
            <span class="text-gray-400 text-sm font-medium"><?= e(tanggal_id($news['published_date'])) ?></span>
        </div>

        <h1 class="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-5 leading-tight break-words"><?= e($news['title']) ?></h1>

        <div class="flex items-center gap-x-5 gap-y-2 mb-8 flex-wrap text-sm text-gray-500">
            <?php if (!empty($news['author_name'])): ?>
            <span class="inline-flex items-center gap-2">
                <?= Icons::svg('users', 'w-4 h-4 text-forest-500') ?>
                <span class="font-semibold text-gray-700"><?= e($news['author_name']) ?></span>
            </span>
            <?php endif; ?>
            <span class="inline-flex items-center gap-2">
                <?= Icons::svg('eye', 'w-4 h-4 text-forest-500') ?>
                <?= number_format($viewCount, 0, ',', '.') ?> kali dilihat
            </span>
            <span class="inline-flex items-center gap-2">
                <?= Icons::svg('clock', 'w-4 h-4 text-forest-500') ?>
                <?= $readMinutes ?> menit baca
            </span>
        </div>

        <?php if ($coverImage): ?>
        <div class="w-full bg-gray-50 rounded-3xl overflow-hidden flex justify-center items-center p-2 border border-gray-100 shadow-md mb-10">
            <img src="<?= e(url($coverImage)) ?>" alt="Sampul - <?= e($news['title']) ?>"
                 class="max-h-[600px] w-auto h-auto object-contain rounded-2xl">
        </div>
        <?php endif; ?>

        <div class="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-10">
            <div class="article-content space-y-6">
                <?php
                $inserted = 0;
                foreach ($blocks as $i => $block):
                    echo $block; // sanitized in the admin before saving (Html::sanitize)
                    if ($inserted < $totalImages
                        && ((($i + 1) % $step === 0) || ($i === $totalBlocks - 1))):
                ?>
                <div class="my-8 w-full bg-gray-50/50 rounded-2xl overflow-hidden flex justify-center items-center p-2 border border-gray-100 shadow-sm">
                    <img src="<?= e(url($extraImages[$inserted])) ?>" alt="Dokumentasi <?= $inserted + 1 ?>" loading="lazy"
                         class="max-h-[550px] w-auto h-auto object-contain rounded-xl transition-transform duration-500 hover:scale-[1.01]">
                </div>
                <?php
                        $inserted++;
                    endif;
                endforeach;
                ?>
            </div>
        </div>

        <div class="flex items-center justify-between gap-4 flex-wrap mb-16">
            <a href="<?= e(url('/berita-kegiatan')) ?>"
               class="inline-flex items-center gap-2 text-sm font-semibold text-forest-600 hover:text-forest-700 transition-colors group">
                <span class="transform group-hover:-translate-x-1 transition-transform">&larr;</span>
                Kembali ke Berita &amp; Kegiatan
            </a>

            <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs font-bold text-gray-400 uppercase tracking-widest mr-1">Bagikan</span>
                <?php foreach ($shareLinks as $share): ?>
                <a href="<?= e($share['href']) ?>" target="_blank" rel="noopener noreferrer" aria-label="<?= e($share['label']) ?>"
                   class="w-9 h-9 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-forest-600 hover:text-white hover:border-forest-600 transition-colors">
                    <?= Icons::svg($share['icon'], 'w-4 h-4') ?>
                </a>
                <?php endforeach; ?>
                <button type="button" data-copy-link="<?= e($articleUrl) ?>" aria-label="Salin tautan artikel"
                        class="inline-flex items-center gap-2 h-9 px-3 rounded-xl bg-white border border-gray-200 text-gray-500 text-xs font-semibold hover:bg-forest-600 hover:text-white hover:border-forest-600 transition-colors">
                    <?= Icons::svg('copy', 'w-4 h-4') ?>
                    <span data-copy-label>Salin Tautan</span>
                </button>
            </div>
        </div>

        <?php if (!empty($adjacent['prev']) || !empty($adjacent['next'])): ?>
        <div class="grid sm:grid-cols-2 gap-4 mb-16">
            <?php if (!empty($adjacent['prev'])): ?>
            <a href="<?= e(url('/berita-kegiatan/' . $adjacent['prev']['slug'])) ?>"
               class="group p-5 bg-white border border-gray-100 rounded-2xl hover:border-forest-200 hover:shadow-md transition-all">
                <span class="inline-flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    <?= Icons::svg('chevron-left', 'w-3 h-3') ?> Berita Sebelumnya
                </span>
                <p class="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-forest-600 transition-colors">
                    <?= e($adjacent['prev']['title']) ?>
                </p>
            </a>
            <?php else: ?>
            <span class="hidden sm:block"></span>
            <?php endif; ?>

            <?php if (!empty($adjacent['next'])): ?>
            <a href="<?= e(url('/berita-kegiatan/' . $adjacent['next']['slug'])) ?>"
               class="group p-5 bg-white border border-gray-100 rounded-2xl hover:border-forest-200 hover:shadow-md transition-all sm:text-right">
                <span class="inline-flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                    Berita Berikutnya <?= Icons::svg('chevron-right', 'w-3 h-3') ?>
                </span>
                <p class="text-sm font-bold text-gray-800 leading-snug line-clamp-2 group-hover:text-forest-600 transition-colors">
                    <?= e($adjacent['next']['title']) ?>
                </p>
            </a>
            <?php endif; ?>
        </div>
        <?php endif; ?>

        <?php if ($related): ?>
        <div class="pt-12 border-t border-gray-200">
            <h2 class="font-display font-bold text-xl md:text-2xl text-gray-800 mb-8">Berita &amp; Kegiatan Lainnya</h2>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <?php foreach ($related as $item): ?>
                    <?php View::partial('news-card', ['item' => $item]); ?>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

    </div>
</div>
