<?php

require_once __DIR__ . '/../config/helpers.php';
requireAdmin();
require_once __DIR__ . '/../config/db.php';

$body = input();
$username = trim((string)($body['username'] ?? ''));

$stmt = $pdo->prepare('SELECT role FROM users WHERE username = ?');
$stmt->execute([$username]);
$target = $stmt->fetch();

if (!$target) {
    http_response_code(404);
    echo json_encode(['error' => 'User not found.']);
    exit;
}
if ($target['role'] === 'admin') {
    http_response_code(400);
    echo json_encode(['error' => "Can't remove an administrator."]);
    exit;
}

$pdo->prepare('DELETE FROM users WHERE username = ?')->execute([$username]);
echo json_encode(['message' => 'User removed.']);
