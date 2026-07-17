<?php
/**
 * @var string|null $subtitle
 * @var string $title
 * @var string|null $description
 * @var bool $center
 * @var bool $light
 */
$center = $center ?? false;
$light = $light ?? false;
?>
<div class="mb-12 <?= $center ? 'text-center' : '' ?>" data-reveal>
    <?php if (!empty($subtitle)): ?>
    <p class="section-subtitle mb-3 <?= $light ? 'text-gold-300' : 'text-gold-500' ?>"><?= e($subtitle) ?></p>
    <?php endif; ?>
    <h2 class="section-title <?= $light ? 'text-white' : 'text-forest-800' ?>"><?= e($title) ?></h2>
    <?php if (!empty($description)): ?>
    <p class="mt-4 text-base leading-relaxed max-w-2xl font-sans font-light <?= $center ? 'mx-auto' : '' ?> <?= $light ? 'text-forest-200' : 'text-gray-500' ?>">
        <?= e($description) ?>
    </p>
    <?php endif; ?>
    <div class="mt-5 flex <?= $center ? 'justify-center' : '' ?>">
        <div class="h-1 w-12 rounded-full bg-gradient-to-r from-gold-400 to-forest-500"></div>
        <div class="h-1 w-4 rounded-full bg-forest-200 ml-1.5"></div>
    </div>
</div>
