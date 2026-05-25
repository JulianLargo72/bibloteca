<?php

$router->get('/api/libros', [LibrosController::class, 'index']);
$router->get('/api/libros/{id}', [LibrosController::class, 'show']);
$router->post('/api/libros', [LibrosController::class, 'store']);
$router->put('/api/libros/{id}', [LibrosController::class, 'update']);
$router->delete('/api/libros/{id}', [LibrosController::class, 'destroy']);

$router->get('/api/personas', [PersonasController::class, 'index']);
$router->get('/api/personas/{id}', [PersonasController::class, 'show']);
$router->post('/api/personas', [PersonasController::class, 'store']);
$router->put('/api/personas/{id}', [PersonasController::class, 'update']);
$router->delete('/api/personas/{id}', [PersonasController::class, 'destroy']);

$router->get('/api/prestamos', [PrestamosController::class, 'index']);
$router->get('/api/prestamos/{id}', [PrestamosController::class, 'show']);
$router->post('/api/prestamos', [PrestamosController::class, 'store']);
$router->put('/api/prestamos/{id}', [PrestamosController::class, 'update']);
$router->delete('/api/prestamos/{id}', [PrestamosController::class, 'destroy']);
