const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       // Usuario por defecto de Postgres
  host: 'localhost',
  database: 'simtexx_db', // La base que creamos en el Paso 1
  password: 'Pi2025', // <--- ¡IMPORTANTE! Pon tu clave aquí
  port: 5432,
});

module.exports = pool;