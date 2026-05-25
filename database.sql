CREATE DATABASE IF NOT EXISTS bibloteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bibloteca;

CREATE TABLE IF NOT EXISTS personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(120) NOT NULL,
    apellido VARCHAR(120) NOT NULL,
    email VARCHAR(160) NOT NULL,
    telefono VARCHAR(40) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS libros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    autor VARCHAR(160) NOT NULL,
    isbn VARCHAR(50) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS prestamos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    libro_id INT NOT NULL,
    persona_id INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE NULL,
    estado ENUM('prestado', 'devuelto') NOT NULL DEFAULT 'prestado',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_prestamos_libro FOREIGN KEY (libro_id) REFERENCES libros(id) ON DELETE RESTRICT,
    CONSTRAINT fk_prestamos_persona FOREIGN KEY (persona_id) REFERENCES personas(id) ON DELETE RESTRICT
) ENGINE=InnoDB;
