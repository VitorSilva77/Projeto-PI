const knex = require("../config/database");

class Users {
    // Criar um novo usuário no banco de dados
    async create(userData) {
        try {
            // A forma de obter o ID pode variar com o DB (ex: .returning("id_usuario") para PostgreSQL)
            // Para MySQL, o ID geralmente está em result.insertId. Knex tenta abstrair isso.
            // Se `[id]` não funcionar, pode ser necessário ajustar com base no seu DB e config do Knex.
            const [id_usuario] = await knex("Usuarios").insert(userData);
            return { validated: true, id: id_usuario }; // Retorna o ID do usuário criado.
        } catch (error) {
            console.error("Erro em Users.create:", error);
            return { validated: false, error: error.sqlMessage || error.message };
        }
    }

    async findAll() {
        try {
            // Seleciona campos específicos para evitar expor dados sensíveis como senhas
            let users = await knex.select(["id_usuario", "nome", "email", "tipo"]).from("Usuarios");
            return { validated: true, values: users };
        } catch (error) {
            console.error("Erro em Users.findAll:", error);
            return { validated: false, error: error.sqlMessage || error.message };
        }
    }

    async findById(id) {
        try {
            // Seleciona campos específicos
            let user = await knex.select(["id_usuario", "nome", "email", "tipo"])
                                 .from("Usuarios")
                                 .where({ id_usuario: id })
                                 .first(); // .first() retorna o objeto diretamente ou undefined
            return user
                ? { validated: true, values: user }
                : { validated: true, values: undefined };
        } catch (error) {
            console.error("Erro em Users.findById:", error);
            return { validated: false, error: error.sqlMessage || error.message };
        }
    }

    // Novo método para buscar usuário por email, incluindo a senha para autenticação
    async findByEmail(email) {
        try {
            // Seleciona todos os campos do usuário, incluindo a senha (necessária para a comparação no login)
            // Certifique-se de que o nome da coluna da senha é 'senha' na sua tabela 'Usuarios'
            let user = await knex.select(["id_usuario", "nome", "email", "senha", "tipo"])
                                 .from("Usuarios")
                                 .where({ email: email })
                                 .first();
            return user
                ? { validated: true, values: user } // Retorna o objeto do usuário encontrado
                : { validated: true, values: undefined }; // Usuário não encontrado
        } catch (error) {
            console.error("Erro em Users.findByEmail:", error);
            return { validated: false, error: error.sqlMessage || error.message };
        }
    }

    // Adicione este método na classe Users
    async update(id, userData) {
        try {
            const result = await knex("Usuarios")
                .where({ id_usuario: id })
                .update(userData);
            
            return result > 0
                ? { validated: true }
                : { validated: false, error: "Nenhum registro foi atualizado" };
        } catch (error) {
            console.error("Erro em Users.update:", error);
            return { validated: false, error: error.sqlMessage || error.message };
        }
    }


}

module.exports = new Users();

