<?php

require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';

const LOW_STOCK_THRESHOLD = 10;

function statusOf($quantity) {
    if ($quantity <= 0) return 'Out of Stock';
    if ($quantity < LOW_STOCK_THRESHOLD) return 'Low Stock';
    return 'In Stock';
}

$stmt = $pdo->query('SELECT id, name, category, quantity, price, supplier, expiry FROM products ORDER BY pk');
$products = $stmt->fetchAll();
foreach ($products as &$p) {
    $p['quantity'] = (int)$p['quantity'];
    $p['price'] = (float)$p['price'];
    $p['status'] = statusOf($p['quantity']);
}
echo json_encode(['products' => $products]);
