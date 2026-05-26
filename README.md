# 📚 Biblioteca - Sistema de Gestión de Préstamos

Un sistema web  para la gestión integral de una biblioteca. Permite administrar libros, personas (patrones) y el registro de préstamos con una interfaz intuitiva y responsiva.

## 🎯 Características

- **Gestión de Libros**: Crear, editar, eliminar y consultar libros del catálogo
- **Gestión de Personas**: Administrar información de los patrones de la biblioteca
- **Control de Préstamos**: Registrar préstamos y devoluciones entre libros y personas
- **Interfaz Moderna**: Diseño responsivo con Tailwind CSS y componentes accesibles
- **Hot Reload**: Actualizaciones en tiempo real durante el desarrollo con Vite
- **API RESTful**: Backend PHP con Apache y MySQL
- **Containerización**: Completamente dockerizado para facilitar el despliegue

## 🛠️ Stack Tecnológico

### Frontend
- **React 19.2.6**: Librería de interfaz de usuario
- **Vite 8.0.14**: Herramienta de construcción y servidor de desarrollo rápido
- **Tailwind CSS 4.3.0**: Framework de estilos utilitarios
- **Radix UI**: Componentes accesibles y sin estilos

### Backend
- **PHP 8.2**: Lenguaje de programación del servidor
- **Apache 2.4**: Servidor web
- **MySQL 8.0**: Base de datos
- **Composer**: Gestor de dependencias de PHP

### DevOps
- **Docker**: Containerización
- **Docker Compose**: Orquestación de servicios
- **Node.js 20 (Alpine)**: Runtime para el frontend

## 📋 Requisitos Previos

Antes de empezar, asegúrate de tener instalado:

