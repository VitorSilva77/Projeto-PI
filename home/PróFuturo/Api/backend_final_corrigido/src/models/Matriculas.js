const knex = require('../config/database');

class Matriculas {
    async findAll() {
        return await knex.select('*').table('Matriculas');
    }

    async findById(id) {
        let matricula = await knex.select('*').where({ id_matricula: id }).table('Matriculas');
        return matricula.length ? matricula[0] : null;
    }
}

module.exports = new Matriculas();