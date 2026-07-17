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

$router->get('/', fn() => (new App\Controllers\HomeController())->index());
$router->get('/profil', fn() => (new App\Controllers\ProfileController())->index());
$router->get('/akademik', fn() => (new App\Controllers\AcademicsController())->index());
$router->get('/mahasiswa', fn() => (new App\Controllers\FacultyController())->index());

// /pendaftaran is now a lightweight CTA page linking to Unpas' official
// registration site (URL editable via admin), not a form.
$router->get('/pendaftaran', fn() => (new App\Controllers\RegistrationController())->index());

// Info-only contact page (address/phone/email/hours) — no form by design
$router->get('/kontak', fn() => (new App\Controllers\ContactController())->index());

$router->get('/berita-kegiatan', fn() => (new App\Controllers\NewsController())->index());
$router->get('/berita-kegiatan/{slug}', fn(string $slug) => (new App\Controllers\NewsController())->show($slug));

// Dynamic sitemap: generated from the DB, always current when staff publish news
$router->get('/sitemap.xml', fn() => (new App\Controllers\SitemapController())->index());

$router->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);
