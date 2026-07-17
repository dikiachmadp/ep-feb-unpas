<?php

use App\Core\Icons;
use App\Core\View;

/**
 * Student & Alumni page. Card content was hardcoded in the old React page
 * (not part of the CMS yet) — kept identical here.
 */
$menu = [
    ['id' => 'prestasi', 'label' => 'Prestasi', 'icon' => 'award'],
    ['id' => 'himpunan', 'label' => 'Himpunan', 'icon' => 'users'],
    ['id' => 'alumni',   'label' => 'Alumni',   'icon' => 'briefcase'],
];

$content = [
    'prestasi' => [
        'title' => 'Student Achievements',
        'items' => [
            ['tag' => 'National', 'title' => '1st Place National Economic Debate', 'date' => '2025', 'desc' => 'Successfully achieved the first position in a prestigious national-level competition at the University of Indonesia.', 'detail' => 'The class of 2022 students managed to outperform 50 other teams with a motion on post-pandemic fiscal policy.', 'icon' => 'award'],
            ['tag' => 'Research', 'title' => 'Kemdikbud PKM Research Grant', 'date' => '2024', 'desc' => 'Three student teams successfully passed national-level research funding.', 'detail' => 'Research focuses on empowering digital MSMEs in West Java with total grants reaching tens of millions of rupiah.', 'icon' => 'award'],
        ],
    ],
    'himpunan' => [
        'title' => 'Student Organizations',
        'items' => [
            ['tag' => 'Internal', 'title' => 'HIMASPA', 'date' => '2025/2026', 'desc' => 'Student internal organization focused on academic and social development.', 'detail' => 'Has 5 main departments: Human Resource Development, Talent & Interest, Public Relations, Strategic Studies, and Entrepreneurship.', 'icon' => 'users'],
            ['tag' => 'Community', 'title' => 'Economic Research Club', 'date' => 'Active', 'desc' => 'Interest community in scientific writing and economic data analysis.', 'detail' => 'Regularly holds training on E-Views, Stata, and SPSS software for final-year students.', 'icon' => 'users'],
        ],
    ],
    'alumni' => [
        'title' => 'Alumni Network',
        'items' => [
            ['tag' => 'Career', 'title' => 'Andini Putri, S.E.', 'date' => 'Analyst @ BI', 'desc' => 'Class of 2018 alumna who now has a career at Bank Indonesia central office.', 'detail' => 'She is actively providing career mentoring for final-year students through the IKA-EP program.', 'icon' => 'briefcase'],
            ['tag' => 'Startup', 'title' => 'Budi Santoso, S.E., M.E.', 'date' => 'Tech Founder', 'desc' => 'Successful entrepreneur who built a fintech platform for financial inclusion.', 'detail' => 'Class of 2015 graduate who successfully secured series-A funding and employs many graduates from his alma mater.', 'icon' => 'briefcase'],
        ],
    ],
];
?>
<div class="page-wrapper pt-20 bg-white min-h-screen pb-32 lg:pb-0">

    <?php View::partial('page-hero', ['badge' => 'Student Affairs', 'title' => 'Student & Alumni']); ?>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div class="flex flex-col lg:flex-row gap-12">

            <?php View::partial('tab-nav', ['menu' => $menu, 'active' => 'prestasi', 'menuTitle' => 'Navigation Menu', 'mobileCols' => 3]); ?>

            <main class="flex-1">
                <?php foreach ($content as $sectionId => $section): ?>
                <section class="min-h-[500px] space-y-10 tab-panel <?= $sectionId !== 'prestasi' ? 'hidden' : '' ?>" data-panel="<?= e($sectionId) ?>">
                    <?php View::partial('section-header', [
                        'subtitle' => strtoupper($sectionId),
                        'title'    => $section['title'],
                    ]); ?>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        <?php foreach ($section['items'] as $item): ?>
                        <div class="dosen-card relative cursor-pointer overflow-hidden shadow-xl flex flex-col items-center border border-white/5 bg-forest-900 rounded-[2.5rem] p-6 transition-all duration-500" data-expand-card>
                            <div class="dosen-photo bg-forest-800 flex items-center justify-center overflow-hidden flex-shrink-0 mb-6 w-full h-[140px] rounded-[32px] transition-all duration-500">
                                <span class="text-gold-400/30"><?= Icons::svg($item['icon'], 'w-16 h-16') ?></span>
                            </div>

                            <div class="text-center w-full px-2">
                                <p class="dosen-position uppercase font-black tracking-widest text-[10px] mb-1 text-gold-400 transition-colors duration-500">
                                    <?= e($item['tag']) ?> &bull; <?= e($item['date']) ?>
                                </p>
                                <h4 class="dosen-name font-bold leading-tight break-words transition-all duration-500 text-sm text-white"><?= e($item['title']) ?></h4>
                            </div>

                            <div class="expand-body hidden w-full overflow-hidden">
                                <div class="mt-6 pt-6 border-t border-gray-100 space-y-5">
                                    <p class="text-sm text-gray-500 leading-relaxed italic">"<?= e($item['desc']) ?>"</p>
                                    <div class="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                                        <span class="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-2">Background</span>
                                        <p class="text-sm text-forest-900 font-medium leading-relaxed whitespace-normal break-words"><?= e($item['detail']) ?></p>
                                    </div>
                                </div>
                            </div>
                            <div class="expand-close hidden absolute top-6 right-6 text-gray-300"><?= Icons::svg('x', 'w-5 h-5') ?></div>
                        </div>
                        <?php endforeach; ?>
                    </div>

                    <?php if ($sectionId === 'alumni'): ?>
                    <div class="mt-12 p-8 bg-forest-50 border border-forest-100 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-6">
                        <div class="bg-white p-4 rounded-2xl shadow-sm"><?= Icons::svg('briefcase', 'w-8 h-8 text-gold-500') ?></div>
                        <div class="flex-1 text-center md:text-left">
                            <h4 class="font-bold text-forest-900">Tracer Study & Career</h4>
                            <p class="text-sm text-gray-500 mt-1">Help us improve the quality of graduates by filling in your career data.</p>
                        </div>
                        <a href="https://tracerstudy.unpas.ac.id" target="_blank" rel="noopener noreferrer"
                           class="px-8 py-3 bg-gold-500 text-forest-900 font-bold rounded-xl text-sm shadow-lg shadow-gold-500/20 active:scale-95 transition-all">Fill Tracer Study</a>
                    </div>
                    <?php endif; ?>
                </section>
                <?php endforeach; ?>
            </main>
        </div>
    </div>
</div>
