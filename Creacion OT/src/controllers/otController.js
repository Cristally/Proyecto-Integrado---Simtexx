const pool = require('../config/db');

// CREAR OT
const crearOT = async (req, res) => {
  const { codigo, titulo, descripcion, responsable_id, fecha_inicio, fecha_fin } = req.body;

  try {
    const query = `
      INSERT INTO ot (codigo, titulo, descripcion, estado, fecha_inicio_contrato, fecha_fin_contrato, responsable_id)
      VALUES ($1, $2, $3, 'creada', $4, $5, $6)
      RETURNING *;
    `;
    const values = [codigo, titulo, descripcion, fecha_inicio, fecha_fin, responsable_id];
    
    const result = await pool.query(query, values);
    res.status(201).json({ msg: 'OT creada', ot: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// LISTAR OTs (Solo activas)
const obtenerOTs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ot WHERE activo = true');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ACTUALIZAR OT
const actualizarOT = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, fecha_inicio, fecha_fin } = req.body;

  try {
    const query = `
      UPDATE ot 
      SET titulo = $1, descripcion = $2, estado = $3, fecha_inicio_contrato = $4, fecha_fin_contrato = $5
      WHERE id_ot = $6 RETURNING *;
    `;
    const values = [titulo, descripcion, estado, fecha_inicio, fecha_fin, id];
    const result = await pool.query(query, values);
    
    if (result.rowCount === 0) return res.status(404).json({ msg: 'OT no encontrada' });
    res.json({ msg: 'OT actualizada', ot: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ELIMINAR (Desactivar) OT
const eliminarOT = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('UPDATE ot SET activo = false WHERE id_ot = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ msg: 'OT no encontrada' });
    res.json({ msg: 'OT desactivada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { crearOT, obtenerOTs, actualizarOT, eliminarOT };