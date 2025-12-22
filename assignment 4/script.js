document.addEventListener('DOMContentLoaded', () => {
    // Service price mapping is handled via data attributes on buttons for simplicity

    const cartItemsContainer = document.getElementById('cart-items-container');
    const totalPriceElement = document.getElementById('total-price');
    const bookingForm = document.getElementById('booking-form');

    let cart = [];

    // Add Item Event Listeners
    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const name = this.getAttribute('data-name');
            const price = parseFloat(this.getAttribute('data-price'));

            addToCart(id, name, price);

            // Toggle buttons
            this.style.display = 'none';
            this.parentElement.querySelector('.remove-btn').style.display = 'inline-flex';
        });
    });

    // Remove Item Event Listeners
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const id = this.getAttribute('data-id');
            const price = parseFloat(this.getAttribute('data-price'));

            removeFromCart(id, price);

            // Toggle buttons
            this.style.display = 'none';
            this.parentElement.querySelector('.add-btn').style.display = 'inline-flex';
        });
    });

    function addToCart(id, name, price) {
        cart.push({ id, name, price });
        renderCart();
    }

    function removeFromCart(id, price) {
        cart = cart.filter(item => item.id !== id);
        renderCart();
    }

    function renderCart() {
        console.log("Rendering cart:", cart);
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'cart-item-row';
            row.innerHTML = `
                <span>${index + 1}</span>
                <span style="flex:1; margin-left: 20px;">${item.name}</span>
                <span>₹${item.price.toFixed(2)}</span>
            `;
            cartItemsContainer.appendChild(row);
            total += item.price;
        });

        totalPriceElement.textContent = `₹${total.toFixed(2)}`;
    }

    // Form Submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (cart.length === 0) {
                alert('Please add at least one service to your cart.');
                return;
            }
            alert('Booking Submitted Successfully!');
            // Reset form and cart (optional)
            // bookingForm.reset();
            // location.reload();
        });
    }
});
