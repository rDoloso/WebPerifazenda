document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById('toggle-cliente');
    const nomeLabel = document.getElementById('label-nome');
    const cpfInput = document.getElementById('cpf');
    let tipoCliente = 1; // Tipo padrão: 1 para Pessoa Física

    // Alternar entre cliente pessoa física e empresa
    toggleButton.addEventListener('click', () => {
        if (tipoCliente === 1) {
            toggleButton.textContent = 'Cliente pessoa física';
            nomeLabel.textContent = 'Razão Social:';
            cpfInput.placeholder = 'Digite o CNPJ';
            cpfInput.id = 'cnpj'; // Troca para o ID CNPJ
            cpfInput.classList.add('cnpj-class');
            cpfInput.classList.remove('cpf-class');
            tipoCliente = 2; // Cliente Empresa
        } else {
            toggleButton.textContent = 'Cliente empresa';
            nomeLabel.textContent = 'Nome completo:';
            cpfInput.placeholder = 'Digite o CPF';
            cpfInput.id = 'cpf'; // Troca de volta para o ID CPF
            cpfInput.classList.add('cpf-class');
            cpfInput.classList.remove('cnpj-class');
            tipoCliente = 1; // Cliente Pessoa Física
        }
    });

    async function verificarExistencia(cpfCnpj, username) {
        try {
            const tipoEndpoint = tipoCliente === 1 ? 'verificar-cpf' : 'verificar-cnpj';
            const response = await fetch(`https://localhost:7061/api/Cliente/${tipoEndpoint}?${tipoCliente === 1 ? 'cpf' : 'cnpj'}=${cpfCnpj}`);
            const usernameResponse = await fetch(`https://localhost:7061/api/Login/verificar-usuario?username=${username}`);

            if (!response.ok || !usernameResponse.ok) {
                console.log('Usuário ou cliente já existe.');
                alert('Usuário ou cliente já existe.');
                return false;
            }

            return true;
        } catch (error) {
            console.error('Erro na verificação de existência:', error);
            alert('Erro ao fazer a requisição à API.');
            return false;
        }
    }

    async function criarUsuarioCliente(clienteData, username, email, senha) {
        try {
            const clienteResponse = await fetch('https://localhost:7061/api/Cliente', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(clienteData),
            });

            if (clienteResponse.ok) {
                const cliente = await clienteResponse.json();
                const loginData = {
                    username: username,
                    email: email,
                    senha: senha,
                    idCliente: cliente.idCliente,
                    tipoLogin: 2
                };

                const loginResponse = await fetch('https://localhost:7061/api/Login/criar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                });

                if (loginResponse.ok) {
                    alert('Cadastro realizado com sucesso!');
                    window.location.href = '/Home/Index';
                } else {
                    const result = await loginResponse.json();
                    alert('Erro no cadastro do login: ' + result.message);
                }
            } else {
                const result = await clienteResponse.json();
                alert('Erro no cadastro do cliente: ' + result.message);
            }
        } catch (error) {
            console.error('Erro ao criar cliente/usuário:', error);
            alert('Erro ao se conectar com a API.');
        }
    }

    const cadastrarButton = document.getElementById('cadastrar-button');
    cadastrarButton.addEventListener('click', async function (event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const nascimento = document.getElementById('data-nascimento').value;
        const cep = document.getElementById('cep').value;
        const logradouro = document.getElementById('logradouro').value;
        const numero = document.getElementById('numero').value;
        const bairro = document.getElementById('bairro').value;
        const cidadeUf = document.getElementById('cidade-uf').value;
        const complemento = document.getElementById('complemento').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('usuario').value;
        const senha = document.getElementById('senha').value;
        const cpfCnpj = tipoCliente === 1 ? document.getElementById('cpf').value : document.getElementById('cnpj').value;

        const clienteData = {
            tipoCliente: tipoCliente,
            nome: nome,
            nascimento: nascimento,
            cep: cep,
            logradouro: logradouro,
            numero: numero,
            bairro: bairro,
            cidadeEstado: cidadeUf,
            complemento: complemento,
            cpf: tipoCliente === 1 ? cpfCnpj : null,
            cnpj: tipoCliente === 2 ? cpfCnpj : null
        };

        const isExistente = await verificarExistencia(cpfCnpj, username);
        if (!isExistente) return;

        await criarUsuarioCliente(clienteData, username, email, senha);
    });
});
