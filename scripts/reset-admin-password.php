<?php
/**
 * Reset an admin user's password without re-seeding the database.
 *
 * Run from the repo root (password comes from an env var so it never appears
 * in shell history files shared in chat):
 *
 *   ADMIN_PASSWORD='newpass' php scripts/reset-admin-password.php
 *   ADMIN_PASSWORD='newpass' ADMIN_EMAIL='user@example.com' php scripts/reset-admin-password.php
 *
 * Updates the database config.local.php points at (dev SQLite locally). For
 * staging/live (no SSH on Hostinger) it also prints an UPDATE statement with
 * the fresh hash to paste into phpMyAdmin.
 */

if (PHP_SAPI !== 'cli') {
    exit("Jalankan dari CLI: php scripts/reset-admin-password.php\n");
}

require dirname(__DIR__) . '/app/bootstrap.php';

use App\Core\Database;

$password = getenv('ADMIN_PASSWORD') ?: '';
if ($password === '') {
    fwrite(STDERR, "ADMIN_PASSWORD belum di-set.\nContoh: ADMIN_PASSWORD='passwordbaru' php scripts/reset-admin-password.php\n");
    exit(1);
}
if (strlen($password) < 8) {
    fwrite(STDERR, "Password minimal 8 karakter.\n");
    exit(1);
}

$email = strtolower(trim(getenv('ADMIN_EMAIL') ?: ''));
if ($email === '') {
    $users = Database::fetchAll('SELECT id, email FROM admin_users ORDER BY id');
    if (count($users) !== 1) {
        fwrite(STDERR, "Ada lebih dari satu akun admin — pilih dengan ADMIN_EMAIL:\n");
        foreach ($users as $u) {
            fwrite(STDERR, "  - {$u['email']}\n");
        }
        exit(1);
    }
    $email = $users[0]['email'];
}

$user = Database::fetch('SELECT id, email FROM admin_users WHERE email = ?', [$email]);
if ($user === null) {
    fwrite(STDERR, "Tidak ada akun admin dengan email {$email}.\n");
    exit(1);
}

$hash = password_hash($password, PASSWORD_DEFAULT);
Database::update('admin_users', (int) $user['id'], [
    'password_hash' => $hash,
    'is_active'     => 1,
]);

echo "Password untuk {$user['email']} berhasil di-reset di database lokal.\n\n";
echo "Untuk staging/live, jalankan SQL berikut via phpMyAdmin:\n";
echo "UPDATE admin_users SET password_hash = '" . $hash . "', is_active = 1 WHERE email = '" . $user['email'] . "';\n";
