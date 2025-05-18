document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registration-form");
    
    if (registrationForm) {
        registrationForm.addEventListener("submit", function(e) {
            e.preventDefault(); 

            const nome = document.getElementById("register-name").value.trim();
            const email = document.getElementById("register-email").value.trim();
            const senha = document.getElementById("register-password").value; 
            
            if (!nome || !email || !senha) {
                alert("Por favor, preencha todos os campos: Nome, Email e Senha!");
                return;
            }
            
            fetch("http://localhost:4040/users", { 
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    tipo: "aluno" 
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    document.getElementById("register-message").textContent = "Cadastro realizado com sucesso!";
                    document.getElementById("register-message").style.display = "block";
                    document.getElementById("register-error-message").style.display = "none";
                    registrationForm.reset(); 
                } else {
                    document.getElementById("register-error-message").textContent = "Erro ao cadastrar: " + (data.message || "Erro desconhecido.");
                    document.getElementById("register-error-message").style.display = "block";
                    document.getElementById("register-message").style.display = "none";
                }
            })
            .catch(error => {
                console.error("Erro ao cadastrar:", error);
                document.getElementById("register-error-message").textContent = "Ocorreu um erro ao enviar o cadastro. Verifique o console para mais detalhes.";
                document.getElementById("register-error-message").style.display = "block";
                document.getElementById("register-message").style.display = "none";
            });
        });
    }

    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", async function(e) {
            e.preventDefault();

            const email = document.getElementById("email").value.trim(); 
            const senha = document.getElementById("password").value; 
            
            if (!email || !senha) {
                alert("Por favor, preencha email e senha.");
                return;
            }

            try {
                const response = await fetch("http://localhost:4040/users/login", { 
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, senha })
                });

                const data = await response.json();

                if (response.ok && data.success) {

                    console.log('Resposta do login:', data);

                    // Armazenar dados do usuário no localStorage para uso em outras páginas
                    localStorage.setItem('usuarioLogado', JSON.stringify(data.user));
                    
                    // Redirecionar diretamente para a página do aluno sem mostrar pop-up
                    window.location.href = `area_aluno.html?id=${data.user.id_usuario}`;
                    
                    loginForm.reset();
                    document.getElementById("login-error-message").style.display = "none";
                } else {
                    document.getElementById("login-error-message").textContent = data.message || "Email ou senha incorretos!";
                    document.getElementById("login-error-message").style.display = "block";
                }
            } catch (error) {
                console.error("Erro ao tentar fazer login:", error);
                document.getElementById("login-error-message").textContent = "Erro na conexão com o servidor. Verifique o console para mais detalhes.";
                document.getElementById("login-error-message").style.display = "block";
            }
        });
    }

    // Função para editar perfil do usuário
    window.editarPerfil = async function(formData) {
    try {
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

        const response = await fetch(`http://localhost:4040/users/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData )
        });

        const data = await response.json();
        console.log('Resposta da API:', data);

        if (response.ok && data.success) {
        // Atualiza os dados do usuário no localStorage
            if (usuarioLogado.user) {
                // Se o objeto tem a estrutura usuarioLogado.user
                usuarioLogado.user = { ...usuarioLogado.user, ...formData };
            } else {
                // Se o objeto tem a estrutura direta
                Object.assign(usuarioLogado, formData);
            }
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
            
            return { success: true, message: "Perfil atualizado com sucesso!" };
            } else {
            return { success: false, message: data.message || "Erro ao atualizar perfil." };
            }
        } catch (error) {
            console.error("Erro ao editar perfil:", error);
            return { success: false, message: "Erro na conexão com o servidor." };
        }
    };

});
