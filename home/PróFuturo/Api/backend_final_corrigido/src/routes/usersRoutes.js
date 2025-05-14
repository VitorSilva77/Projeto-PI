const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/usersControllers.js");

// Rota para listar todos os usuários
router.get("/", usersControllers.listAll);

// Rota para listar um usuário específico
router.get("/:id", usersControllers.listOne);

// Rota para criar um novo usuário (CREATE)
router.post("/", usersControllers.createUser);

// Nova rota para login de usuário
router.post("/login", usersControllers.loginUser);

module.exports = router;

