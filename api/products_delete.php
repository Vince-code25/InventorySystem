<?php

require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';

$body = input();
$id = trim((string)($body['id'] ?? ''));

$stmt = $pdo->prepare('DELETE FROM products WHERE id = ?');
$stmt->execute([$id]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Product not found.']);
    exit;
}
echo json_encode(['message' => 'Product deleted.']);
