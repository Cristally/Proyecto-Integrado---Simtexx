// routes/ordenesRoutes.js
const express = require('express');
const router = express.Router();
const ordenesController = require('../controllers/ordenesController');

// Rutas CRUD
router.get('/', ordenesController.getOrdenes);
router.get('/:id', ordenesController.getOrdenById);
router.post('/', ordenesController.createOrden);
router.put('/:id', ordenesController.updateOrden);
router.patch('/:id', ordenesController.patchOrden);
router.delete('/:id', ordenesController.deleteOrden);
// Rutas adicionales
router.get('/inactivas', ordenesController.getOrdenesInactivas);
router.put('/restaurar/:id', ordenesController.restoreOrden);


module.exports = router;
