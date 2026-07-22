<?php

use App\Core\Icons;
use App\Core\View;
use App\Models\Faculty;

/**
 * /dosen/{slug} — per-lecturer profile page. Exists primarily for SEO:
 * unique <title> + Person JSON-LD per dosen so name searches land here.
 * @var array $dosen faculty row (with 'slug')
 * @var array<string, array<int, array>> $items detail sections grouped by section_key
 */

// External academic profiles → button links, only the ones that are filled.
$profileLinks = array_filter([
    ['Google Scholar', $dosen['scholar_url'] ?? null],
    ['SINTA',          $dosen['sinta_url'] ?? null],
    ['Scopus',         $dosen['scopus_url'] ?? null],
], fn($l) => !empty($l[1]));

// Bidang Keahlian is comma-separated → render each value as its own tag.
$expertiseTags = array_values(array_filter(array_map('trim', explode(',', (string) ($dosen['expertise'] ?? '')))));
?>

<div class="page-wrapper pt-20 bg-white min-h-screen">

<?php
// Uniform hero on every dosen page; the dosen name stays the page's h1 in the
// profile card below so name searches keep their strongest signal.
View::partial('page-hero', ['badge' => 'Tenaga Pengajar', 'title' => 'Profil Dosen', 'headingTag' => 'p']);
?>

