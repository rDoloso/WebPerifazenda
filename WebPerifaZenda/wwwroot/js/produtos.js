document.addEventListener("DOMContentLoaded", async function () {
    // Seleciona o elemento onde os produtos serão listados
    const productListElement = document.getElementById("product-list");

    // Função para carregar os itens do carrinho do localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart;
    }

    // Função para salvar os itens no carrinho para o localStorage
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Função para verificar se o produto está no carrinho
    function isInCart(productId) {
        const cart = loadCart();
        return cart.some(item => item.idProduto === productId);
    }

    // Função para adicionar ou remover produto do carrinho
    function toggleCartItem(product) {
        const cart = loadCart();
        const productIndex = cart.findIndex(item => item.idProduto === product.idProduto);

        if (productIndex > -1) {
            // Remove do carrinho se já estiver nele
            cart.splice(productIndex, 1);
            
        } else {
            // Adiciona ao carrinho se não estiver
            cart.push(product);
            
        }

        saveCart(cart);
    }

    try {
        // Fazendo a requisição à API para pegar os produtos
        const response = await fetch('https://localhost:7061/api/Produto'); // Endpoint correto da sua API
        const products = await response.json();

        // Verifica se a resposta da API é válida
        if (response.ok) {
            // Exibe os produtos na página
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");

                // Verifica se o produto já está no carrinho
                const inCart = isInCart(product.idProduto);

                // Cria os detalhes de cada produto
                productElement.innerHTML = `
                    <h3>${product.nome}</h3>
                    <p>Preço: R$ ${product.preco}</p>
                    <button class="addCarrinho" data-id="${product.idProduto}">
                        ${inCart ? "Remover do Carrinho" : "Adicionar ao Carrinho"}
                    </button>
                `;

                // Adiciona o evento de clique ao botão
                const button = productElement.querySelector(".addCarrinho");
                button.addEventListener("click", () => {
                    toggleCartItem(product);

                    // Atualiza o texto do botão após a ação
                    button.textContent = isInCart(product.idProduto) ? "Remover do Carrinho" : "Adicionar ao Carrinho";
                });

                productListElement.appendChild(productElement);
            });
        } else {
            console.error('Erro ao buscar produtos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
