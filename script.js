document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const registerMessage = document.getElementById('register-message');
    const errorMessage = document.getElementById('error-message');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;

            if (localStorage.getItem(username)) {
                registerMessage.textContent = 'Username sudah digunakan.';
            } else {
                localStorage.setItem(username, password);
                registerMessage.textContent = 'Registrasi berhasil. Silakan login.';
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const storedPassword = localStorage.getItem(username);

            if (storedPassword && storedPassword === password) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentUser', username);
                window.location.href = 'main.html';
            } else {
                errorMessage.textContent = 'Username atau password salah.';
            }
        });
    }

    const isLoggedIn = localStorage.getItem('loggedIn');
    if (window.location.pathname.includes('main.html') && !isLoggedIn) {
        window.location.href = 'index.html';
    }

    const cards = document.querySelectorAll('.card');
    const paymentForm = document.getElementById('payment-form');
    const cardsContainer = document.getElementById('cards-container');

    cards.forEach(card => {
        card.querySelector('.buy-btn').addEventListener('click', () => {
            const itemId = card.getAttribute('data-id');
            const itemName = card.getAttribute('data-name');
            const itemPrice = card.getAttribute('data-price');
            const itemImg = card.getAttribute('data-img');

            cardsContainer.style.display = 'none';
            paymentForm.style.display = 'block';

            document.getElementById('form-img').src = itemImg;
            document.getElementById('form-name').innerText = `Nama Barang: ${itemName}`;
            document.getElementById('form-price').innerText = `Harga: Rp${itemPrice}`;
        });
    });

    document.getElementById('back-btn').addEventListener('click', () => {
        paymentForm.style.display = 'none';
        cardsContainer.style.display = 'flex';
    });
});
