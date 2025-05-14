const knex = require('../config/database');

class Cursos {
    async findAll() {
        return await knex.select('*').table('Cursos');
    }

    async findById(id) {
        let curso = await knex.select('*').where({ id_curso: id }).table('Cursos');
        return curso.length ? curso[0] : null;
    }
}

module.exports = new Cursos();