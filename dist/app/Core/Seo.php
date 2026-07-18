<?php

namespace App\Core;

/**
 * Per-page SEO data. Every public controller builds one of these from the
 * page's actual content (news title/excerpt/cover, page_fields copy) so each
 * URL ships unique title/description/canonical/OG/JSON-LD in the first
 * HTML response — no JS execution required by crawlers.
 */
class Seo
{
    public string $title;
    public string $description;
    public string $canonical;
    public string $image;
    public string $type = 'website';
    public string $robots = 'index, follow';
    /** @var array<int, array> JSON-LD blocks to embed */
    public array $jsonLd = [];

    private function __construct(string $title, string $description)
    {
        $this->title = $title;
        $this->description = $description;
        $this->canonical = self::currentUrl();
        $this->image = url('/logo.webp');
    }

    /** Generic page (title/description usually sourced from page_fields). */
    public static function page(string $title, string $description, ?string $canonicalPath = null, ?string $robots = null): self
    {
        $seo = new self($title, $description);
        if ($canonicalPath !== null) {
            $seo->canonical = url($canonicalPath);
        }
        if ($robots !== null) {
            $seo->robots = $robots;
        }
        $seo->jsonLd[] = self::organizationSchema();
        return $seo;
    }

    /** News detail page: everything derived from the article row. */
    public static function article(array $news): self
    {
        $seo = new self(
            $news['title'] . ' – Ekonomi Pembangunan FEB UNPAS',
            $news['excerpt']
        );
        $seo->canonical = url('/berita-kegiatan/' . $news['slug']);
        $seo->type = 'article';
        if (!empty($news['cover_image_path'])) {
            $seo->image = url($news['cover_image_path']);
        }
        $seo->jsonLd[] = self::organizationSchema();
        $seo->jsonLd[] = [
            '@context'      => 'https://schema.org',
            '@type'         => 'NewsArticle',
            'headline'      => $news['title'],
            'description'   => $news['excerpt'],
            'image'         => [$seo->image],
            'datePublished' => $news['published_date'],
            'dateModified'  => $news['updated_at'] ?? $news['published_date'],
            'mainEntityOfPage' => $seo->canonical,
            'author'        => [
                '@type' => 'Organization',
                'name'  => 'Program Studi Ekonomi Pembangunan FEB UNPAS',
                'url'   => BASE_URL,
            ],
            'publisher'     => [
                '@type' => 'Organization',
                'name'  => 'Program Studi Ekonomi Pembangunan FEB UNPAS',
                'logo'  => ['@type' => 'ImageObject', 'url' => url('/logo.webp')],
            ],
        ];
        return $seo;
    }

    /** Dosen profile page: Person schema so name searches understand who this is. */
    public static function person(array $d): self
    {
        $seo = new self(
            $d['full_name'] . ' – Dosen Ekonomi Pembangunan FEB UNPAS',
            'Profil ' . $d['full_name'] . ', ' . $d['position']
            . ' Program Studi Ekonomi Pembangunan FEB Universitas Pasundan.'
            . ' Bidang keahlian: ' . $d['expertise'] . '.'
        );
        $seo->canonical = url('/dosen/' . $d['slug']);
        $seo->type = 'profile';
        if (!empty($d['photo_path'])) {
            $seo->image = url($d['photo_path']);
        }

        $person = [
            '@type'      => 'Person',
            'name'       => $d['full_name'],
            'jobTitle'   => $d['position'],
            'knowsAbout' => $d['expertise'],
            'url'        => $seo->canonical,
            'image'      => $seo->image,
            'worksFor'   => [
                '@type' => 'EducationalOrganization',
                'name'  => 'Program Studi Ekonomi Pembangunan – Fakultas Ekonomi dan Bisnis Universitas Pasundan',
                'url'   => BASE_URL,
            ],
        ];
        if (!empty($d['email'])) {
            $person['email'] = 'mailto:' . $d['email'];
        }
        if (!empty($d['scholar_url'])) {
            $person['sameAs'] = [$d['scholar_url']];
        }

        $seo->jsonLd[] = self::organizationSchema();
        $seo->jsonLd[] = [
            '@context'   => 'https://schema.org',
            '@type'      => 'ProfilePage',
            'mainEntity' => $person,
        ];
        $seo->jsonLd[] = [
            '@context'        => 'https://schema.org',
            '@type'           => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Beranda', 'item' => url('/')],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Akademik', 'item' => url('/akademik')],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $d['full_name'], 'item' => $seo->canonical],
            ],
        ];
        return $seo;
    }

    /** ItemList of the dosen roster, embedded on /akademik. */
    public static function facultyListSchema(array $dosen): array
    {
        return [
            '@context'        => 'https://schema.org',
            '@type'           => 'ItemList',
            'name'            => 'Dosen Program Studi Ekonomi Pembangunan FEB UNPAS',
            'itemListElement' => array_map(fn(array $d, int $i) => [
                '@type'    => 'ListItem',
                'position' => $i + 1,
                'item'     => [
                    '@type'    => 'Person',
                    'name'     => $d['full_name'],
                    'jobTitle' => $d['position'],
                    'url'      => url('/dosen/' . $d['slug']),
                ],
            ], $dosen, array_keys($dosen)),
        ];
    }

    /** ItemList of Course entries from the curriculum tree, embedded on /akademik. */
    public static function courseListSchema(array $curriculumTree): array
    {
        $items = [];
        foreach ($curriculumTree as $year) {
            foreach ($year['semesters'] as $sem) {
                foreach ($sem['courses'] as $display) {
                    // Display strings are "CODE - Name" or just "Name"
                    $parts = explode(' - ', $display, 2);
                    $course = ['@type' => 'Course', 'name' => $parts[1] ?? $parts[0]];
                    if (isset($parts[1])) {
                        $course['courseCode'] = $parts[0];
                    }
                    $course['provider'] = [
                        '@type' => 'EducationalOrganization',
                        'name'  => 'Program Studi Ekonomi Pembangunan FEB Universitas Pasundan',
                        'url'   => BASE_URL,
                    ];
                    $items[] = [
                        '@type'    => 'ListItem',
                        'position' => count($items) + 1,
                        'item'     => $course,
                    ];
                }
            }
        }
        return [
            '@context'        => 'https://schema.org',
            '@type'           => 'ItemList',
            'name'            => 'Kurikulum & Mata Kuliah Ekonomi Pembangunan FEB UNPAS',
            'itemListElement' => $items,
        ];
    }

    public static function organizationSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type'    => 'EducationalOrganization',
            'name'     => 'Program Studi Ekonomi Pembangunan – Fakultas Ekonomi dan Bisnis Universitas Pasundan',
            'url'      => BASE_URL,
            'logo'     => url('/logo.webp'),
            'address'  => [
                '@type'           => 'PostalAddress',
                'addressLocality' => 'Bandung',
                'addressRegion'   => 'Jawa Barat',
                'addressCountry'  => 'ID',
            ],
        ];
    }

    private static function currentUrl(): string
    {
        $path = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH) ?? '/';
        return url($path);
    }
}
