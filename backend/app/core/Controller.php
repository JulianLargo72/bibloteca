<?php

class Controller
{
    private static $config = null;

    protected function json($data, $status = 200)
    {
        http_response_code($status);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    protected function input()
    {
        $raw = file_get_contents('php://input');
        $decoded = json_decode($raw, true);

        return is_array($decoded) ? $decoded : [];
    }

    protected function db()
    {
        if (self::$config === null) {
            self::$config = require __DIR__ . '/../config/config.php';
        }

        return Database::getInstance(self::$config['db'])->getConnection();
    }
}
