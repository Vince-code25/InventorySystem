<?php

require_once __DIR__ . '/../config/helpers.php';
requireLogin();
require_once __DIR__ . '/../config/db.php';

$stmt = $pdo->query(
    'SELECT c.name, COUNT(p.id) AS productCount
     FROM categories c
     LEFT JOIN products p ON p.category = c.name
     GROUP BY c.name
     ORDER BY c.name'
);
$categories = $stmt->fetchAll();
foreach ($categories as &$c) {
    $c['productCount'] = (int)$c['productCount'];
}
echo json_encode(['categories' => $categories]);
