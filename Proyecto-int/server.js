const express = require('express');
const path = require('path');
const {Pool} = require('pg');
// ----- colocar el nombre y todo lo que pide Pool  
const Pool = new Pool({
  user:'admin',
  host:'localhost',
  database: 'base de datos',
  password: 'admin123',
  port: 5432
})
// ------
const app = express();
app.use(express.static(path.join(__dirname, 'src/views')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'src/views', 'index.html'));
});

// Metodo de escucha
app.listen(3000,()=>{
  console.log("sever runnig on port: http://localhost:3000");
})
