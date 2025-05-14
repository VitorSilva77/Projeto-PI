const knex = require('../config/database');

class Pagamentos {
    async findAll() {
        return await knex.select('*').table('Pagamentos');
    }

    async findById(id) {
        let pagamento = await knex.select('*').where({ id_pagamento: id }).table('Pagamentos');
        return pagamento.length ? pagamento[0] : null;
    }
}

module.exports = new Pagamentos();