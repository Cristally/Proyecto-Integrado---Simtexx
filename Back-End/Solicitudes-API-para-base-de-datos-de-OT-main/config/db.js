// config/db.js
const mysql = require('mysql2');

// Configura los datos de tu base MySQL
const connection = mysql.createConnection({
  host: 'localhost',    // o el host donde tengas MySQL
  user: 'root',         // tu usuario
  password: '1234',         // tu contraseña
  database: 'taller_db' // nombre de tu base de datos
});

// Probar conexión
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('✅ Conectado a la base de datos MySQL');
  }
});

module.exports = connection;
