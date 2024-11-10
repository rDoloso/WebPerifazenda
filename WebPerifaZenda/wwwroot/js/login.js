document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("btn-entrar");

    if (loginButton) {
        loginButton.addEventListener("click", async function (event) {
            event.preventDefault(); // Previne o envio do formulário padrão

            const usuario = document.getElementById("usuario").value;
            const senha = document.getElementById("senha").value;

            // Fazendo a requisição à API
            try {
                const response = await fetch('https://localhost:7061/api/Login/verificar', { // Alterado para a URL correta da API
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: usuario,
                        senha: senha
                    })
                });

                const result = await response.json();

                if (response.ok) {
                    window.location.href = '/Produto'; 
                } else {
                    alert(result.message); // Exibe a mensagem de erro
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        });
    } else {
        console.error("Botão de login não encontrado.");
    }
});
