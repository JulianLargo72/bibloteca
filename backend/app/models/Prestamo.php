<?php

class Prestamo extends Model
{
    protected $table = 'prestamos';

    public function allWithDetails()
    {
        $sql = 'SELECT p.*, l.titulo AS libro_titulo, CONCAT(pe.nombre, " ", pe.apellido) AS persona_nombre
                FROM prestamos p
                INNER JOIN libros l ON l.id = p.libro_id
                INNER JOIN personas pe ON pe.id = p.persona_id
                ORDER BY p.id DESC';
        $stmt = $this->db->query($sql);
        return $stmt->fetchAll();
    }

    public function findWithDetails($id)
    {
        $sql = 'SELECT p.*, l.titulo AS libro_titulo, CONCAT(pe.nombre, " ", pe.apellido) AS persona_nombre
                FROM prestamos p
                INNER JOIN libros l ON l.id = p.libro_id
                INNER JOIN personas pe ON pe.id = p.persona_id
                WHERE p.id = :id';
        $stmt = $this->db->prepare($sql);
        $stmt->execute(['id' => $id]);
        return $stmt->fetch();
    }

    public function create($data)
    {
        $stmt = $this->db->prepare(
            'INSERT INTO prestamos (libro_id, persona_id, fecha_prestamo, fecha_devolucion, estado) VALUES (:libro_id, :persona_id, :fecha_prestamo, :fecha_devolucion, :estado)'
        );
        $stmt->execute([
            'libro_id' => $data['libro_id'],
            'persona_id' => $data['persona_id'],
            'fecha_prestamo' => $data['fecha_prestamo'],
            'fecha_devolucion' => $data['fecha_devolucion'],
            'estado' => $data['estado'],
        ]);

        return $this->findWithDetails($this->db->lastInsertId());
    }

    public function updateById($id, $data)
    {
        $stmt = $this->db->prepare(
            'UPDATE prestamos SET libro_id = :libro_id, persona_id = :persona_id, fecha_prestamo = :fecha_prestamo, fecha_devolucion = :fecha_devolucion, estado = :estado WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'libro_id' => $data['libro_id'],
            'persona_id' => $data['persona_id'],
            'fecha_prestamo' => $data['fecha_prestamo'],
            'fecha_devolucion' => $data['fecha_devolucion'],
            'estado' => $data['estado'],
        ]);

        return $this->findWithDetails($id);
    }
}
