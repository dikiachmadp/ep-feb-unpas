<?php

use App\Core\Icons;
use App\Core\View;

/**
 * @var array $fields page_fields profile
 * @var array $history, $milestones, $missions, $objectives, $advantages,
 *            $achievements, $facilities  page_items rows
 */
$main = $fields['main'] ?? [];
$hist = $fields['history'] ?? [];
$identity = $fields['identity'] ?? [];
$vision = $fields['vision'] ?? [];
$adv = $fields['advantages'] ?? [];
$ach = $fields['achievements'] ?? [];
$fac = $fields['facilities'] ?? [];

$menu = [
    ['id' => 'sejarah',    'label' => 'History',        'icon' => 'clock'],
    ['id' => 'logo',       'label' => 'Identity',       'icon' => 'hexagon'],
    ['id' => 'visimisi',   'label' => 'Vision Mission', 'icon' => 'target'],
    ['id' => 'keunggulan', 'label' => 'Excellence',     'icon' => 'star'],
    ['id' => 'capaian',    'label' => 'Achievements',   'icon' => 'award'],
    ['id' => 'fasilitas',  'label' => 'Facilities',     'icon' => 'map-pin'],
];
$advIcons = ['zap', 'award', 'hexagon', 'check-circle'];
?>
<div class="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

    <?php View::partial('page-hero', [
        'badge' => $main['hero_badge'] ?? '',
        'title' => $main['title'] ?? 'Study Program Profile',
    ]); ?>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="flex flex-col lg:flex-row gap-12">

            <?php View::partial('tab-nav', ['menu' => $menu, 'active' => 'sejarah', 'menuTitle' => 'Menu Profil', 'mobileCols' => 6]); ?>

            <main class="flex-1">

                <!-- 1. SEJARAH -->
                <section class="space-y-10 tab-panel" data-panel="sejarah">
                    <?php View::partial('section-header', ['subtitle' => 'Sejarah', 'title' => $hist['title'] ?? '']); ?>
                    <div class="grid lg:grid-cols-5 gap-8">
                        <div class="lg:col-span-3 w-full overflow-hidden">
                            <div class="relative" data-slider>
                                <div class="overflow-hidden rounded-[2.5rem]">
                                    <div class="flex transition-transform duration-500 ease-in-out" data-slider-track>
                                        <?php foreach ($history as $i => $paragraph): ?>
                                        <div class="w-full flex-shrink-0">
                                            <div class="mx-1 p-7 lg:p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 italic text-gray-700 leading-relaxed relative min-h-[400px] flex flex-col justify-center shadow-sm">
                                                <span class="text-6xl lg:text-7xl text-forest-200 absolute -top-4 -left-2 font-serif opacity-30 select-none pointer-events-none">&ldquo;</span>
                                                <div class="absolute top-6 right-8 flex flex-col items-end">
                                                    <span class="font-display text-4xl lg:text-5xl text-forest-100 font-black opacity-20"><?= str_pad((string) ($i + 1), 2, '0', STR_PAD_LEFT) ?></span>
                                                </div>
                                                <p class="relative z-10 text-sm lg:text-lg leading-loose lg:leading-relaxed"><?= e($paragraph['description']) ?></p>
                                            </div>
                                        </div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                                <div class="flex items-center justify-between mt-6 px-2">
                                    <div class="flex gap-3">
                                        <button type="button" data-slider-prev class="p-4 rounded-2xl border transition-all bg-white hover:bg-forest-50 border-forest-100 text-forest-700 shadow-sm disabled:opacity-20 disabled:cursor-not-allowed disabled:border-gray-100">
                                            <?= Icons::svg('chevron-left', 'w-5 h-5') ?>
                                        </button>
                                        <button type="button" data-slider-next class="p-4 rounded-2xl border transition-all bg-white hover:bg-forest-50 border-forest-100 text-forest-700 shadow-sm disabled:opacity-20 disabled:cursor-not-allowed disabled:border-gray-100">
                                            <?= Icons::svg('chevron-right', 'w-5 h-5') ?>
                                        </button>
                                    </div>
                                    <div class="flex gap-1.5" data-slider-dots>
                                        <?php foreach ($history as $i => $_): ?>
                                        <div class="h-1.5 rounded-full transition-all duration-300 <?= $i === 0 ? 'w-8 bg-gold-400' : 'w-2 bg-gray-200' ?>"></div>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-8 flex gap-4 p-5 bg-forest-700 rounded-[2rem] text-white shadow-lg items-center">
                                <div class="bg-white/10 p-2 rounded-xl"><?= Icons::svg('zap', 'w-6 h-6 text-gold-400') ?></div>
                                <p class="text-xs lg:text-sm font-medium leading-snug"><?= e($hist['footer'] ?? '') ?></p>
                            </div>
                        </div>
                        <div class="lg:col-span-2 space-y-4">
                            <h4 class="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2"><?= e($hist['timeline_label'] ?? 'Timeline') ?></h4>
                            <div class="grid gap-3">
                                <?php foreach ($milestones as $m): ?>
                                <div class="flex gap-4 items-center p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
                                    <div class="bg-gold-50 px-3 py-1 rounded-lg">
                                        <span class="font-display font-black text-forest-700 text-sm"><?= e($m['label_year']) ?></span>
                                    </div>
                                    <p class="text-xs text-gray-500 font-medium"><?= e($m['description']) ?></p>
                                </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 2. IDENTITAS VISUAL -->
                <section class="space-y-12 tab-panel hidden" data-panel="logo">
                    <?php View::partial('section-header', ['subtitle' => 'Brand Guideline', 'title' => $identity['title'] ?? '']); ?>
                    <div class="space-y-16">
                        <div class="grid lg:grid-cols-12 gap-10 items-start">
                            <div class="lg:col-span-5 bg-gray-50 rounded-[3rem] p-12 flex flex-col items-center justify-center border border-gray-100 shadow-inner relative overflow-hidden group min-h-[400px]">
                                <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(#064E3B 1px, transparent 1px), linear-gradient(90deg, #064E3B 1px, transparent 1px); background-size: 20px 20px;"></div>
                                <div class="relative z-10 w-48 h-48 lg:w-56 lg:h-56 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center p-8 border border-gray-50 hover:scale-105 transition-transform duration-300">
                                    <img src="<?= e(url('/logo.webp')) ?>" alt="<?= e($identity['labels_official_mark'] ?? 'Logo') ?>" class="w-full h-full object-contain pointer-events-none">
                                </div>
                                <div class="absolute bottom-4 left-6 right-6 text-center z-10">
                                    <p class="text-[10px] font-black text-forest-900/40 uppercase tracking-[0.3em]"><?= e($identity['labels_official_mark'] ?? '') ?></p>
                                </div>
                            </div>
                            <div class="lg:col-span-7 space-y-8">
                                <div class="inline-flex items-center gap-3 px-4 py-1.5 bg-white border border-gray-100 shadow-sm text-forest-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <?= Icons::svg('hexagon', 'w-4 h-4 text-gold-500') ?> <?= e($identity['labels_construction'] ?? '') ?>
                                </div>
                                <div class="max-w-none text-gray-600 leading-relaxed text-sm lg:text-base space-y-6">
                                    <p><?= e($identity['description'] ?? '') ?></p>
                                    <p class="italic font-medium text-forest-900 bg-forest-50 p-6 rounded-2xl border-l-4 border-gold-400 shadow-sm">"<?= e($identity['closing'] ?? '') ?>"</p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-8">
                            <h4 class="font-display font-bold text-xl text-forest-900 px-2 border-l-4 border-gold-400"><?= e($identity['labels_philosophy'] ?? '') ?></h4>
                            <div class="grid md:grid-cols-2 gap-6">
                                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:-translate-y-1 transition-transform duration-300">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-gold-50 flex items-center justify-center border border-gold-100"><?= Icons::svg('zap', 'w-6 h-6 text-gold-600') ?></div>
                                        <h5 class="font-display font-bold text-lg text-forest-800"><?= e($identity['growth_title'] ?? '') ?></h5>
                                    </div>
                                    <p class="text-sm text-gray-500 leading-relaxed"><?= e($identity['growth_desc'] ?? '') ?></p>
                                </div>
                                <div class="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:-translate-y-1 transition-transform duration-300">
                                    <div class="flex items-center gap-4">
                                        <div class="w-12 h-12 rounded-2xl bg-forest-50 flex items-center justify-center border border-forest-100"><?= Icons::svg('target', 'w-6 h-6 text-forest-600') ?></div>
                                        <h5 class="font-display font-bold text-lg text-forest-800"><?= e($identity['approach_title'] ?? '') ?></h5>
                                    </div>
                                    <p class="text-sm text-gray-500 leading-relaxed"><?= e($identity['approach_desc'] ?? '') ?></p>
                                </div>
                            </div>
                        </div>
                        <div class="space-y-8 p-10 bg-gray-50 rounded-[3rem] border border-gray-100 shadow-inner">
                            <h4 class="font-display font-bold text-xl text-forest-900 text-center"><?= e($identity['labels_color_palette'] ?? '') ?></h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                    <div class="w-full sm:w-24 h-20 sm:h-24 rounded-xl bg-[#064E3B] shadow-lg flex-shrink-0"></div>
                                    <div class="flex-1 space-y-2 w-full">
                                        <p class="font-bold text-gray-800"><?= e($identity['colors_primary_name'] ?? '') ?></p>
                                        <p class="text-xs text-gray-500"><?= e($identity['colors_primary_desc'] ?? '') ?></p>
                                        <div class="flex gap-2 text-[10px] font-mono pt-1 text-forest-700"><span class="bg-forest-50 px-2 py-1 rounded">HEX: #064E3B</span></div>
                                    </div>
                                </div>
                                <div class="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-5">
                                    <div class="w-full sm:w-24 h-20 sm:h-24 rounded-xl bg-[#FBBF24] shadow-lg flex-shrink-0"></div>
                                    <div class="flex-1 space-y-2 w-full">
                                        <p class="font-bold text-gray-800"><?= e($identity['colors_accent_name'] ?? '') ?></p>
                                        <p class="text-xs text-gray-500"><?= e($identity['colors_accent_desc'] ?? '') ?></p>
                                        <div class="flex gap-2 text-[10px] font-mono pt-1 text-gold-700"><span class="bg-gold-50 px-2 py-1 rounded">HEX: #FBBF24</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- 3. VISI MISI -->
                <section class="space-y-8 lg:space-y-12 tab-panel hidden" data-panel="visimisi">
                    <?php View::partial('section-header', ['subtitle' => 'Visi & Misi', 'title' => 'Arah & Tujuan Strategis']); ?>
                    <div class="relative p-8 lg:p-12 bg-forest-800 rounded-[2.5rem] lg:rounded-[3rem] text-center overflow-hidden">
                        <h4 class="text-gold-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Visi Kami</h4>
                        <p class="text-xl md:text-3xl font-display text-white leading-relaxed italic">"<?= e($vision['text'] ?? '') ?>"</p>
                    </div>
                    <div class="grid md:grid-cols-2 gap-6 lg:gap-8">
                        <div class="card p-8 lg:p-10 border-none bg-gray-50 rounded-[2rem]">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700"><?= Icons::svg('target', 'w-5 h-5 lg:w-6 lg:h-6') ?></div>
                                <h4 class="font-display font-bold text-lg lg:text-xl text-forest-800">Misi Akademik</h4>
                            </div>
                            <ul class="space-y-4">
                                <?php foreach ($missions as $m): ?>
                                <li class="flex gap-4 text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    <span class="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 flex-shrink-0"></span> <?= e($m['description']) ?>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                        <div class="card p-8 lg:p-10 border-none bg-gray-50 rounded-[2rem]">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-10 h-10 lg:w-12 lg:h-12 bg-forest-100 rounded-full flex items-center justify-center text-forest-700"><?= Icons::svg('check-circle', 'w-5 h-5 lg:w-6 lg:h-6') ?></div>
                                <h4 class="font-display font-bold text-lg lg:text-xl text-forest-800">Tujuan Strategis</h4>
                            </div>
                            <ul class="space-y-4">
                                <?php foreach ($objectives as $o): ?>
                                <li class="flex gap-4 text-gray-600 text-xs lg:text-sm leading-relaxed">
                                    <span class="w-1.5 h-1.5 bg-forest-500 rounded-full mt-2 flex-shrink-0"></span> <?= e($o['description']) ?>
                                </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- 4. KEUNGGULAN -->
                <section class="space-y-10 tab-panel hidden" data-panel="keunggulan">
                    <?php View::partial('section-header', ['subtitle' => 'Keunggulan', 'title' => $adv['title'] ?? '']); ?>
                    <div class="grid sm:grid-cols-2 gap-6 lg:gap-8">
                        <?php foreach ($advantages as $i => $item): ?>
                        <div class="p-6 lg:p-8 bg-white border border-gray-100 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-forest-100 hover:-translate-y-1 transition-all group text-center lg:text-left">
                            <div class="w-12 h-12 lg:w-14 lg:h-14 bg-forest-50 rounded-2xl flex items-center justify-center text-forest-600 mb-6 mx-auto lg:mx-0 group-hover:bg-forest-600 group-hover:text-white transition-colors">
                                <?= Icons::svg($advIcons[$i % 4], 'w-6 h-6 lg:w-7 lg:h-7') ?>
                            </div>
                            <h4 class="font-display font-bold text-base lg:text-lg text-gray-800 mb-3"><?= e($item['title']) ?></h4>
                            <p class="text-xs lg:text-sm text-gray-500 leading-relaxed"><?= e($item['description']) ?></p>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </section>

                <!-- 5. CAPAIAN -->
                <section class="space-y-10 tab-panel hidden" data-panel="capaian">
                    <?php View::partial('section-header', ['subtitle' => $ach['subtitle'] ?? '', 'title' => $ach['title'] ?? '']); ?>
                    <div class="relative max-w-5xl mx-auto px-4 lg:px-0">
                        <div class="absolute left-4 lg:left-1/2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-gold-400 via-forest-100 to-transparent transform lg:-translate-x-1/2"></div>
                        <div class="space-y-6 lg:space-y-0 lg:-mt-16">
                            <?php foreach ($achievements as $i => $a): ?>
                            <div class="relative flex items-center justify-between w-full lg:mb-0 <?= $i % 2 === 0 ? 'lg:flex-row-reverse' : '' ?> <?= $i !== 0 ? 'lg:-mt-20' : 'lg:pt-20' ?>">
                                <div class="hidden lg:block w-[46%]"></div>
                                <div class="absolute left-0 lg:left-1/2 w-3.5 h-3.5 bg-white border-[3px] border-gold-400 rounded-full z-10 transform translate-x-2.5 lg:-translate-x-1/2 shadow-sm"></div>
                                <div class="w-full lg:w-[46%] pl-10 lg:pl-0 relative z-20 hover:-translate-y-1 transition-transform duration-300">
                                    <div class="group relative p-5 lg:p-6 bg-white border border-gray-100 rounded-2xl lg:rounded-[2rem] shadow-sm hover:shadow-xl hover:border-gold-200 transition-all duration-300">
                                        <div class="flex items-center gap-3 mb-2">
                                            <div class="flex flex-col items-center px-2.5 py-1 bg-forest-700 rounded-lg shadow-md"><span class="text-[10px] lg:text-xs font-black text-white"><?= e($a['label_year']) ?></span></div>
                                            <h4 class="font-display font-bold text-forest-800 text-xs lg:text-base leading-tight group-hover:text-forest-600 transition-colors"><?= e($a['title']) ?></h4>
                                        </div>
                                        <p class="text-[11px] lg:text-sm text-gray-500 leading-relaxed"><?= e($a['description']) ?></p>
                                    </div>
                                </div>
                            </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                    <div class="mt-24 p-6 bg-gray-50 rounded-3xl border border-gray-100 text-center relative z-30">
                        <p class="text-[10px] lg:text-xs font-bold text-forest-700 uppercase tracking-[0.2em]"><?= e($ach['footer'] ?? '') ?></p>
                    </div>
                </section>

                <!-- 6. FASILITAS -->
                <section class="space-y-10 tab-panel hidden" data-panel="fasilitas">
                    <?php View::partial('section-header', ['subtitle' => 'Fasilitas', 'title' => $fac['title'] ?? '']); ?>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 items-start">
                        <?php foreach ($facilities as $f): ?>
                        <div class="facility-card cursor-pointer overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] transition-all duration-500 bg-forest-900 hover:bg-forest-800" data-expand-card>
                            <div class="p-6 lg:p-8 flex flex-col items-center text-center gap-4">
                                <div class="facility-icon w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-colors bg-white/10 text-gold-400">
                                    <?= Icons::svg($f['icon_key'] ?? 'map-pin', 'w-6 h-6 lg:w-7 lg:h-7') ?>
                                </div>
                                <div>
                                    <p class="text-white font-bold text-base lg:text-lg mb-1"><?= e($f['title']) ?></p>
                                    <p class="facility-desc text-[10px] uppercase tracking-tighter text-white/50"><?= e($f['description']) ?></p>
                                </div>
                                <div class="expand-body hidden w-full mt-4">
                                    <?php if (!empty($f['image_path'])): ?>
                                    <div class="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl">
                                        <img src="<?= e($f['image_path']) ?>" alt="<?= e($f['title']) ?>" loading="lazy" class="w-full h-full object-cover">
                                        <div class="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent"></div>
                                    </div>
                                    <?php endif; ?>
                                    <p class="text-white/70 text-[10px] lg:text-sm mt-4 italic leading-relaxed"><?= e($fac['footer'] ?? '') ?></p>
                                </div>
                            </div>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </section>

            </main>
        </div>
    </div>
</div>
