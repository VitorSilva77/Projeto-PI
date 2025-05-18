const express = require('express');
const api = express();
const cors = require("cors");
api.use(cors());

api.use(express.json());

const usersRoutes = require('./routes/usersRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const matriculasRoutes = require('./routes/matriculasRoutes');
const pagamentosRoutes = require('./routes/pagamentosRoutes');

api.use('/users', usersRoutes);
api.use('/cursos', cursosRoutes);
api.use('/matriculas', matriculasRoutes);
api.use('/pagamentos', pagamentosRoutes);

module.exports = api;