- **Docker Desktop** (incluye Docker y Docker Compose)
  - [Descargar Docker Desktop](https://www.docker.com/products/docker-desktop)
- **Git** (para clonar el repositorio)
  - [Descargar Git](https://git-scm.com)
- **Navegador web moderno** (Chrome, Firefox, Edge, Safari)

## 🚀 Instalación y Ejecución

### 1. Clonar el Repositorio

```bash
# Clonar el repositorio
git clone https://github.com/JulianLargo72/bibloteca.git
cd bibloteca
```

### 2. Verificar Configuración

El proyecto incluye un archivo `.env.example` con las variables de entorno necesarias:

```bash
# Ver el archivo de ejemplo (opcional)
cat .env.example
```

Las variables principales son:
- `DB_HOST`: Host de la base de datos (db)
- `DB_NAME`: Nombre de la base de datos (bibloteca)
- `DB_USER`: Usuario de la base de datos (bibloteca_user)
- `DB_PASS`: Contraseña de la base de datos (bibloteca_pass)
- `CORS_ORIGIN`: Origen permitido para CORS (http://localhost:5173)
- `VITE_API_URL`: URL de la API backend (http://localhost:8080/api)

### 3. Ejecutar con Docker Compose

#### Iniciar todos los servicios

```bash
# Construir e iniciar los contenedores
docker-compose up --build

# Nota: La primera ejecución descargará las imágenes base y puede tomar 2-3 minutos
```

#### Verificar que todos los servicios estén corriendo

```bash
# En otra terminal, ver el estado de los contenedores
docker-compose ps

# Deberías ver los tres servicios en estado "Up":
# - bibloteca_db (MySQL)
# - bibloteca_backend (PHP/Apache)
# - bibloteca_frontend (Vite)
```

### 4. Acceder a la Aplicación

Una vez que todos los servicios estén corriendo:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **MySQL**: localhost:3306 (usuario: bibloteca_user, contraseña: bibloteca_pass)

## 📖 Uso de la Aplicación

### Gestión de Libros
1. Ve a la sección "Libros"
2. Haz clic en "Agregar Libro" para registrar un nuevo libro
3. Completa los datos requeridos (título, autor, año, categoría)
4. Puedes editar o eliminar libros desde la tabla de libros

### Gestión de Personas
1. Ve a la sección "Personas"
2. Haz clic en "Agregar Persona" para registrar un nuevo patrón
3. Completa los datos requeridos (nombre, email, teléfono, dirección)
4. Puedes editar o eliminar personas desde la tabla

### Gestión de Préstamos
1. Ve a la sección "Préstamos"
2. Haz clic en "Agregar Préstamo" para registrar un nuevo préstamo
3. Selecciona el libro, la persona, la fecha de préstamo y la fecha de devolución prevista
4. Puedes cambiar el estado (activo/devuelto) o eliminar préstamos

## 🗂️ Estructura del Proyecto

```
bibloteca/
├── frontend/                          # Aplicación React + Vite
│   ├── src/
│   │   ├── modules/                   # Módulos por característica
│   │   │   ├── libros/               # Gestión de libros
│   │   │   ├── personas/             # Gestión de personas
│   │   │   └── prestamos/            # Gestión de préstamos
│   │   ├── components/               # Componentes reutilizables
│   │   ├── lib/                      # Funciones utilitarias
│   │   ├── config/                   # Configuración
│   │   ├── App.jsx                   # Componente principal
│   │   └── main.jsx                  # Punto de entrada
│   ├── Dockerfile                    # Dockerfile para producción/desarrollo
│   ├── vite.config.js               # Configuración de Vite
│   ├── package.json                 # Dependencias del frontend
│   └── tailwind.config.js           # Configuración de Tailwind CSS
├── backend/                          # API PHP
│   ├── app/
│   │   ├── config/                  # Configuración
│   │   ├── models/                  # Modelos de datos
│   │   ├── controllers/             # Controladores
│   │   └── database/                # Migrations y seeds
│   ├── public/                      # Punto de entrada
│   ├── Dockerfile                   # Dockerfile para backend
│   └── composer.json                # Dependencias de PHP
├── database.sql                     # Script inicial de base de datos
├── docker-compose.yml              # Orquestación de servicios
├── .env.example                    # Variables de entorno de ejemplo
├── README.md                       # Este archivo
└── DOCKER.md                       # Documentación detallada de Docker
```

## 🔧 Comandos Útiles

### Iniciar/Detener Servicios

```bash
# Iniciar todos los servicios en el fondo
docker-compose up -d

# Detener todos los servicios
docker-compose down

# Detener y eliminar volúmenes (limpia la base de datos)
docker-compose down -v

# Reconstruir las imágenes
docker-compose up --build

# Reconstruir sin caché
docker-compose up --build --no-cache
```

### Ver Logs

```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico (con -f para seguir en tiempo real)
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f db

# Últimas 20 líneas del log del frontend
docker-compose logs frontend --tail 20
```

### Ejecutar Comandos en Contenedores

```bash
# Acceder a la terminal del contenedor del backend
docker-compose exec backend bash

# Acceder a la base de datos MySQL
docker-compose exec db mysql -u bibloteca_user -pbiblioteca_pass bibloteca

# Ejecutar un comando en el frontend
docker-compose exec frontend npm list
```

## 📡 API Endpoints

### Libros
- `GET /api/libros` - Obtener todos los libros
- `POST /api/libros` - Crear un nuevo libro
- `PUT /api/libros/:id` - Actualizar un libro
- `DELETE /api/libros/:id` - Eliminar un libro

### Personas
- `GET /api/personas` - Obtener todas las personas
- `POST /api/personas` - Crear una nueva persona
- `PUT /api/personas/:id` - Actualizar una persona
- `DELETE /api/personas/:id` - Eliminar una persona

### Préstamos
- `GET /api/prestamos` - Obtener todos los préstamos
- `POST /api/prestamos` - Crear un nuevo préstamo
- `PUT /api/prestamos/:id` - Actualizar un préstamo
- `DELETE /api/prestamos/:id` - Eliminar un préstamo

## 🐛 Solución de Problemas

### El frontend no responde en http://localhost:5173

```bash
# Verifica que el contenedor está corriendo
docker-compose ps

# Revisa los logs del frontend
docker-compose logs -f frontend

# Busca el mensaje "VITE ready in" que indica que el servidor está listo
```

### Error de conexión entre frontend y backend

```bash
# Verifica que el backend está corriendo
docker-compose logs backend | tail -20

# Comprueba que la API responde
curl http://localhost:8080/api/libros

# Verifica la configuración de CORS en backend/app/config/config.php
```

### Base de datos no inicializa

```bash
# Limpia todo y vuelve a empezar
docker-compose down -v

# Reconstruye desde cero
docker-compose up --build

# Verifica que la base de datos está saludable
docker-compose ps  # Busca el estado "healthy" en db
```

### Puerto ya está en uso

Si alguno de los puertos (3306, 5173, 8080) está siendo usado:

```bash
# Opción 1: Usar puertos diferentes en docker-compose.yml
# Cambiar "3306:3306" a "3307:3306", etc.

# Opción 2: Detener las aplicaciones que usan esos puertos
# Ejemplo en Windows PowerShell:
Get-NetTCPConnection -LocalPort 5173 | Stop-Process
```

---

**Última actualización**: 25 de mayo de 2026
