const Users = require("../models/Users");
const bcrypt = require("bcryptjs"); // Alterado para bcryptjs conforme package.json

class UsersControllers {
    async listAll(req, res) {
        let result = await Users.findAll();
        !result.validated
            ? res.status(500).json({ success: false, message: result.error })
            : res.status(200).json({ success: true, values: result.values });
    }

    async listOne(req, res) {
        if (isNaN(req.params.id)) {
            return res.status(400).json({ success: false, message: "ID Inválido!" });
        }

        let result = await Users.findById(req.params.id);
        if (!result.validated) {
            return res.status(500).json({ success: false, message: result.error });
        }

        return result.values === undefined
            ? res.status(404).json({ success: false, message: "Usuário não encontrado!" })
            : res.status(200).json({ success: true, values: result.values });
    }

    async createUser(req, res) {
        const { nome, email, senha, tipo } = req.body;

        if (!nome || !email || !senha || !tipo) {
            return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
        }

        let senhaHash;
        try {
            senhaHash = await bcrypt.hash(senha, 10); // bcryptjs.hash também usa salt rounds
        } catch (error) {
            console.error("Erro ao gerar hash da senha:", error);
            return res.status(500).json({ success: false, message: "Erro interno ao processar senha." });
        }

        const newUser = {
            nome,
            email,
            senha: senhaHash, 
            tipo,
        };

        let result = await Users.create(newUser);
        if (!result.validated) {
            return res.status(500).json({ success: false, message: result.error });
        }

        return res.status(201).json({ success: true, message: "Usuário criado com sucesso!", id: result.id });
    }

    async loginUser(req, res) {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ success: false, message: "Email e senha são obrigatórios!" });
        }

        try {
            const userResult = await Users.findByEmail(email);

            if (!userResult.validated || !userResult.values) {
                return res.status(401).json({ success: false, message: "Email ou senha inválidos." });
            }

            const userData = userResult.values;

            const senhaValida = await bcrypt.compare(senha, userData.senha); // bcryptjs.compare

            if (!senhaValida) {
                return res.status(401).json({ success: false, message: "Email ou senha inválidos." });
            }

            const { senha: _, ...userSemSenha } = userData; 

            return res.status(200).json({ 
                success: true, 
                message: "Login realizado com sucesso!", 
                user: userSemSenha 
            });

        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ success: false, message: "Erro interno no servidor ao tentar fazer login." });
        }
    }
}

module.exports = new UsersControllers();

