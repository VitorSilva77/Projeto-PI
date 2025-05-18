const Matriculas = require('../models/Matriculas');

class MatriculasController {
    async listAll(req, res) {
        let matriculas = await Matriculas.findAll();
        res.status(200).json(matriculas);
    }

    async listOne(req, res) {
        let matricula = await Matriculas.findById(req.params.id);
        matricula ? res.status(200).json(matricula) : res.status(404).json({ message: 'Matrícula não encontrada' });
    }
}

module.exports = new MatriculasController();