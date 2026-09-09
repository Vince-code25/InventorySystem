<?php
// api/users_approve.php  (POST, admin only)  body: { "username": "..." }
require_once __DIR__ . '/../config/helpers.php';
requireAdmin();
require_once __DIR__ . '/../config/db.php';

$body = input();
$username = trim((string)($body['username'] ?? ''));

$stmt = $pdo->prepare('UPDATE users SET approved = 1 WHERE username = ?');
$stmt->execute([$username]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found.']);
    exit;
}
echo json_encode(['message' => 'User approved.']);
