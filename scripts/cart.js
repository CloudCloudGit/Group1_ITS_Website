let cart = JSON.parse(localStorage.getItem('bigBrewCart')) || [];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = {
            name: button.getAttribute('data-name'),
            price: button.getAttribute('data-price'),
            id: Date.now()
        };

        cart.push(item);
        localStorage.setItem('bigBrewCart', JSON.stringify(cart));
        alert(`${item.name} added to cart!`);
    });
});

