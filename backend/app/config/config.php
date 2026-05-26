<?php

return [
    'db' => [
        'host' => getenv('DB_HOST') ?: 'localhost',
        'name' => getenv('DB_NAME') ?: 'bibloteca',
        'user' => getenv('DB_USER') ?: 'root',
        'pass' => getenv('DB_PASS') ?: '',
        'charset' => 'utf8mb4',
    ],
    'app' => [
        'base_path' => '/bibloteca/backend/public',
        'cors_origin' => getenv('CORS_ORIGIN') ?: 'http://localhost:3000',
    ],
];
