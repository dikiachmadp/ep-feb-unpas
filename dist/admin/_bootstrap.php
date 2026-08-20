<?php
/**
 * Shared bootstrap for every admin page. Include at the top of each script:
 *   require __DIR__ . '/_bootstrap.php';        (pages requiring login)
 * Login page sets $ADMIN_PUBLIC = true before including to skip the gate.
 */

require dirname(__DIR__) . '/app/bootstrap.php';

use App\Core\Auth;
use App\Core\Session;

Session::start();

if (empty($ADMIN_PUBLIC)) {
    Auth::requireLogin();
}
