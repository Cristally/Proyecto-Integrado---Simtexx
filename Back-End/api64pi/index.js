require('dotenv').config();

const express = require('express');
const sequelize = require('./src/config/db');
const app = express();

require('./src/models/Usuario');

// Middleware para entender JSON
app.use(express.json());

// Rutas de la API
app.use('/api/usuarios', require('./src/routes/usuario.routes'));

// Función de arranque
async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Base de datos conectada y tablas sincronizadas.');

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('No se pudo conectar/sincronizar la BD:', error);
  }
}

startServer();