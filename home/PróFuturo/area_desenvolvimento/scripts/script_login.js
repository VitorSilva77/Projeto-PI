function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    // Alterna a visibilidade dos SVGs do botão
    const svgs = document.querySelectorAll('.dark-toggle svg');
    svgs[0].style.display = isDarkMode ? 'none' : 'block';
    svgs[1].style.display = isDarkMode ? 'block' : 'none';
    // Salva a preferência no localStorage
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
}

// Carrega as preferências do usuário ao iniciar
document.addEventListener('DOMContentLoaded', () => {
    // Verifica o modo escuro
    if (localStorage.getItem('darkMode') === 'enabled') {
    toggleDarkMode();
    }
    
    // Carrega os dados do usuário
    carregarDadosUsuario();
});

// Função para carregar dados do usuário
function carregarDadosUsuario() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    
    if (!usuarioLogado) {
    // Se não houver usuário logado, redireciona para a página de login
    window.location.href = 'login.html';
    return;
    }
    
    // Atualiza o nome do aluno na página
    document.getElementById('nome-aluno').textContent = usuarioLogado.nome;
    
    // Preenche o formulário de edição com os dados atuais
    document.getElementById('edit-nome').value = usuarioLogado.nome;
    document.getElementById('edit-email').value = usuarioLogado.email;
}

// Funções do Modal de Edição de Perfil
function abrirModalEditarPerfil() {
    document.getElementById('modalEditarPerfil').style.display = 'block';
    document.getElementById('formEdicao').style.display = 'block';
    document.getElementById('mensagemSucesso').style.display = 'none';
}

function fecharModalEditarPerfil() {
    document.getElementById('modalEditarPerfil').style.display = 'none';
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
    const modal = document.getElementById('modalEditarPerfil');
    if (event.target === modal) {
    fecharModalEditarPerfil();
    }
}

// Função para salvar as alterações do perfil
async function salvarPerfil() {
    const nome = document.getElementById('edit-nome').value.trim();
    const email = document.getElementById('edit-email').value.trim();
    const senha = document.getElementById('edit-senha').value;
    
    // Validação básica
    if (!nome || !email) {
    alert('Por favor, preencha os campos Nome e E-mail.');
    return;
    }
    
    // Prepara os dados para envio
    const dadosAtualizados = { nome, email };
    
    // Adiciona a senha apenas se foi preenchida
    if (senha) {
    dadosAtualizados.senha = senha;
    }
    
    try {
    // Obtém o usuário logado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    console.log('Objeto usuário completo:', usuarioLogado);
    
    // Determina o ID correto - verifica todas as possibilidades
    let userId = null;
    if (usuarioLogado && usuarioLogado.id_usuario) {
        userId = usuarioLogado.id_usuario;
    } else if (usuarioLogado && usuarioLogado.id) {
        userId = usuarioLogado.id;
    } else if (usuarioLogado && usuarioLogado.user && usuarioLogado.user.id_usuario) {
        userId = usuarioLogado.user.id_usuario;
    } else if (usuarioLogado && usuarioLogado.user && usuarioLogado.user.id) {
        userId = usuarioLogado.user.id;
    }
    
    if (!userId) {
        throw new Error('ID do usuário não encontrado');
    }
    
    console.log('ID do usuário usado na requisição:', userId);
    
    // Envia a requisição para a API
    const response = await fetch(`http://localhost:4040/users/${userId}`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosAtualizados )
    });
    
    console.log('Resposta da API:', response.status);
    const data = await response.json();
    console.log('Dados da resposta:', data);
    
    if (response.ok && data.success) {
        // Atualiza os dados do usuário no localStorage
        if (usuarioLogado.user) {
        // Se o objeto tem a estrutura usuarioLogado.user
        usuarioLogado.user = { ...usuarioLogado.user, ...dadosAtualizados };
        } else {
        // Se o objeto tem a estrutura direta
        Object.assign(usuarioLogado, dadosAtualizados);
        }
        delete usuarioLogado.senha; // Remove a senha por segurança
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        
        // Atualiza o nome na página
        document.getElementById('nome-aluno').textContent = nome;
        
        // Mostra a mensagem de sucesso
        document.getElementById('formEdicao').style.display = 'none';
        document.getElementById('mensagemSucesso').style.display = 'block';
    } else {
        alert(data.message || 'Erro ao atualizar perfil.');
    }
    } catch (error) {
    console.error('Erro ao editar perfil:', error);
    alert('Erro na conexão com o servidor. Por favor, tente novamente.');
    }
}