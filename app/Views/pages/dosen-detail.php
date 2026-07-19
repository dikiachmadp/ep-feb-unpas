<?php

use App\Core\Icons;
use App\Core\View;

/**
 * /dosen/{slug} — per-lecturer profile page. Exists primarily for SEO:
 * unique <title> + Person JSON-LD per dosen so name searches land here.
 * @var array $dosen faculty row (with 'slug')
 */
?>

<div class="page-wrapper pt-20 bg-white min-h-screen">

<?php
// Uniform hero on every dosen page; the dosen name stays the page's h1 in the
// profile card below so name searches keep their strongest signal.
View::partial('page-hero', ['badge' => 'Tenaga Pengajar', 'title' => 'Profil Dosen', 'headingTag' => 'p']);
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-10 items-start" data-reveal>

        <div class="md:col-span-2">
            <div class="bg-forest-900 rounded-[2.5rem] p-5 shadow-xl border border-white/5">
                <div class="bg-forest-800 overflow-hidden w-full rounded-[32px] aspect-[4/5]">
                    <?php if (!empty($dosen['photo_path'])): ?>
                    <img src="<?= e(url($dosen['photo_path'])) ?>" alt="<?= e($dosen['full_name']) ?>" class="w-full h-full object-cover">
                    <?php endif; ?>
                </div>
                <div class="text-center mt-6 px-2 pb-2">
                    <p class="uppercase font-black tracking-widest text-[10px] mb-1 text-gold-400"><?= e($dosen['position']) ?></p>
                    <h1 class="font-bold leading-tight text-white text-base break-words"><?= e($dosen['full_name']) ?></h1>
                </div>
            </div>
        </div>

        <div class="md:col-span-3 space-y-8">
            <div class="card p-8">
                <h3 class="section-title text-xl mb-6">Informasi Akademik</h3>
                <div class="space-y-5">
                    <?php foreach ([
                        ['Jabatan Fungsional', $dosen['position']],
                        ['Bidang Keahlian', $dosen['expertise']],
                        ['NIDN / NIDK', $dosen['nidn']],
                        ['Email Resmi', $dosen['email']],
                        ['Sinta ID', $dosen['orcid_id']],
                    ] as [$label, $value]): ?>
                    <div class="flex flex-col border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1"><?= e($label) ?></span>
                        <span class="text-sm font-semibold text-forest-900 break-words"><?= e($value ?: '-') ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>

                <?php if (!empty($dosen['scholar_url'])): ?>
                <div class="mt-8">
                    <a href="<?= e($dosen['scholar_url']) ?>" target="_blank" rel="noopener noreferrer"
                       class="w-full py-4 bg-forest-700 text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-3 hover:bg-forest-800 transition-colors shadow-lg">
                        Lihat Publikasi Ilmiah <?= Icons::svg('external-link', 'w-3.5 h-3.5') ?>
                    </a>
                </div>
                <?php endif; ?>
            </div>

            <p class="text-sm text-gray-500 leading-relaxed px-2">
                <?= e($dosen['full_name']) ?> adalah <?= e(lcfirst($dosen['position'])) ?> pada
                Program Studi Ekonomi Pembangunan, Fakultas Ekonomi dan Bisnis, Universitas Pasundan,
                dengan bidang keahlian <?= e($dosen['expertise']) ?>.
            </p>

            <a href="<?= e(url('/akademik/dosen')) ?>" class="inline-flex items-center gap-2 text-forest-700 font-bold text-sm hover:text-gold-500 transition-colors px-2">
                <?= Icons::svg('chevron-left', 'w-4 h-4') ?> Lihat Semua Dosen
            </a>
        </div>
    </div>
</div>
</div>
