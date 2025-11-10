const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// [POST] /api/usuarios
router.post('/', usuarioController.crearUsuario);

// [GET] /api/usuarios
router.get('/', usuarioController.obtenerUsuarios);

// [PATCH]  /api/usuarios/)
router.patch('/:id', usuarioController.actualizarUsuario);

// [DELETE]  /api/usuarios/)
router.delete('/:id', usuarioController.eliminarUsuario);

// [PUT]
router.put('/:id', usuarioController.actualizarTotalUsuario);

module.exports = router;