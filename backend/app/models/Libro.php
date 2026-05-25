<?php

class Libro extends Model
{
    protected $table = 'libros';

    public function create($data)
    {
        $stmt = $this->db->prepare(
            'INSERT INTO libros (titulo, autor, isbn, stock) VALUES (:titulo, :autor, :isbn, :stock)'
        );
        $stmt->execute([
            'titulo' => $data['titulo'],
            'autor' => $data['autor'],
            'isbn' => $data['isbn'],
            'stock' => $data['stock'],
        ]);

        return $this->find($this->db->lastInsertId());
    }

    public function updateById($id, $data)
    {
        $stmt = $this->db->prepare(
            'UPDATE libros SET titulo = :titulo, autor = :autor, isbn = :isbn, stock = :stock WHERE id = :id'
        );
        $stmt->execute([
            'id' => $id,
            'titulo' => $data['titulo'],
            'autor' => $data['autor'],
            'isbn' => $data['isbn'],
            'stock' => $data['stock'],
        ]);

        return $this->find($id);
    }
}
