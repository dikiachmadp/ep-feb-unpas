<?php
/**
 * Copy this file to config.local.php and fill in real values.
 * config.local.php is gitignored and must NEVER be committed.
 *
 * On Hostinger: create config.local.php once via File Manager after first deploy.
 * If hPanel git deploy turns out to be a destructive checkout (wipes untracked
 * files), place config.local.php one directory ABOVE the deploy path instead —
 * bootstrap.php checks both locations.
 */
return [
    'app' => [
        // 'production' hides error detail from visitors; 'development' shows it
        'env'      => 'development',
        'base_url' => 'http://localhost:8000',
        'name'     => 'Ekonomi Pembangunan – FEB UNPAS',
    ],

    'db' => [
        // 'mysql' in production (Hostinger), 'sqlite' for local dev without a MySQL server
        'driver'  => 'sqlite',
        'sqlite_path' => __DIR__ . '/../../database/dev.sqlite',

        // MySQL settings (used when driver = mysql)
        'host'    => 'localhost',
        'name'    => '',
        'user'    => '',
        'pass'    => '',
        'charset' => 'utf8mb4',
    ],

    'uploads' => [
        'dir'            => __DIR__ . '/../../public/uploads',
        'url_prefix'     => '/uploads',
        'max_bytes'      => 4 * 1024 * 1024, // 4 MB per image
        'max_dimension'  => 2400,            // px, larger images are downscaled
    ],
];
