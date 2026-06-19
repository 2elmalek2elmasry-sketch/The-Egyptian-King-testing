let cart = JSON.parse(localStorage.getItem('egyptian_king_cart')) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateGlobalCounterUI();

    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-product-name');
            const price = parseInt(btn.getAttribute('data-base-price'), 10);
            const image = btn.getAttribute('data-product-image');
            
            executeAddToCart(name, price, image);
        });
    });
});

function executeAddToCart(name, price, image) {
    const matchedIndex = cart.findIndex(item => item.name === name);

    if (matchedIndex > -1) {
        cart[matchedIndex].quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            image: image,
            quantity: 1
        });
    }

    syncCartStorage();
    alert(`${name} added to your bag!`);
}

function syncCartStorage() {
    localStorage.setItem('egyptian_king_cart', JSON.stringify(cart));
    updateGlobalCounterUI();
}

function updateGlobalCounterUI() {
    const counterDisplay = document.getElementById('global-cart-count');
    if (counterDisplay) {
        const totalItems = cart.reduce((acc, current) => acc + current.quantity, 0);
        counterDisplay.innerText = totalItems;
    }
}
