<?php
// config/helpers.php
// Shared helpers used by every file in /api: starts the session,
// sets the JSON response header, reads the JSON request body, and
// provides the login/admin gatekeeping used across the API.
//
// This is what makes access rules real on the server, not just in
// the browser — even a request sent directly to the API (bypassing
// the front-end entirely) has to pass these same checks.

session_start();
header('Content-Type: application/json');

// Reads a JSON request body (e.g. { "username": "admin" }) into an
// associative array. Returns an empty array if there's no body or
// it isn't valid JSON.
function input() {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : [];
}

function requireLogin() {
    if (!isset($_SESSION['user'])) {
        http_response_code(401);
        echo json_encode(['error' => 'You must be logged in to do that.']);
        exit;
    }
}

function requireAdmin() {
    requireLogin();
    if ($_SESSION['user']['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(['error' => 'Only an administrator can do that.']);
        exit;
    }
}
