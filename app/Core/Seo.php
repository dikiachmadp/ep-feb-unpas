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
