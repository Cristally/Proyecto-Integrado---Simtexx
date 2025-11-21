const express = require('express');
const router = express.Router();
const { crearOT, obtenerOTs, actualizarOT, eliminarOT } = require('../controllers/otController');

router.post('/', crearOT);
router.get('/', obtenerOTs);
router.put('/:id', actualizarOT);
router.delete('/:id', eliminarOT);

module.exports = router;