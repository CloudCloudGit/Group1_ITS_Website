
const firebaseConfig = {
    apiKey: "AIzaSyA-_rkUvc-RxzYvRXuo7OwlqaRZ6pzKCTI",
    authDomain: "group-cafe-database.firebaseapp.com",
    projectId: "group-cafe-database",
    storageBucket: "group-cafe-database.firebasestorage.app",
    messagingSenderId: "296481585409",
    appId: "1:296481585409:web:692ca6a62bcf8d56484300"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.addEventListener('DOMContentLoaded', () => {

    const cartDisplay = document.getElementById('cart-items-display');
    const summarySection = document.getElementById('checkout-summary');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderBtn = document.getElementById('btn-place-order');

    // local storage collection
    let cart = JSON.parse(localStorage.getItem('bigBrewCart')) || [];

    function renderCart() {
        if (cart.length === 0) {
            cartDisplay.innerHTML = '<p style="color: white;">Your cart is empty.</p>';
            summarySection.style.display = 'none';
            return;
        }

        summarySection.style.display = 'block';
        let total = 0;

        cartDisplay.innerHTML = cart.map((item, index) => {
            total += parseFloat(item.price);
            return `
                <div class="d-flex justify-content-between align-items-center border-bottom py-3">
                    <div>
                        <h6 class="mb-0 fw-bold">${item.name}</h6>
                        <small style="color: white;">Price: ₱${item.price}</small>
                    </div>
                    <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Remove</button>
                </div>
            `;
        }).join('');

        totalPriceElement.innerText = `₱${total.toFixed(2)}`;
    }

    // remove button
    window.removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('bigBrewCart', JSON.stringify(cart));
        renderCart();
    };

    // send data to  database
    placeOrderBtn.addEventListener('click', async () => {
        let cart = JSON.parse(localStorage.getItem('bigBrewCart')) || [];
        if (cart.length === 0) return alert("Cart is empty!");

        const orderData = {
            items: cart,
            totalAmount: totalPriceElement.innerText,
            orderDate: firebase.firestore.Timestamp.now(), // Uses Firebase timestamp
            status: "Pending"
        };

        try {
            // This replaces the 'fetch' call
            await db.collection("orders").add(orderData);

            alert('Order placed successfully in Firebase!');
            localStorage.removeItem('bigBrewCart');
            window.location.reload(); // Refresh to show empty cart
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Error sending order to Firebase. Check console.');
        }
    });

    renderCart();
});