<?php

use App\Core\Icons;
use App\Core\View;

/**
 * /jurnal/{slug} — per-journal profile page (own SEO + Periodical schema).
 * All copy editable via admin: Konten Halaman > Akademik > Jurnal {NAMA}.
 * @var string $slug
 * @var array  $journal page_fields academics/jurnal_{slug}
 */
?>

<div class="page-wrapper pt-20 bg-white min-h-screen">

<?php View::partial('page-hero', ['badge' => 'Publikasi Ilmiah', 'title' => $journal['name'] ?? 'Jurnal']); ?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <nav class="flex items-center gap-2 text-xs text-gray-400 font-medium mb-10 flex-wrap" aria-label="Breadcrumb">
        <a href="<?= e(url('/')) ?>" class="hover:text-forest-600 transition-colors">Beranda</a>
        <span aria-hidden="true">/</span>
        <a href="<?= e(url('/akademik/jurnal')) ?>" class="hover:text-forest-600 transition-colors">Jurnal Ilmiah</a>
        <span aria-hidden="true">/</span>
        <span class="text-gray-600 break-words" aria-current="page"><?= e($journal['name'] ?? '') ?></span>
    </nav>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-10 items-start" data-reveal>

        <div class="md:col-span-2">
            <div class="bg-forest-900 rounded-[2.5rem] p-5 shadow-xl border border-white/5">
                <div class="bg-forest-800 overflow-hidden w-full rounded-[32px] aspect-[4/5]">
                    <?php if (!empty($journal['cover'])): ?>
                    <img src="<?= e(url($journal['cover'])) ?>" alt="Sampul jurnal <?= e($journal['name'] ?? '') ?>" class="w-full h-full object-cover">
                    <?php endif; ?>
                </div>
                <div class="text-center mt-6 px-2 pb-2">
                    <p class="uppercase font-black tracking-widest text-[10px] mb-1 text-gold-400">Peer Reviewed</p>
                    <p class="font-bold leading-tight text-white text-base break-words"><?= e($journal['full_name'] ?? '') ?></p>
                </div>
            </div>
        </div>

        <div class="md:col-span-3 space-y-8">
            <div class="card p-8">
                <h2 class="section-title text-xl mb-6">Tentang Jurnal</h2>
                <p class="text-sm text-gray-600 leading-relaxed"><?= e($journal['description'] ?? '') ?></p>

                <div class="mt-8 space-y-5">
                    <?php foreach ([
                        ['Nama Jurnal', $journal['full_name'] ?? ''],
                        ['Singkatan', $journal['name'] ?? ''],
                        ['Penerbit', 'Program Studi Ekonomi FEB Universitas Pasundan'],
                    ] as [$label, $value]): ?>
                    <div class="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1"><?= e($label) ?></span>
                        <span class="text-sm font-semibold text-forest-900 break-words"><?= e($value ?: '-') ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>

                <?php if (!empty($journal['url'])): ?>
                <div class="mt-8">
                    <a href="<?= e($journal['url']) ?>" target="_blank" rel="noopener noreferrer"
                       class="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-3 hover:bg-forest-800 transition-colors shadow-lg">
                        Kunjungi Situs Jurnal <?= Icons::svg('external-link', 'w-3.5 h-3.5') ?>
                    </a>
                </div>
                <?php endif; ?>
            </div>

            <a href="<?= e(url('/akademik/jurnal')) ?>" class="inline-flex items-center gap-2 text-forest-700 font-bold text-sm hover:text-gold-500 transition-colors px-2">
                <?= Icons::svg('chevron-left', 'w-4 h-4') ?> Lihat Semua Jurnal
            </a>
        </div>
    </div>
</div>
</div>
