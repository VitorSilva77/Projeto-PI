const express = require('express');
const router = express.Router();
const CursosController = require('../controllers/cursosController');

router.get('/', CursosController.listAll);
router.get('/:id', CursosController.listOne);

module.exports = router;