// server.js
const express = require('express');
const app = express();
const ordenesRoutes = require('./routes/ordenesRoutes');
const connection = require('./config/db');

// Middleware para leer JSON
app.use(express.json());

// Ruta principal de órdenes
app.use('/api/ordenes', ordenesRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});

// Probar conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});