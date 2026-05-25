<?php

class Persona extends Model
{
    protected $table = 'personas';

    public function create($data)
    {
        $stmt = $this->db->prepare(
            'INSERT INTO personas (nombre, apellido, email, telefono) VALUES (:nombre, :apellido, :email, :telefono)'
        );
        $stmt->execute([
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'email' => $data['email'],
            'telefono' => $data['telefono'],
        ]);

        return $this->find($this->db->lastInsertId());
    }

    public function updateById($id, $data)
    {
        $stmt = $this->db->prepare(
            'UPDATE personas SET nombre = :nombre, apellido = :apellido, email = :email, telefono = :telefono WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'nombre' => $data['nombre'],
            'apellido' => $data['apellido'],
            'email' => $data['email'],
            'telefono' => $data['telefono'],
        ]);

        return $this->find($id);
    }
}