<div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start" data-reveal>

        <!-- KOLOM KIRI: foto + identitas + Informasi Akademik (sticky di desktop) -->
        <aside class="md:col-span-1 md:sticky md:top-28 self-start space-y-6">
            <div>
                <div class="max-w-[300px] mx-auto bg-forest-50 overflow-hidden w-full rounded-[2rem] aspect-[4/5] shadow-lg">
                    <?php if (!empty($dosen['photo_path'])): ?>
                    <img src="<?= e(url($dosen['photo_path'])) ?>" alt="<?= e($dosen['full_name']) ?>" class="w-full h-full object-cover">
                    <?php endif; ?>
                </div>
                <div class="text-center mt-5">
                    <span class="inline-block bg-gold-400 text-forest-900 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2"><?= e($dosen['position']) ?></span>
                    <h1 class="font-bold leading-tight text-forest-900 text-lg break-words px-2"><?= e($dosen['full_name']) ?></h1>
                </div>
            </div>

            <div class="card p-6">
                <h2 class="section-title text-base mb-5">Informasi Akademik</h2>
                <div class="space-y-4">
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">Status</span>
                        <span class="text-sm font-semibold text-forest-900 break-words"><?= e($dosen['position'] ?: '-') ?></span>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">Bidang Keahlian</span>
                        <?php if ($expertiseTags): ?>
                        <div class="flex flex-wrap gap-1.5">
                            <?php foreach ($expertiseTags as $tag): ?>
                            <span class="inline-block bg-forest-50 text-forest-800 text-xs font-semibold px-2.5 py-1 rounded-lg"><?= e($tag) ?></span>
                            <?php endforeach; ?>
                        </div>
                        <?php else: ?>
                        <span class="text-sm font-semibold text-forest-900">-</span>
                        <?php endif; ?>
                    </div>
                    <?php foreach ([['NIDN / NIDK', $dosen['nidn']], ['Email Resmi', $dosen['email']]] as [$label, $value]): ?>
                    <div class="flex flex-col">
                        <span class="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1"><?= e($label) ?></span>
                        <span class="text-sm font-semibold text-forest-900 break-words"><?= e($value ?: '-') ?></span>
                    </div>
                    <?php endforeach; ?>
                </div>

                <?php if ($profileLinks): ?>
                <div class="mt-6 grid grid-cols-1 gap-2">
                    <?php foreach ($profileLinks as [$label, $link]): ?>
                    <a href="<?= e($link) ?>" target="_blank" rel="noopener noreferrer"
                       class="py-3 px-4 bg-forest-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-forest-800 transition-colors shadow">
                        <?= e($label) ?> <?= Icons::svg('external-link', 'w-3.5 h-3.5') ?>
                    </a>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
            </div>
        </aside>

        <!-- KOLOM KANAN: biografi + section berulang -->
        <div class="md:col-span-2 space-y-6">
            <?php // Biografi Singkat — narrative intro (falls back to an auto-generated line). ?>
            <div class="card p-8">
                <h2 class="section-title text-xl mb-4">Biografi Singkat</h2>
                <p class="text-sm text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                    <?php if (!empty($dosen['bio'])): ?>
                    <?= e($dosen['bio']) ?>
                    <?php else: ?>
                    <?= e($dosen['full_name']) ?> adalah <?= e(lcfirst($dosen['position'])) ?> pada
                    Program Studi Ekonomi, Fakultas Ekonomi dan Bisnis, Universitas Pasundan,
                    dengan bidang keahlian <?= e($dosen['expertise']) ?>.
                    <?php endif; ?>
                </p>
            </div>

            <?php foreach (Faculty::SECTIONS as $section => $heading): ?>
                <?php if (empty($items[$section])) { continue; } ?>
                <?php
                $list = $items[$section];
                // Publikasi diurut tahun menurun (terbaru di atas).
                if ($section === 'publications') {
                    usort($list, fn($a, $b) => (int) ($b['meta'] ?? 0) <=> (int) ($a['meta'] ?? 0));
                }
                ?>
                <div class="card p-8">
                    <h2 class="section-title text-xl mb-5"><?= e($heading) ?></h2>

                    <?php if ($section === 'teaching'): ?>
                    <div class="flex flex-wrap gap-2">
                        <?php foreach ($list as $it): ?>
                        <span class="inline-block bg-forest-50 text-forest-800 text-xs font-semibold px-3 py-2 rounded-xl"><?= e($it['title']) ?></span>
                        <?php endforeach; ?>
                    </div>

                    <?php else: ?>
                    <ul class="space-y-4">
                        <?php foreach ($list as $it): ?>
                        <?php
                        // Publikasi tampil sebagai "Tahun – Judul"; section lain: judul + tahun sebagai badge.
                        $isPub = $section === 'publications';
                        $mainText = ($isPub && !empty($it['meta']))
                            ? $it['meta'] . ' – ' . $it['title']
                            : $it['title'];
                        ?>
                        <li class="flex gap-4 border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0"></span>
                            <div class="min-w-0 flex-1">
                                <div class="flex items-start justify-between gap-3">
                                    <p class="text-sm font-semibold text-forest-900 break-words">
                                        <?php if (!empty($it['url'])): ?>
                                        <a href="<?= e($it['url']) ?>" target="_blank" rel="noopener noreferrer" class="hover:text-gold-600 transition-colors inline-flex items-center gap-1.5">
                                            <?= e($mainText) ?> <?= Icons::svg('external-link', 'w-3 h-3 flex-shrink-0') ?>
                                        </a>
                                        <?php else: ?>
                                        <?= e($mainText) ?>
                                        <?php endif; ?>
                                    </p>
                                    <?php if (!$isPub && !empty($it['meta'])): ?>
                                    <span class="text-[11px] font-bold text-gray-400 whitespace-nowrap mt-0.5"><?= e($it['meta']) ?></span>
                                    <?php endif; ?>
                                </div>
                                <?php if (!empty($it['subtitle'])): ?>
                                <p class="text-xs text-gray-500 mt-1 break-words"><?= e($it['subtitle']) ?></p>
                                <?php endif; ?>
                            </div>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>

            <a href="<?= e(url('/akademik/dosen')) ?>" class="inline-flex items-center gap-2 text-forest-700 font-bold text-sm hover:text-gold-500 transition-colors px-2">
                <?= Icons::svg('chevron-left', 'w-4 h-4') ?> Lihat Semua Dosen
            </a>
        </div>
    </div>
</div>
</div>
