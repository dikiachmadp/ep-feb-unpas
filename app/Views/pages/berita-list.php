<?php

use App\Core\View;

/**
 * @var array $fields     page_fields news_page
 * @var array $news       all published news
 * @var array $categories category names with published news
 */
$main = $fields['main'] ?? [];
?>
<div class="page-wrapper pt-20">

    <?php View::partial('page-hero', [
        'badge' => $main['hero'] ?? 'Berita Terbaru',
        'title' => $main['title'] ?? 'Berita Kampus',
    ]); ?>

    <section class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <?php View::partial('section-header', [
                    'title'    => $main['title'] ?? 'Berita Kampus',
                    'subtitle' => 'Informasi Terkini',
                ]); ?>

                <div class="flex flex-wrap gap-2" data-news-filter>
                    <button type="button" data-filter="all"
                            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-forest-500 text-white shadow-md">
                        <?= e($main['all'] ?? 'Semua') ?>
                    </button>
                    <?php foreach ($categories as $category): ?>
                    <button type="button" data-filter="<?= e($category) ?>"
                            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-200">
                        <?= e($category) ?>
                    </button>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-news-grid>
                <?php foreach ($news as $item): ?>
                    <?php View::partial('news-card', ['item' => $item]); ?>
                <?php endforeach; ?>
            </div>

            <div class="hidden text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200" data-news-empty>
                <p class="text-gray-500 font-sans"><?= e($main['empty'] ?? 'Belum ada berita untuk kategori ini.') ?></p>
            </div>
        </div>
    </section>
</div>
