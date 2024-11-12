document.addEventListener("DOMContentLoaded", function () {
    const productListElement = document.getElementById("product-list");
    const totalValueElement = document.querySelector(".total-value"); // Elemento que exibe o valor total

    // Função para carregar os itens do carrinho do localStorage
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        return cart;
    }

    // Função para salvar os itens no carrinho para o localStorage
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Função para atualizar a quantidade de um produto no carrinho
    function updateQuantity(productId, quantity) {
        let cart = loadCart();
        const productIndex = cart.findIndex(item => item.idProduto === productId);
        if (productIndex > -1) {
            cart[productIndex].quantidade = quantity;
            saveCart(cart);
            renderCart();  // Atualiza a exibição dos itens
            updateTotal(); // Atualiza o valor total
        }
    }

    // Função para remover o item do carrinho
    function removeFromCart(productId) {
        let cart = loadCart();
        cart = cart.filter(item => item.idProduto !== productId); // Filtra o produto a ser removido
        saveCart(cart);
        renderCart(); // Atualiza a exibição dos itens
        updateTotal(); // Atualiza o valor total
    }

    // Função para calcular e atualizar o valor total
    function updateTotal() {
        const cart = loadCart();
        let total = 0;

        cart.forEach(product => {
            total += product.preco * product.quantidade; // Multiplica o preço pela quantidade
        });

        totalValueElement.textContent = `Total: R$ ${total.toFixed(2)}`; // Exibe o total com 2 casas decimais
    }

    // Função para renderizar os itens do carrinho
    function renderCart() {
        const cart = loadCart();
        productListElement.innerHTML = ''; // Limpa a lista de produtos antes de renderizar

        if (cart.length === 0) {
            productListElement.innerHTML = '<p>Seu carrinho está vazio.</p>';
            totalValueElement.textContent = 'Total: R$ 0.00'; // Caso o carrinho esteja vazio
            return;
        }

        cart.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("cart-item");

            // Cria os detalhes de cada produto no carrinho
            const quantityValue = product.quantidade || 1;
            productElement.innerHTML = `
                <h3>${product.nome}</h3>
                <p>Preço: R$ ${product.preco}</p>
                <div class="quantity-container">
                    <button class="decrease" data-id="${product.idProduto}">-</button>
                    <input type="number" class="quantity" value="${quantityValue}" data-id="${product.idProduto}" min="1" />
                    <button class="increase" data-id="${product.idProduto}">+</button>
                </div>
                <button class="remove" data-id="${product.idProduto}">Remover do Carrinho</button>
            `;

            // Botões para aumentar e diminuir a quantidade
            const decreaseButton = productElement.querySelector(".decrease");
            const increaseButton = productElement.querySelector(".increase");
            const quantityInput = productElement.querySelector(".quantity");

            // Funções de aumento e diminuição de quantidade
            decreaseButton.addEventListener("click", () => {
                let newQuantity = Math.max(1, product.quantidade - 1); // Quantidade mínima de 1
                updateQuantity(product.idProduto, newQuantity);
                quantityInput.value = newQuantity;
            });

            increaseButton.addEventListener("click", () => {
                let newQuantity = product.quantidade + 1; // Aumenta a quantidade
                updateQuantity(product.idProduto, newQuantity);
                quantityInput.value = newQuantity;
            });

            // Atualizar a quantidade quando o usuário digitar manualmente
            quantityInput.addEventListener("change", (event) => {
                const newQuantity = Math.max(1, parseInt(event.target.value)); // Garante que a quantidade seja pelo menos 1
                updateQuantity(product.idProduto, newQuantity);
            });

            // Adiciona o evento de clique ao botão de remoção
            const removeButton = productElement.querySelector(".remove");
            removeButton.addEventListener("click", function () {
                removeFromCart(product.idProduto); // Remove o produto do carrinho
            });

            productListElement.appendChild(productElement);
        });

        updateTotal(); // Atualiza o total sempre que o carrinho é renderizado
    }

    renderCart(); // Inicializa o carrinho

    // Função para finalizar a compra
    document.querySelector('.finalizar-compra').addEventListener('click', function () {
        const cart = loadCart();

        // Verifica se o carrinho está vazio
        if (cart.length === 0) {
            alert("Seu carrinho está vazio. Adicione produtos para finalizar a compra.");
        } else {
            // Exibe o modal com o resumo da compra
            const modal = document.getElementById("modalCheckout");
            const orderSummary = document.getElementById("order-summary");
            const totalPriceElement = document.getElementById("total-price");

            orderSummary.innerHTML = '';  // Limpa o conteúdo do resumo
            let totalPrice = 0;

            // Cria a lista de produtos e calcula o valor total
            cart.forEach(product => {
                const productSummary = document.createElement("div");
                const productTotal = product.preco * product.quantidade;
                totalPrice += productTotal;

                productSummary.innerHTML = `
                    <p>${product.nome} - Quantidade: ${product.quantidade} - Preço: R$ ${product.preco} - Total: R$ ${productTotal.toFixed(2)}</p>
                `;
                orderSummary.appendChild(productSummary);
            });

            // Exibe o valor total
            totalPriceElement.innerHTML = `<h3>Total: R$ ${totalPrice.toFixed(2)}</h3>`;

            // Mostrar o modal
            modal.style.display = "block";

            // Fechar o modal
            document.querySelector(".close").onclick = function () {
                modal.style.display = "none";
            };

            // Confirmar a compra
            document.getElementById("confirmar-compra").addEventListener("click", function () {
                alert("Compra confirmada!");
                // Aqui você pode realizar o envio do pedido para o servidor
                window.location.href = "/checkout";  // Redireciona para o checkout ou outra página
            });
        }
    });
});
