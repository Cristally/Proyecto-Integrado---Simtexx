# Backend API - Proyecto Integrado (Solicitudes API para base de datos de usuarios)

Este repositorio contiene el backend de la API para el "Proyecto Integrado". El objetivo de este módulo es gestionar la base de datos de usuarios (Tarea #64), proporcionando *endpoints* CRUD (Crear, Leer, Actualizar, Eliminar).

El stack tecnológico utilizado es:
* **Node.js**: Entorno de ejecución de JavaScript.
* **Express**: Framework para la creación de la API.
* **Sequelize**: ORM para la gestión de la base de datos PostgreSQL.
* **PostgreSQL**: Motor de base de datos.
* **JWT (JSON Web Tokens)**: Para la autenticación y seguridad.

---

## 1. Configuración de Desarrollo Local

Este proyecto está configurado para ejecutarse con una **base de datos PostgreSQL local** para fines de desarrollo y pruebas.

### Requisitos Previos

Asegúrate de tener instalado:
* Node.js (v18+ recomendado)
* PostgreSQL
* Postman (o un cliente API similar como Insomnia)

### Pasos para la Instalación

1.  **Clonar el repositorio** (o descargar los archivos).
2.  **Instalar dependencias**:
    ```bash
    npm install
    ```
3.  **Crear la Base de Datos Local**:
    * Abre **pgAdmin** o tu cliente de PostgreSQL preferido.
    * Conéctate a tu servidor local.
    * Haz clic derecho en "Databases" -> "Create" -> "Database...".
    * Nombra la base de datos: `proyecto_db`
4.  **Configurar el archivo `.env`**:
    * Crea un archivo llamado `.env` en la raíz del proyecto.
    * Añade tus credenciales de PostgreSQL. (Debe coincidir con la base de datos que creaste en el paso anterior).
    ```
    # Credenciales de la Base de Datos Local
    DB_NAME=proyecto_db
    DB_USER=postgres
    DB_PASS=tu_contraseña_de_postgres
    DB_HOST=localhost
    ```
    * **Importante**: Reemplaza `tu_contraseña_de_postgres` con la contraseña maestra que definiste al instalar PostgreSQL.

---

## 2. Ejecución del Proyecto

1.  **Iniciar el servidor**:
    ```bash
    npm run dev
    ```
2.  El servidor se iniciará en `http://localhost:3001`.
3.  **Sincronización de la Base de Datos**:
    * La primera vez que ejecutes el servidor, Sequelize (el ORM) leerá los archivos en la carpeta `/models` (ej. `Usuario.js`) y creará automáticamente las tablas correspondientes en tu base de datos local `proyecto_db`.

---

## 3. Pruebas de la API con Postman

Para verificar que los *endpoints* funcionan correctamente, usamos **Postman** para enviar peticiones HTTP a nuestro servidor local.

### Endpoint Base
La URL base para la API de usuarios es: `http://localhost:3001/api/usuarios`

### Ejemplos de Peticiones

#### 1. Crear un Usuario (POST)
* **Método:** `POST`
* **URL:** `http://localhost:3001/api/usuarios`
* **Body** -> **raw** -> **JSON**:
    ```json
    {
      "nombre": "Usuario de Prueba",
      "correo": "prueba@correo.com",
      "contraseña": "password123",
      "rol": "admin"
    }
    ```

#### 2. Obtener todos los Usuarios (GET)
* **Método:** `GET`
* **URL:** `http://localhost:3001/api/usuarios`

#### 3. Actualizar un Usuario (PATCH)
* **Método:** `PATCH`
* **URL:** `http://localhost:3001/api/usuarios/1` (Donde `1` es el ID del usuario)
* **Body** -> **raw** -> **JSON**:
    ```json
    {
      "nombre": "Nombre Actualizado"
    }
    ```

#### 4. "Eliminar" un Usuario (DELETE)
* **Método:** `DELETE`
* **URL:** `http://localhost:3001/api/usuarios/1`
* **Acción**: Esto no borra al usuario de la base de datos, sino que implementa un **borrado lógico** (soft delete) cambiando su estado a `inactivo`.