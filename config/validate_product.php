<?php
// config/validate_product.php
// Server-side validation for creating/editing a product — the same
// rules enforced in the browser, re-checked here independently so
// they can't be bypassed by calling the API directly.
//
// $currentId: when editing, the product's existing id (excluded from
// its own uniqueness check). Pass null when creating a new product.
function validateProduct(PDO $pdo, array $body, ?string $currentId) {
    $errors = [];

    $id          = trim((string)($body['id'] ?? ''));
    $name        = trim((string)($body['name'] ?? ''));
    $category    = trim((string)($body['category'] ?? ''));
    $newCategory = trim((string)($body['newCategory'] ?? ''));
    $supplier    = trim((string)($body['supplier'] ?? ''));
    $quantityRaw = trim((string)($body['quantity'] ?? ''));
    $priceRaw    = trim((string)($body['price'] ?? ''));
    $expiry      = !empty($body['expiry']) ? (string)$body['expiry'] : null;

    if ($id === '') {
        $errors['id'] = 'Product ID is required.';
    } else {
        $stmt = $pdo->prepare('SELECT 1 FROM products WHERE LOWER(id) = LOWER(?) AND id != ?');
        $stmt->execute([$id, $currentId ?? '']);
        if ($stmt->fetch()) {
            $errors['id'] = 'This Product ID is already in use.';
        }
    }

    if ($name === '') {
        $errors['name'] = 'Product name is required.';
    }

    $createdCategory = false;
    if ($category === '__new__') {
        if ($newCategory === '') {
            $errors['newCategory'] = 'Enter a name for the new category.';
        } else {
            $stmt = $pdo->prepare('SELECT 1 FROM categories WHERE LOWER(name) = LOWER(?)');
            $stmt->execute([$newCategory]);
            if ($stmt->fetch()) {
                $errors['newCategory'] = 'This category already exists — select it from the list instead.';
            } else {
                $category = $newCategory;
                $createdCategory = true;
            }
        }
    } elseif ($category === '') {
        $errors['category'] = 'Please select a category.';
    } else {
        $stmt = $pdo->prepare('SELECT 1 FROM categories WHERE name = ?');
        $stmt->execute([$category]);
        if (!$stmt->fetch()) {
            $errors['category'] = 'Unknown category.';
        }
    }

    if ($supplier === '') {
        $errors['supplier'] = 'Supplier is required.';
    }

    $quantity = null;
    if ($quantityRaw === '') {
        $errors['quantity'] = 'Quantity is required.';
    } elseif (!preg_match('/^\d+$/', $quantityRaw)) {
        $errors['quantity'] = 'Enter a whole number, 0 or greater.';
    } else {
        $quantity = (int)$quantityRaw;
    }

    $price = null;
    if ($priceRaw === '') {
        $errors['price'] = 'Price is required.';
    } elseif (!is_numeric($priceRaw) || (float)$priceRaw <= 0) {
        $errors['price'] = 'Enter a valid price greater than 0.';
    } else {
        $price = (float)$priceRaw;
    }

    return [
        'errors' => $errors,
        'data' => [
            'id' => $id,
            'name' => $name,
            'category' => $category,
            'supplier' => $supplier,
            'quantity' => $quantity,
            'price' => $price,
            'expiry' => $expiry,
        ],
        'createdCategory' => $createdCategory,
    ];
}
