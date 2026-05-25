<?php

class LibrosController extends Controller
{
    private function model()
    {
        return new Libro($this->db());
    }

    public function index()
    {
        $libros = $this->model()->all();
        $this->json($libros);
    }

    public function show($id)
    {
        $libro = $this->model()->find($id);
        if (!$libro) {
            $this->json(['message' => 'Libro no encontrado'], 404);
        }

        $this->json($libro);
    }

    public function store()
    {
        $data = $this->input();
        $required = ['titulo', 'autor', 'isbn', 'stock'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $data['stock'] = (int) $data['stock'];
        $libro = $this->model()->create($data);
        $this->json($libro, 201);
    }

    public function update($id)
    {
        $data = $this->input();
        $required = ['titulo', 'autor', 'isbn', 'stock'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $data['stock'] = (int) $data['stock'];
        $libro = $this->model()->updateById($id, $data);
        $this->json($libro);
    }

    public function destroy($id)
    {
        $deleted = $this->model()->delete($id);
        if (!$deleted) {
            $this->json(['message' => 'No se pudo eliminar'], 400);
        }

        $this->json(['message' => 'Libro eliminado']);
    }
}
