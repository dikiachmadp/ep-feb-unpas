<?php

use App\Core\View;

/**
 * @var array $news    article row (content = sanitized HTML)
 * @var array $gallery image paths
 * @var array $related up to 3 other articles
 */
$coverImage = $gallery[0] ?? $news['cover_image_path'];
$extraImages = array_slice($gallery, 1);

// Interleave gallery images between content blocks, mirroring the old page:
// split after each closing </p>, insert an image every `step` blocks.
$blocks = preg_split('#(?<=</p>)\s*#', $news['content'], -1, PREG_SPLIT_NO_EMPTY) ?: [$news['content']];
$totalBlocks = count($blocks);
$totalImages = count($extraImages);
$step = $totalImages > 0 ? max(1, (int) floor($totalBlocks / ($totalImages + 1))) : $totalBlocks + 1;
?>
<div class="page-wrapper pt-28 pb-20 bg-gray-50 font-sans">
    <div class="max-w-4xl mx-auto px-6">

        <a href="<?= e(url('/berita-kegiatan')) ?>"
           class="inline-flex items-center gap-2 text-sm font-semibold text-forest-600 hover:text-forest-700 transition-colors mb-6 group">
            <span class="transform group-hover:-translate-x-1 transition-transform">&larr;</span>
            Back to News &amp; Activities
        </a>

        <div class="flex items-center gap-4 mb-4">
            <span class="bg-forest-100 text-forest-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <?= e($news['category_name'] ?? '') ?>
            </span>
            <span class="text-gray-400 text-sm font-medium"><?= e(tanggal_id($news['published_date'])) ?></span>
        </div>

        <h1 class="text-2xl md:text-4xl font-display font-bold text-gray-900 mb-8 leading-tight"><?= e($news['title']) ?></h1>

        <?php if ($coverImage): ?>
        <div class="w-full bg-gray-50 rounded-3xl overflow-hidden flex justify-center items-center p-2 border border-gray-100 shadow-md mb-10">
            <img src="<?= e(url($coverImage)) ?>" alt="Cover - <?= e($news['title']) ?>"
                 class="max-h-[600px] w-auto h-auto object-contain rounded-2xl">
        </div>
        <?php endif; ?>

        <div class="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 mb-16">
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

        <?php if ($related): ?>
        <div class="mt-16 pt-12 border-t border-gray-200">
            <h2 class="font-display font-bold text-xl md:text-2xl text-gray-800 mb-8">Other News &amp; Activities</h2>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                <?php foreach ($related as $item): ?>
                    <?php View::partial('news-card', ['item' => $item]); ?>
                <?php endforeach; ?>
            </div>
        </div>
        <?php endif; ?>

    </div>
</div>
