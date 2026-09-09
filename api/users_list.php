<?php

require_once __DIR__ . '/../config/helpers.php';
requireAdmin();
require_once __DIR__ . '/../config/db.php';

$stmt = $pdo->query('SELECT username, email, role, approved FROM users ORDER BY username');
$users = $stmt->fetchAll();
foreach ($users as &$u) {
    $u['approved'] = (int)$u['approved'];
}
echo json_encode(['users' => $users]);
