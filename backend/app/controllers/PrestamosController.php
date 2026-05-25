<?php

class PrestamosController extends Controller
{
    private function model()
    {
        return new Prestamo($this->db());
    }

    public function index()
    {
        $prestamos = $this->model()->allWithDetails();
        $this->json($prestamos);
    }

    public function show($id)
    {
        $prestamo = $this->model()->findWithDetails($id);
        if (!$prestamo) {
            $this->json(['message' => 'Prestamo no encontrado'], 404);
        }

        $this->json($prestamo);
    }

    public function store()
    {
        $data = $this->input();
        $required = ['libro_id', 'persona_id', 'fecha_prestamo', 'estado'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $data['fecha_devolucion'] = $data['fecha_devolucion'] ?? null;
        $prestamo = $this->model()->create($data);
        $this->json($prestamo, 201);
    }

    public function update($id)
    {
        $data = $this->input();
        $required = ['libro_id', 'persona_id', 'fecha_prestamo', 'estado'];
        foreach ($required as $field) {
            if (!isset($data[$field]) || $data[$field] === '') {
                $this->json(['message' => 'Campos incompletos'], 422);
            }
        }

        $data['fecha_devolucion'] = $data['fecha_devolucion'] ?? null;
        $prestamo = $this->model()->updateById($id, $data);
        $this->json($prestamo);
    }

    public function destroy($id)
    {
        $deleted = $this->model()->delete($id);
        if (!$deleted) {
            $this->json(['message' => 'No se pudo eliminar'], 400);
        }

        $this->json(['message' => 'Prestamo eliminado']);
    }
}
