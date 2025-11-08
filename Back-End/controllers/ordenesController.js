// controllers/ordenesController.js
const db = require('../config/db');

// GET - Obtener todas las órdenes activas
exports.getOrdenes = (req, res) => {
  db.query('SELECT * FROM ordenes WHERE activa = 1', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// GET - Obtener una orden por ID
exports.getOrdenById = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM ordenes WHERE id = ? AND activa = 1', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Orden no encontrada' });
    res.json(results[0]);
  });
};

// POST - Crear nueva orden
exports.createOrden = (req, res) => {
  const { titulo, descripcion, fecha } = req.body;
  const sql = 'INSERT INTO ordenes (titulo, descripcion, fecha, activa) VALUES (?, ?, ?, 1)';
  db.query(sql, [titulo, descripcion, fecha], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Orden creada correctamente', id: result.insertId });
  });
};

// PUT - Actualizar todos los campos de una orden
exports.updateOrden = (req, res) => {
  const id = req.params.id;
  const { titulo, descripcion, fecha } = req.body;
  const sql = 'UPDATE ordenes SET titulo = ?, descripcion = ?, fecha = ? WHERE id = ? AND activa = 1';
  db.query(sql, [titulo, descripcion, fecha, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Orden actualizada correctamente' });
  });
};

// PATCH - Actualizar un campo específico
exports.patchOrden = (req, res) => {
  const id = req.params.id;
  const campos = req.body;
  const sql = 'UPDATE ordenes SET ? WHERE id = ? AND activa = 1';
  db.query(sql, [campos, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Campo actualizado correctamente' });
  });
};

// DELETE - Eliminación lógica (no borrar, solo ocultar)
exports.deleteOrden = (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE ordenes SET activa = 0 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Orden desactivada correctamente (eliminación lógica)' });
  });
};

// NUEVO: GET - Mostrar órdenes inactivas
exports.getOrdenesInactivas = (req, res) => {
  db.query('SELECT * FROM ordenes WHERE activa = 0', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// NUEVO: PUT - Restaurar una orden desactivada
exports.restoreOrden = (req, res) => {
  const id = req.params.id;
  const sql = 'UPDATE ordenes SET activa = 1 WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Orden no encontrada o ya activa' });
    res.json({ message: 'Orden restaurada correctamente' });
  });
};
