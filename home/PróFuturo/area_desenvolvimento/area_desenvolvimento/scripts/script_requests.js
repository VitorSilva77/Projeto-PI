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
                    alert("Login realizado com sucesso!");
                    window.location.href = "area_aluno.html"; 
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
});