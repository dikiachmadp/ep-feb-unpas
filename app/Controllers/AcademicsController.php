<?php

namespace App\Controllers;

use App\Core\Router;
use App\Core\Seo;
use App\Core\View;
use App\Models\Curriculum;
use App\Models\Faculty;
use App\Models\GraduateProfile;
use App\Models\Page;

/**
 * /akademik/{tab} — since G3 every tab is its own URL with its own SEO
 * (bare /akademik 301s to /akademik/kurikulum in public/index.php).
 * Only the active tab's data is queried and only its panel is rendered.
 */
class AcademicsController
{
    /** tab-slug => [nav label, SEO title, SEO description] */
    private const TABS = [
        'kurikulum' => [
            'Kurikulum',
            'Kurikulum & Profil Lulusan - Ekonomi FEB UNPAS',
            'Struktur kurikulum per semester dan profil lulusan Program Studi Ekonomi FEB Universitas Pasundan.',
        ],
        'kerjasama' => [
            'Kerjasama',
            'Kerjasama & Kemitraan - Ekonomi FEB UNPAS',
            'Jejaring kerjasama internasional dan nasional Program Studi Ekonomi FEB Universitas Pasundan.',
        ],
        'akreditasi' => [
            'Akreditasi',
            'Akreditasi Unggul BAN-PT - Ekonomi FEB UNPAS',
            'Program Studi Ekonomi FEB Universitas Pasundan terakreditasi Unggul dari BAN-PT.',
        ],
        'dosen' => [
            'Dosen',
            'Dosen & Tenaga Pengajar - Ekonomi FEB UNPAS',
            'Profil dosen dan tenaga pengajar Program Studi Ekonomi FEB Universitas Pasundan.',
        ],
        'jurnal' => [
            'Jurnal',
            'Jurnal Ilmiah JRIE & BRAINY - Ekonomi FEB UNPAS',
            'Jurnal ilmiah peer-review yang diterbitkan Program Studi Ekonomi FEB Universitas Pasundan.',
        ],
        'portal' => [
            'Portal Akademik',
            'Portal Akademik & Dokumen Pedoman - Ekonomi FEB UNPAS',
            'Akses portal SITU 2 UNPAS dan unduhan dokumen pedoman akademik Program Studi Ekonomi.',
        ],
    ];

    private const JOURNALS = ['jrie', 'brainy'];

    public function index(string $tab): void
    {
        if (!isset(self::TABS[$tab])) {
            (new Router())->notFound();
        }
        [$label, $title, $description] = self::TABS[$tab];
        $fields = Page::fields('academics');

        // Staff can override the per-tab SEO once seo_{tab} fields are injected
        $title = $fields['seo_' . $tab]['title'] ?? $title;
        $description = $fields['seo_' . $tab]['description'] ?? $description;

        $seo = Seo::page($title, $description, '/akademik/' . $tab);
        $seo->jsonLd[] = Seo::breadcrumbs([
            'Beranda'  => '/',
            'Akademik' => '/akademik/kurikulum',
            $label     => null,
        ]);

        $data = [
            'seo'       => $seo,
            'fields'    => $fields,
            'activeTab' => $tab,
            'tabLabels' => array_combine(array_keys(self::TABS), array_column(self::TABS, 0)),
        ];

        switch ($tab) {
            case 'kurikulum':
                $data['curriculum'] = Curriculum::tree();
                $data['profiles'] = GraduateProfile::all();
                // Machine-readable course list so mata-kuliah searches
                // associate them with this site, not just the news pages.
                $seo->jsonLd[] = Seo::courseListSchema($data['curriculum']);
                break;
            case 'kerjasama':
                $data['partnersInternational'] = Page::items('academics', 'partners_international');
                $data['partnersNational'] = Page::items('academics', 'partners_national');
                break;
            case 'dosen':
                $data['dosen'] = Faculty::all();
                $seo->jsonLd[] = Seo::facultyListSchema($data['dosen']);
                break;
            case 'jurnal':
                $data['journals'] = $this->journalList($fields);
                break;
            case 'portal':
                $data['documents'] = Page::items('academics', 'documents');
                break;
        }

        View::render('pages/akademik', $data);
    }

    public function journal(string $slug): void
    {
        if (!in_array($slug, self::JOURNALS, true)) {
            (new Router())->notFound();
        }
        $j = Page::fields('academics')['jurnal_' . $slug] ?? [];
        if (empty($j['name'])) {
            (new Router())->notFound();
        }

        $seo = Seo::page(
            $j['name'] . ' - ' . ($j['full_name'] ?? '') . ' - FEB UNPAS',
            $j['description'] ?? '',
            '/jurnal/' . $slug
        );
        if (!empty($j['cover'])) {
            $seo->image = url($j['cover']);
        }
        $seo->jsonLd[] = [
            '@context'  => 'https://schema.org',
            '@type'     => 'Periodical',
            'name'      => $j['full_name'] ?? $j['name'],
            'alternateName' => $j['name'],
            'url'       => $j['url'] ?? '',
            'description' => $j['description'] ?? '',
            'publisher' => Seo::organizationSchema(),
        ];
        $seo->jsonLd[] = Seo::breadcrumbs([
            'Beranda'   => '/',
            'Akademik'  => '/akademik/kurikulum',
            'Jurnal'    => '/akademik/jurnal',
            $j['name']  => null,
        ]);

        View::render('pages/jurnal-detail', [
            'seo'     => $seo,
            'slug'    => $slug,
            'journal' => $j,
        ]);
    }

    /** Journal cards for the jurnal tab, built from page_fields jurnal_{slug}. */
    private function journalList(array $fields): array
    {
        $list = [];
        foreach (self::JOURNALS as $slug) {
            $j = $fields['jurnal_' . $slug] ?? [];
            if (!empty($j['name'])) {
                $list[$slug] = $j;
            }
        }
        return $list;
    }
}
