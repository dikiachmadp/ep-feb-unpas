<?php
/**
 * PRODUKSI (Hostinger) — salin file ini menjadi config.local.php di folder
 * yang sama (app/Config/) lewat File Manager, lalu isi kredensial database.
 * config.local.php tidak boleh dibagikan ke siapa pun.
 */
return [
    'app' => [
        'env'      => 'production',
        // Ganti dengan URL situs, tanpa garis miring di akhir
        'base_url' => 'https://ekonomi.feb.unpas.ac.id',
        'name'     => 'Ekonomi Pembangunan – FEB UNPAS',
    ],

    'db' => [
        'driver'  => 'mysql',
        // Dari hPanel > Databases: nama DB, user, dan password yang dibuat
        'host'    => 'localhost',
        'name'    => '',
        'user'    => '',
        'pass'    => '',
        'charset' => 'utf8mb4',
    ],

    'uploads' => [
        // Layout flat: folder uploads/ ada di document root, sejajar app/
        'dir'            => dirname(__DIR__, 2) . '/uploads',
        'url_prefix'     => '/uploads',
        'max_bytes'      => 4 * 1024 * 1024,
        'max_dimension'  => 2400,
    ],
];