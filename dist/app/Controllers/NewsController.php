<?php

namespace App\Controllers;

use App\Core\Router;
use App\Core\Seo;
use App\Core\View;
use App\Models\News;
use App\Models\Page;

class NewsController
{
    public function index(): void
    {
        $seoData = Page::seo('news_page', 'Berita & Kegiatan - FEB UNPAS');

        View::render('pages/berita-list', [
            'seo'        => Seo::page($seoData['title'], $seoData['description'], '/berita-kegiatan'),
            'fields'     => Page::fields('news_page'),
            'news'       => News::published(),
            'categories' => News::activeCategories(),
        ]);
    }

    public function show(string $slug): void
    {
        $news = News::bySlug($slug);
        if ($news === null) {
            (new Router())->notFound();
        }

        $seo = Seo::article($news);
        // Per-article SEO overrides set by staff in the admin win over defaults
        if (!empty($news['seo_title'])) {
            $seo->title = $news['seo_title'];
        }
        if (!empty($news['seo_description'])) {
            $seo->description = $news['seo_description'];
        }

        View::render('pages/berita-detail', [
            'seo'     => $seo,
            'news'    => $news,
            'gallery' => News::gallery((int) $news['id']),
            'related' => News::related($news),
        ]);
    }
}
