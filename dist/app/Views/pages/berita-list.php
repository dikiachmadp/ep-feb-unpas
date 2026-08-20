<?php

use App\Core\Icons;
use App\Core\View;

/**
 * @var array $fields         page_fields news_page
 * @var array $news           published news for the current page
 * @var array $categories     category names with published news
 * @var ?string $activeCategory
 * @var int $page
 * @var int $totalPages
 */
$main = $fields['main'] ?? [];

// Link filter/pagination server-side; kategori pindah selalu reset ke halaman 1.
$listUrl = static function (?string $category, int $page = 1): string {
    $query = [];
    if ($category !== null && $category !== '') {
        $query['kategori'] = $category;
    }
    if ($page > 1) {
        $query['page'] = $page;
    }
    return url('/berita-kegiatan' . ($query ? '?' . http_build_query($query) : ''));
};
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

                <div class="flex flex-wrap gap-2">
                    <a href="<?= e($listUrl(null)) ?>"
                       class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 <?= $activeCategory === null
                            ? 'bg-forest-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ?>">
                        <?= e($main['all'] ?? 'Semua') ?>
                    </a>
                    <?php foreach ($categories as $category): ?>
                    <a href="<?= e($listUrl($category)) ?>"
                       class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 <?= $activeCategory === $category
                            ? 'bg-forest-500 text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ?>">
                        <?= e($category) ?>
                    </a>
                    <?php endforeach; ?>
                </div>
            </div>

            <?php if ($news): ?>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php foreach ($news as $item): ?>
                    <?php View::partial('news-card', ['item' => $item]); ?>
                <?php endforeach; ?>
            </div>
            <?php else: ?>
            <div class="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p class="text-gray-500 font-sans"><?= e($main['empty'] ?? 'Belum ada berita untuk kategori ini.') ?></p>
            </div>
            <?php endif; ?>

            <?php if ($totalPages > 1): ?>
            <nav class="mt-14 flex items-center justify-center gap-2 flex-wrap" aria-label="Navigasi halaman berita">
                <?php if ($page > 1): ?>
                <a href="<?= e($listUrl($activeCategory, $page - 1)) ?>" rel="prev" aria-label="Halaman sebelumnya"
                   class="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-forest-500 hover:text-white transition-colors flex items-center justify-center">
                    <?= Icons::svg('chevron-left', 'w-4 h-4') ?>
                </a>
                <?php endif; ?>

                <?php for ($p = 1; $p <= $totalPages; $p++): ?>
                <a href="<?= e($listUrl($activeCategory, $p)) ?>" <?= $p === $page ? 'aria-current="page"' : '' ?>
                   class="min-w-[2.5rem] h-10 px-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center <?= $p === $page
                        ? 'bg-forest-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ?>">
                    <?= $p ?>
                </a>
                <?php endfor; ?>

                <?php if ($page < $totalPages): ?>
                <a href="<?= e($listUrl($activeCategory, $page + 1)) ?>" rel="next" aria-label="Halaman berikutnya"
                   class="w-10 h-10 rounded-xl bg-gray-100 text-gray-600 hover:bg-forest-500 hover:text-white transition-colors flex items-center justify-center">
                    <?= Icons::svg('chevron-right', 'w-4 h-4') ?>
                </a>
                <?php endif; ?>
            </nav>
            <?php endif; ?>
        </div>
    </section>
</div>
