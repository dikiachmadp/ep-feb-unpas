<?php

namespace App\Controllers;

use App\Core\Router;
use App\Core\Seo;
use App\Core\View;
use App\Models\News;
use App\Models\Page;
use Throwable;

class NewsController
{
    private const PER_PAGE = 9;

    public function index(): void
    {
        $categories = News::activeCategories();

        // ?kategori harus salah satu kategori nyata; nilai asing dianggap 404
        // supaya URL sampah tidak menghasilkan halaman kosong ber-canonical.
        $category = trim((string) ($_GET['kategori'] ?? ''));
        if ($category !== '' && !in_array($category, $categories, true)) {
            (new Router())->notFound();
        }
        $category = $category !== '' ? $category : null;

        $page = max(1, (int) ($_GET['page'] ?? 1));
        $total = News::countPublished($category);
        $totalPages = max(1, (int) ceil($total / self::PER_PAGE));
        if ($page > $totalPages) {
            (new Router())->notFound();
        }

        $canonical = '/berita-kegiatan';
        $query = [];
        if ($category !== null) {
            $query['kategori'] = $category;
        }
        if ($page > 1) {
            $query['page'] = $page;
        }
        if ($query) {
            $canonical .= '?' . http_build_query($query);
        }

        $seoData = Page::seo('news_page', 'Berita & Kegiatan - FEB UNPAS');
        $title = $seoData['title'];
        if ($category !== null) {
            $title = $category . ' - ' . $title;
        }
        if ($page > 1) {
            $title .= ' - Halaman ' . $page;
        }

        View::render('pages/berita-list', [
            'seo'        => Seo::page($title, $seoData['description'], $canonical),
            'fields'     => Page::fields('news_page'),
            'news'       => News::publishedPaged($page, self::PER_PAGE, $category),
            'categories' => $categories,
            'activeCategory' => $category,
            'page'       => $page,
            'totalPages' => $totalPages,
        ]);
    }

    public function show(string $slug): void
    {
        $news = News::bySlug($slug);
        if ($news === null) {
            (new Router())->notFound();
        }

        // Penghitung tayangan sederhana (tanpa dedup); artikel tetap tampil
        // meski UPDATE gagal (mis. DB lock di SQLite dev).
        try {
            News::incrementViews((int) $news['id']);
            $news['view_count'] = (int) ($news['view_count'] ?? 0) + 1;
        } catch (Throwable) {
            // dibiarkan: angka tayangan bukan alasan artikel jadi 500
        }

        $seo = Seo::article($news);
        // Per-article SEO overrides set by staff in the admin win over defaults
        if (!empty($news['seo_title'])) {
            $seo->title = $news['seo_title'];
        }
        if (!empty($news['seo_description'])) {
            $seo->description = $news['seo_description'];
        }
        $seo->jsonLd[] = Seo::breadcrumbs([
            'Beranda'           => '/',
            'Berita & Kegiatan' => '/berita-kegiatan',
            $news['title']      => null,
        ]);

        View::render('pages/berita-detail', [
            'seo'      => $seo,
            'news'     => $news,
            'gallery'  => News::gallery((int) $news['id']),
            'related'  => News::related($news),
            'adjacent' => News::prevNext($news),
        ]);
    }
}
