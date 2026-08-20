<?php
/**
 * Front controller for the public site. All non-file requests are rewritten
 * here by .htaccess. Routes mirror the old React SPA exactly so existing
 * backlinks and search results keep working.
 */

// Repo layout keeps app/ beside public/; the flat upload layout (built by
// scripts/build-dist.php, uploaded manually like the old dist/) puts app/
// beside this file instead. Support both.
foreach ([dirname(__DIR__) . '/app/bootstrap.php', __DIR__ . '/app/bootstrap.php'] as $bootstrap) {
    if (is_file($bootstrap)) {
        require $bootstrap;
        break;
    }
}

use App\Core\Router;
use App\Core\Session;

Session::start();

$router = new Router();

// Permanent redirects live here as PHP closures, NOT in .htaccess — hPanel's
// zip extractor silently drops .htaccess and build-dist.php writes its own.
$redirect301 = static function (string $to): void {
    header('Location: ' . url($to), true, 301);
    exit;
};

$router->get('/', fn() => (new App\Controllers\HomeController())->index());
$router->get('/profil', fn() => (new App\Controllers\ProfileController())->index());

// Each academics tab is its own URL with its own SEO; the bare /akademik
// keeps old backlinks working via a 301 to the first tab.
$router->get('/akademik', fn() => $redirect301('/akademik/kurikulum'));
// Tab "Kerjasama" dipindah jadi section mitra di beranda; URL lama 301 ke sana.
$router->get('/akademik/kerjasama', fn() => $redirect301('/#kerjasama'));
$router->get('/akademik/{tab}', fn(string $tab) => (new App\Controllers\AcademicsController())->index($tab));

$router->get('/mahasiswa', fn() => (new App\Controllers\FacultyController())->index());

// Per-dosen profile pages: unique title + Person schema per lecturer so
// Google can rank the site for lecturer-name searches.
$router->get('/dosen/{slug}', fn(string $slug) => (new App\Controllers\FacultyController())->show($slug));

// Per-journal detail pages (JRIE, BRAINY) with their own SEO
$router->get('/jurnal/{slug}', fn(string $slug) => (new App\Controllers\AcademicsController())->journal($slug));

// /pendaftaran merges the old contact page (brochures, contact info) with the
// registration CTA; /kontak permanently redirects to it.
$router->get('/pendaftaran', fn() => (new App\Controllers\RegistrationController())->index());
$router->get('/kontak', fn() => $redirect301('/pendaftaran'));

$router->get('/berita-kegiatan', fn() => (new App\Controllers\NewsController())->index());
$router->get('/berita-kegiatan/{slug}', fn(string $slug) => (new App\Controllers\NewsController())->show($slug));

// Dynamic sitemap: generated from the DB, always current when staff publish news
$router->get('/sitemap.xml', fn() => (new App\Controllers\SitemapController())->index());

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
