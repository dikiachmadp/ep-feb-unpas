<?php
/**
 * Application bootstrap: autoloader, config, error mode, timezone.
 * Required by public/index.php (front controller) and admin/_bootstrap.php.
 * No Composer on purpose — nothing to install on the server.
 */

define('APP_ROOT', dirname(__DIR__));

date_default_timezone_set('Asia/Jakarta');

// PSR-4-ish autoloader: App\Core\Database -> app/Core/Database.php
spl_autoload_register(function (string $class): void {
    if (!str_starts_with($class, 'App\\')) {
        return;
    }
    $path = APP_ROOT . '/app/' . str_replace('\\', '/', substr($class, 4)) . '.php';
    if (is_file($path)) {
        require $path;
    }
});

// Config: config.local.php in app/Config/, or one directory above the repo
// (fallback for destructive git deploys — see config.example.php).
$configCandidates = [
    APP_ROOT . '/app/Config/config.local.php',
    dirname(APP_ROOT) . '/config.local.php',
];
$config = null;
foreach ($configCandidates as $candidate) {
    if (is_file($candidate)) {
        $config = require $candidate;
        break;
    }
}
if ($config === null) {
    http_response_code(500);
    exit('Missing config.local.php — copy app/Config/config.example.php and fill in credentials.');
}

define('APP_CONFIG', $config);
define('APP_ENV', $config['app']['env'] ?? 'production');
define('BASE_URL', rtrim($config['app']['base_url'] ?? '', '/'));

if (APP_ENV === 'development') {
    ini_set('display_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    error_reporting(E_ALL & ~E_DEPRECATED);
}

/** Escape for HTML output. Use on every dynamic value in views. */
function e(?string $value): string
{
    return htmlspecialchars($value ?? '', ENT_QUOTES, 'UTF-8');
}

/** Absolute URL from a site-relative path. */
function url(string $path = ''): string
{
    return BASE_URL . '/' . ltrim($path, '/');
}

/** "2026-06-30" -> "30 Juni 2026" (display format used across the old site). */
function tanggal_id(?string $isoDate): string
{
    if (!$isoDate) {
        return '';
    }
    static $bulan = [
        1 => 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
    ];
    $ts = strtotime($isoDate);
    if ($ts === false) {
        return $isoDate;
    }
    return date('j', $ts) . ' ' . $bulan[(int) date('n', $ts)] . ' ' . date('Y', $ts);
}

function config(string $key, $default = null)
{
    $parts = explode('.', $key);
    $value = APP_CONFIG;
    foreach ($parts as $part) {
        if (!is_array($value) || !array_key_exists($part, $value)) {
            return $default;
        }
        $value = $value[$part];
    }
    return $value;
}
