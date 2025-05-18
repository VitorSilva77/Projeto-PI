require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const api = require('./src/api'); // Importa a API configurada

// Define a porta da API, pegando do .env ou usando 4040 por padrão
const PORT = process.env.PORT || 4040;

// Inicializa o servidor na porta definida
api.listen(PORT, () => {
    console.log(`\n🚀 API INICIALIZADA!!`);
});