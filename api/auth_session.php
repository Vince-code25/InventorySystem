<?php
// api/auth_session.php  (GET)
// Lets the front-end check whether the browser already has a
// logged-in session (e.g. after a page refresh).
require_once __DIR__ . '/../config/helpers.php';

echo json_encode(['user' => $_SESSION['user'] ?? null]);
