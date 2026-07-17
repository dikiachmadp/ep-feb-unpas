<?php
$ADMIN_PUBLIC = true;
require __DIR__ . '/_bootstrap.php';

use App\Core\Auth;
use App\Core\Csrf;

if (Auth::check()) {
    header('Location: ' . url('/admin/index.php'));
    exit;
}

$error = null;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    Csrf::require();
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    if (Auth::attempt($email, $password)) {
        header('Location: ' . url('/admin/index.php'));
        exit;
    }
    // Same message for wrong password / unknown user / lockout: no user enumeration
    $error = 'Email atau password salah, atau akun terkunci sementara karena terlalu banyak percobaan.';
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>Masuk – Admin FEB UNPAS</title>
<link rel="stylesheet" href="<?= url('/admin/assets/admin.css') ?>">
</head>
<body>
<div class="login-wrap">
  <form class="login-card" method="post" action="">
    <h1>Admin CMS</h1>
    <p class="sub">Ekonomi Pembangunan – FEB UNPAS</p>
    <?php if ($error): ?><div class="flash err"><?= e($error) ?></div><?php endif; ?>
    <?= Csrf::field() ?>
    <div class="form-grid">
      <label class="field">Email
        <input type="email" name="email" required autofocus autocomplete="username">
      </label>
      <label class="field">Password
        <input type="password" name="password" required autocomplete="current-password">
      </label>
      <button class="btn" type="submit">Masuk</button>
    </div>
  </form>
</div>
</body>
</html>
