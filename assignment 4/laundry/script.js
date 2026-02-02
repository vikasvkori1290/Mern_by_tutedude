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
            const fullName = document.getElementById('full-name').value.trim();
            const email = document.getElementById('email-id').value.trim();
            const phoneNumber = document.getElementById('phone-number').value.trim();
            const errorMessage = document.getElementById('booking-error-message');

            errorMessage.style.display = 'none';
            errorMessage.innerHTML = '';

            if (window.errorTimeout) {
                clearTimeout(window.errorTimeout);
            }

            const hideErrorAfterDelay = () => {
                window.errorTimeout = setTimeout(() => {
                    errorMessage.style.display = 'none';
                }, 3000);
            };

            if (fullName === '' || email === '' || phoneNumber === '') {
                errorMessage.innerHTML = '<i class="fas fa-info-circle"></i> Please fill out this field.';
                errorMessage.style.display = 'flex';
                hideErrorAfterDelay();
                return;
            }

            if (cart.length === 0) {
                errorMessage.innerHTML = '<i class="fas fa-info-circle"></i> Add the items to the cart to book';
                errorMessage.style.display = 'flex';
                errorMessage.classList.remove('success-message');
                hideErrorAfterDelay();
                return;
            }

            // Success Case
            errorMessage.innerHTML = '<i class="fas fa-info-circle"></i> Email Has been sent successfully';
            errorMessage.style.display = 'flex';
            errorMessage.classList.add('success-message');

            // Clear form fields
            document.getElementById('full-name').value = '';
            document.getElementById('email-id').value = '';
            document.getElementById('phone-number').value = '';

            // Clear Cart
            cart = [];
            renderCart();

            // Restore add buttons
            document.querySelectorAll('.remove-btn').forEach(btn => btn.style.display = 'none');
            document.querySelectorAll('.add-btn').forEach(btn => btn.style.display = 'inline-flex');

            // Auto-hide success message (optional, but consistent)
            hideErrorAfterDelay();
        });
    }
});