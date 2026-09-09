<?php

require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/validate_product.php';

$body = input();
$id = trim((string)($body['id'] ?? ''));

if ($id === '') {
    http_response_code(400);
    echo json_encode(['error' => 'Product ID is required.']);
    exit;
}

$stmt = $pdo->prepare('SELECT 1 FROM products WHERE id = ?');
$stmt->execute([$id]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['error' => 'Product not found.']);
    exit;
}

$result = validateProduct($pdo, $body, $id);
if (!empty($result['errors'])) {
    http_response_code(400);
    echo json_encode(['errors' => $result['errors']]);
    exit;
}

$data = $result['data'];

try {
    $pdo->beginTransaction();
    if ($result['createdCategory']) {
        $pdo->prepare('INSERT INTO categories (name) VALUES (?)')->execute([$data['category']]);
    }
    $stmt = $pdo->prepare(
        'UPDATE products SET name = ?, category = ?, quantity = ?, price = ?, supplier = ?, expiry = ? WHERE id = ?'
    );
    $stmt->execute([$data['name'], $data['category'], $data['quantity'], $data['price'], $data['supplier'], $data['expiry'], $id]);
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Could not update the product.']);
    exit;
}

echo json_encode(['message' => 'Product updated successfully.']);
