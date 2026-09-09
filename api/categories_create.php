<?php
// api/categories_create.php  (POST, must be logged in)  body: { "name": "..." }
require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';

$body = input();
$name = trim((string)($body['name'] ?? ''));

if ($name === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Category name is required.']);
    exit;
}

$stmt = $pdo->prepare('SELECT 1 FROM categories WHERE LOWER(name) = LOWER(?)');
$stmt->execute([$name]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['error' => 'This category already exists.']);
    exit;
}

$pdo->prepare('INSERT INTO categories (name) VALUES (?)')->execute([$name]);
http_response_code(201);
echo json_encode(['message' => 'Category added.']);
