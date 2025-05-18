const Pagamentos = require('../models/Pagamentos');

class PagamentosController {
    async listAll(req, res) {
        let pagamentos = await Pagamentos.findAll();
        res.status(200).json(pagamentos);
    }

    async listOne(req, res) {
        let pagamento = await Pagamentos.findById(req.params.id);
        pagamento ? res.status(200).json(pagamento) : res.status(404).json({ message: 'Pagamento não encontrado' });
    }
}

module.exports = new PagamentosController();