<?php

require_once __DIR__ . '/../config/helpers.php';

echo json_encode(['user' => $_SESSION['user'] ?? null]);
