<?php

class PersonasController extends Controller
{
    private function model()
    {
        return new Persona($this->db());
    }

    public function index()
    {
        $personas = $this->model()->all();
        $this->json($personas);
    }

    public function show($id)
    {
        $persona = $this->model()->find($id);
        if (!$persona) {
            $this->json(['message' => 'Persona no encontrada'], 404);
        }

        $this->json($persona);
    }

    public function store()
    {
        $data = $this->input();
        $required = ['nombre', 'apellido', 'email', 'telefono'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $persona = $this->model()->create($data);
        $this->json($persona, 201);
    }

    public function update($id)
    {
        $data = $this->input();
        $required = ['nombre', 'apellido', 'email', 'telefono'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $persona = $this->model()->updateById($id, $data);
        $this->json($persona);
    }

    public function destroy($id)
    {
        $deleted = $this->model()->delete($id);
        if (!$deleted) {
            $this->json(['message' => 'No se pudo eliminar'], 400);
        }

        $this->json(['message' => 'Persona eliminada']);
    }
}
