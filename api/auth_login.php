<?php

require_once __DIR__ . '/../config/helpers.php';
require_once __DIR__ . '/../config/db.php';

$body = input();
$identifier = trim((string)($body['username'] ?? ''));
$password   = (string)($body['password'] ?? '');

$errors = [];
if ($identifier === '') $errors['username'] = 'This field is required.';
if ($password === '') $errors['password'] = 'This field is required.';
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

$stmt = $pdo->prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?) OR LOWER(email) = LOWER(?)');
$stmt->execute([$identifier, $identifier]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Incorrect username or password. Please try again.']);
    exit;
}

if (!$user['approved']) {
    http_response_code(403);
    echo json_encode(['error' => 'Your account is pending admin approval. Please check back later.']);
    exit;
}

$_SESSION['user'] = [
    'username' => $user['username'],
    'email'    => $user['email'],
    'role'     => $user['role'],
];

echo json_encode(['user' => $_SESSION['user']]);
