<?php
require __DIR__ . '/_bootstrap.php';

App\Core\Auth::logout();
header('Location: ' . url('/admin/login.php'));
exit;
