<?php

require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';

$body = input();
$name = trim((string)($body['name'] ?? ''));

$stmt = $pdo->prepare('SELECT 1 FROM products WHERE category = ?');
$stmt->execute([$name]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['error' => 'Can\'t remove "' . $name . '" — it\'s still used by existing products.']);
    exit;
}

$stmt = $pdo->prepare('DELETE FROM categories WHERE name = ?');
$stmt->execute([$name]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['error' => 'Category not found.']);
    exit;
}
echo json_encode(['message' => 'Category removed.']);
