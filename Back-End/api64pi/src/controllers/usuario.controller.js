const Usuario = require('../models/Usuario');

// POST /api/usuarios
// Tarea: "POST: Ingresar datos a la BD"
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, rol } = req.body;

    // Validación
    if (!nombre || !correo || !contraseña) {
      return res.status(400).json({ msg: 'Faltan datos obligatorios' });
    }

    // Verificar si ya existe
    let usuario = await Usuario.findOne({ where: { correo } });
    if (usuario) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    // Crear usuario
    usuario = await Usuario.create({
      nombre,
      correo,
      contraseña,
      rol,
    });

    res.status(201).json({ msg: 'Usuario creado exitosamente', usuarioId: usuario.id });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// GET /api/usuarios
// Tarea: "GET: Obtener datos de la base de datos"
exports.obtenerUsuarios = async (req, res) => {
  try {
    // Buscamos todos los usuarios en la BD
    const usuarios = await Usuario.findAll({
      
      // ¡Importante! Excluimos la contraseña de la respuesta por seguridad
      attributes: { exclude: ['contraseña'] }
      
    });
    
    res.json(usuarios); // Enviamos la lista de usuarios como respuesta
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// PATCH /api/usuarios/:id
// Tarea: "PATCH: Actualizar un dato en concreto"
exports.actualizarUsuario = async (req, res) => {
  try {
    // 1. Obtenemos el ID de la URL
    const { id } = req.params;
    
    // 2. Obtenemos los datos a actualizar del body
    const { nombre, correo, rol, estado } = req.body;

    // 3. Buscamos el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // 4. Actualizamos el usuario
    // El 'hook' se encargará de la contraseña si viene en el body
    await usuario.update(req.body);

    res.json({ msg: 'Usuario actualizado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// DELETE /api/usuarios/:id
// Tarea: "DELETE: Eliminar un elemento de la base de datos"
// Nota: Se implementa como "soft delete" (borrado lógico)
exports.eliminarUsuario = async (req, res) => {
  try {
    // 1. Obtenemos el ID de la URL
    const { id } = req.params;

    // 2. Buscamos el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // 3. Realizamos el "soft delete"
    // No lo borramos, solo actualizamos su estado a 'inactivo'
    await usuario.update({ estado: 'inactivo' });

    res.json({ msg: 'Usuario desactivado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};

// PUT /api/usuarios/:id
// Tarea: "PUT: Actualizar todos los datos de un elemento"
exports.actualizarTotalUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, rol, estado } = req.body;

    // 1. Validación estricta para PUT
    // Exigimos que todos los campos vengan en la petición.
    if (!nombre || !correo || !rol || !estado) {
      return res.status(400).json({ 
        msg: 'Error de PUT: Se deben enviar todos los campos (nombre, correo, rol, estado).' 
      });
    }

    // 2. Buscamos el usuario
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // 3. Actualizamos el objeto completo
    // (Si el usuario envía 'contraseña' en el body, el hook 'beforeUpdate' la tomará)
    await usuario.update({
      nombre,
      correo,
      rol,
      estado
    });

    res.json({ msg: 'Usuario actualizado (PUT) exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor');
  }
};