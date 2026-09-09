<?php
// api/products_create.php  (POST, must be logged in)
require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/validate_product.php';

$body = input();
$result = validateProduct($pdo, $body, null);

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
        'INSERT INTO products (id, name, category, quantity, price, supplier, expiry) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    $stmt->execute([$data['id'], $data['name'], $data['category'], $data['quantity'], $data['price'], $data['supplier'], $data['expiry']]);
    $pdo->commit();
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['error' => 'Could not save the product.']);
    exit;
}

$message = $result['createdCategory']
    ? 'Product added and "' . $data['category'] . '" category created.'
    : 'Product added successfully.';

http_response_code(201);
echo json_encode(['message' => $message]);
