document.addEventListener("DOMContentLoaded", async function () {
    // Seleciona o elemento onde os produtos serão listados
    const productListElement = document.getElementById("product-list");

    try {
        // Fazendo a requisição à API para pegar os produtos
        const response = await fetch('https://localhost:7061/api/Produto'); // Aqui deve ser o endpoint correto da sua API
        const products = await response.json();

        // Verifica se a resposta da API é válida
        if (response.ok) {
            // Exibe os produtos na página
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product");

                // Cria os detalhes de cada produto
                productElement.innerHTML = `
                    <h3>${product.nome}</h3>
                    <p>Preço: R$ ${product.preco}</p>
                    <button class="addCarrinho" data-id="${product.idProduto}">Adicionar ao Carrinho</button>
                    
                `;
                productListElement.appendChild(productElement);
            });
        } else {
            console.error('Erro ao buscar produtos:', response.statusText);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
});
