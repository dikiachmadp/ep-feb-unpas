<?php

namespace App\Controllers;

use App\Models\Faculty;
use App\Models\News;

/**
 * Dynamic sitemap generated from the DB, so it is always current the moment
 * staff publish news — no rebuild/upload needed (replaces the static file).
 */
class SitemapController
{
    private const STATIC_ROUTES = [
        '/'                    => ['priority' => '1.0', 'changefreq' => 'weekly'],
        '/profil'              => ['priority' => '0.8', 'changefreq' => 'monthly'],
        '/akademik/kurikulum'  => ['priority' => '0.8', 'changefreq' => 'monthly'],
        '/akademik/akreditasi' => ['priority' => '0.6', 'changefreq' => 'yearly'],
        '/akademik/dosen'      => ['priority' => '0.8', 'changefreq' => 'monthly'],
        '/akademik/jurnal'     => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/akademik/portal'     => ['priority' => '0.5', 'changefreq' => 'monthly'],
        '/jurnal/jrie'         => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/jurnal/brainy'       => ['priority' => '0.6', 'changefreq' => 'monthly'],
        '/mahasiswa'           => ['priority' => '0.7', 'changefreq' => 'monthly'],
        '/pendaftaran'         => ['priority' => '0.9', 'changefreq' => 'monthly'],
        '/berita-kegiatan'     => ['priority' => '0.9', 'changefreq' => 'daily'],
    ];

    public function index(): void
    {
        header('Content-Type: application/xml; charset=UTF-8');

        $urls = [];
        foreach (self::STATIC_ROUTES as $path => $meta) {
            $urls[] = ['loc' => url($path)] + $meta;
        }
        foreach (Faculty::all() as $d) {
            $urls[] = [
                'loc'        => url('/dosen/' . $d['slug']),
                'priority'   => '0.6',
                'changefreq' => 'monthly',
            ];
        }
        foreach (News::published() as $item) {
            $urls[] = [
                'loc'        => url('/berita-kegiatan/' . $item['slug']),
                'lastmod'    => substr($item['updated_at'] ?? $item['published_date'], 0, 10),
                'priority'   => '0.7',
                'changefreq' => 'monthly',
            ];
        }

        echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $u) {
            echo "  <url>\n    <loc>" . e($u['loc']) . "</loc>\n";
            if (isset($u['lastmod'])) {
                echo '    <lastmod>' . e($u['lastmod']) . "</lastmod>\n";
            }
            echo '    <changefreq>' . $u['changefreq'] . "</changefreq>\n";
            echo '    <priority>' . $u['priority'] . "</priority>\n  </url>\n";
        }
        echo '</urlset>';
    }
}
