const Cursos = require('../models/Cursos');

class CursosController {
    async listAll(req, res) {
        let cursos = await Cursos.findAll();
        res.status(200).json(cursos);
    }

    async listOne(req, res) {
        let curso = await Cursos.findById(req.params.id);
        curso ? res.status(200).json(curso) : res.status(404).json({ message: 'Curso não encontrado' });
    }
}

module.exports = new CursosController();