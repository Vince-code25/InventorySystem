<?php

require_once __DIR__ . '/../config/helpers.php';

$_SESSION = [];
session_destroy();
echo json_encode(['message' => 'Logged out.']);
