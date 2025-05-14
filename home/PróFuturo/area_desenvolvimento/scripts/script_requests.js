//Cadastro pro index.html
document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registration-form');

    // Verifica se o formulário de cadastro existe na página atual
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita recarregar pagina

            // Coleta os dados 
            const nome = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const senha = document.getElementById('register-password').value.trim();
            const curso = document.getElementById('course').value;

            //  vê se todos os campos estão preenchidos
            if (!nome || !email || !senha || !curso) {
                alert('Por favor, preencha todos os campos!');
                return;
            }

            // envio para a api
            fetch('API', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    curso: curso
                })
            })
            .then(response => response.json())
            .then(data => {
                // Exibe mensagem de sucesso
                alert('Cadastro realizado com sucesso!');
                registrationForm.reset(); // Limpa o formulário
            })
            .catch(error => {
                console.error('Erro ao cadastrar:', error);
                alert('Ocorreu um erro ao enviar o cadastro.');
            });
        });
    }

 
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const email = document.getElementById('email-login').value.trim();
            const senha = document.getElementById('password-login').value;

            try {
                const response = await fetch('http://localhost:3000/api/login', { // coloque o endereço da sua API
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    alert('Login realizado com sucesso!');
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || 'Email ou senha incorretos!');
                }
            } catch (error) {
                console.error('Erro ao tentar fazer login:', error);
                alert('Erro na conexão com o servidor.');
            }
        });
    }
});
