<?php
require dirname(__DIR__) . '/_bootstrap.php';
require dirname(__DIR__) . '/_layout.php';

use App\Core\Csrf;
use App\Core\Database;
use App\Core\LocalFilesystemStorage;
use App\Core\Session;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Metode tidak diizinkan.');
}
Csrf::require();

$id = (int) ($_POST['id'] ?? 0);
$news = Database::fetch('SELECT * FROM news WHERE id = ?', [$id]);
if ($news) {
    $storage = new LocalFilesystemStorage();
    foreach (Database::fetchAll('SELECT * FROM news_gallery WHERE news_id = ?', [$id]) as $g) {
        $storage->delete($g['image_path']);
    }
    Database::run('DELETE FROM news_gallery WHERE news_id = ?', [$id]);
    Database::run('DELETE FROM news WHERE id = ?', [$id]);
    $storage->delete($news['cover_image_path']);
    Session::flash('ok', 'Berita dihapus.');
}
header('Location: ' . adminUrl('news/list.php'));
exit;
