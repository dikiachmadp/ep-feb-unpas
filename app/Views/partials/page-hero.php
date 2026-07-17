<?php
/**
 * Dark forest hero used on all secondary pages.
 * @var string $badge
 * @var string $title
 */
?>
<div class="relative bg-forest-900 py-16 lg:py-20 overflow-hidden">
    <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div data-reveal>
            <p class="text-gold-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-4"><?= e($badge) ?></p>
            <h1 class="font-display text-3xl md:text-5xl font-bold text-white tracking-tight"><?= e($title) ?></h1>
            <div class="h-1.5 w-24 bg-gold-400 mx-auto mt-6 rounded-full"></div>
        </div>
    </div>
</div>
