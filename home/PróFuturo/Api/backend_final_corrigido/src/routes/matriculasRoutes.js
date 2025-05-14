const express = require('express');
const router = express.Router();
const MatriculasController = require('../controllers/matriculasController');

router.get('/', MatriculasController.listAll);
router.get('/:id', MatriculasController.listOne);

module.exports = router;