const express = require('express');
const otRoutes = require('./src/routes/otRoutes');

const app = express();

// Middleware para entender JSON
app.use(express.json());

// Rutas
app.use('/api/ot', otRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);

});
