
(function () {
    emailjs.init("kdRWSnPKi2B-hKc4_");
})();

const servicesData = [
    { id: 1, name: 'Dry Cleaning', price: 200.00, icon: 'fa-shirt', color: '#ef4444' },          // Red
    { id: 2, name: 'Wash & Fold', price: 100.00, icon: 'fa-jug-detergent', color: '#9333ea' },   // Purple
    { id: 3, name: 'Ironing', price: 30.00, icon: 'fa-temperature-arrow-up', color: '#eab308' }, // Yellow
    { id: 4, name: 'Stain Removal', price: 500.00, icon: 'fa-wand-magic-sparkles', color: '#ec4899' }, // Pink
    { id: 5, name: 'Leather & Suede', price: 999.00, icon: 'fa-vest', color: '#a16207' },        // Brown
    { id: 6, name: 'Wedding Dress', price: 2800.00, icon: 'fa-person-dress', color: '#4b5563' }  // Grey
];


let cart = [];

const serviceListContainer = document.getElementById('service-list-container');
const cartTable = document.getElementById('cart-table');
const cartBody = document.getElementById('cart-body');
const emptyState = document.getElementById('empty-cart-state');
const totalPriceEl = document.getElementById('total-price');
const toastContainer = document.getElementById('toast-container');

function init() {
    renderServices();
    renderCart();
}

function renderServices() {
    serviceListContainer.innerHTML = '';

    servicesData.forEach(service => {
        const isInCart = cart.some(item => item.id === service.id);

        const btnClass = isInCart ? 'btn-add btn-remove' : 'btn-add';
        const btnText = isInCart ? 'Remove Item' : 'Add Item';
        const btnIcon = isInCart ? '<i class="fa-solid fa-trash"></i>' : '<i class="fa-solid fa-circle-plus"></i>';

        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-item';
        serviceCard.innerHTML = `
            <div class="service-info">
                <div class="service-icon">
                    <i class="fa-solid ${service.icon}" style="color: ${service.color};"></i>
                </div>
                <div class="service-details">
                    <h4>${service.name} 
                        <span style="color: #d1d5db; margin: 0 5px;">•</span> 
                        <span style="color: #2563eb;">₹${service.price.toFixed(2)}</span>
                    </h4>
                </div>
            </div>
            <button class="${btnClass}" onclick="toggleCart(${service.id})">
                ${btnText} ${btnIcon}
            </button>
        `;
        serviceListContainer.appendChild(serviceCard);
    });
}


function toggleCart(id) {
    const service = servicesData.find(s => s.id === id);
    const index = cart.findIndex(item => item.id === id);

    if (index === -1) {
        cart.push(service);
    } else {
        cart.splice(index, 1);
    }

    renderServices();
    renderCart();
}


function renderCart() {
    const isEmpty = cart.length === 0;


    emptyState.style.display = isEmpty ? 'block' : 'none';
    cartTable.style.display = isEmpty ? 'none' : 'table';

    if (isEmpty) {
        totalPriceEl.innerText = '₹ 0';
        return;
    }


    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>₹${item.price.toFixed(2)}</td>
        `;
        cartBody.appendChild(row);
    });

    totalPriceEl.innerText = `₹ ${total.toFixed(2)}`;
}


function handleBooking(e) {
    e.preventDefault();

    if (cart.length === 0) {
        showToast("Please add items to the cart first!", "error");
        return;
    }


    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Processing...";
    submitBtn.disabled = true;


    const form = e.target;

    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const totalPrice = totalPriceEl.innerText;


    const templateParams = {
        to_name: name,
        to_email: email,
        phone: phone,
        message: `You have booked ${cart.length} services. Total Amount: ${totalPrice}`,
    };


    emailjs.send('service_t0fsti9', 'template_djoiyp6', templateParams)
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            showToast("Booking Successful! We will contact you soon.", "success");

            
            form.reset();
            cart = [];
            renderServices();
            renderCart();
        }, function (error) {
            console.error('FAILED...', error);
            showToast("Failed to book service. Please try again.", "error");
        })
        .finally(() => {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        });
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';


    if (type === 'error') {
        toast.style.backgroundColor = '#ef4444'; // Red
    } else {
        toast.style.backgroundColor = '#22c55e'; // Green
    }

    const iconClass = type === 'error' ? 'fa-circle-exclamation' : 'fa-check-circle';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> ${message}`;
    toastContainer.appendChild(toast);

    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', init);
