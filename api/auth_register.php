<?php
// api/auth_register.php  (POST)
// Creates a new staff account, pending admin approval.
require_once __DIR__ . '/../config/helpers.php';
require_once __DIR__ . '/../config/db.php';

$body = input();
$username        = trim((string)($body['username'] ?? ''));
$email           = trim((string)($body['email'] ?? ''));
$password        = (string)($body['password'] ?? '');
$confirmPassword = (string)($body['confirmPassword'] ?? '');

$errors = [];
$emailPattern = '/^[^\s@]+@[^\s@]+\.[^\s@]+$/';

if ($username === '') {
    $errors['username'] = 'Username is required.';
} else {
    $stmt = $pdo->prepare('SELECT 1 FROM users WHERE LOWER(username) = LOWER(?)');
    $stmt->execute([$username]);
    if ($stmt->fetch()) $errors['username'] = 'This username is already taken.';
}

if ($email === '') {
    $errors['email'] = 'Email is required.';
} elseif (!preg_match($emailPattern, $email)) {
    $errors['email'] = 'Enter a valid email address.';
} else {
    $stmt = $pdo->prepare('SELECT 1 FROM users WHERE LOWER(email) = LOWER(?)');
    $stmt->execute([$email]);
    if ($stmt->fetch()) $errors['email'] = 'An account with this email already exists.';
}

if ($password === '') {
    $errors['password'] = 'Password is required.';
} elseif (strlen($password) < 6) {
    $errors['password'] = 'Use at least 6 characters.';
}

if ($confirmPassword === '') {
    $errors['confirmPassword'] = 'Please confirm your password.';
} elseif ($password !== '' && $confirmPassword !== $password) {
    $errors['confirmPassword'] = 'Passwords do not match.';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['errors' => $errors]);
    exit;
}

$hash = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare('INSERT INTO users (username, email, password_hash, role, approved) VALUES (?, ?, ?, ?, ?)');
$stmt->execute([$username, $email, $hash, 'staff', 0]);

http_response_code(201);
echo json_encode(['message' => 'Account created. An administrator needs to approve it before you can sign in.']);
