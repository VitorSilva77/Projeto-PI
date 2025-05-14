const express = require('express');
const router = express.Router();
const PagamentosController = require('../controllers/pagamentosController');

router.get('/', PagamentosController.listAll);
router.get('/:id', PagamentosController.listOne);

module.exports = router;