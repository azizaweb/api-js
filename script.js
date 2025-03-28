document.addEventListener('DOMContentLoaded', () => {
const userCardsContainer = document.getElementById('userCards');
    
const totalPriceContainer = document.createElement('div');
totalPriceContainer.id = "totalPrice";
totalPriceContainer.innerHTML = "<h3>Общий счет: $0</h3>";
document.body.appendChild(totalPriceContainer);

let totalAmount = 0; 

fetch('https://fakestoreapi.com/products?limit=10')
    .then(response => response.json())
    .then(data => {
        displayUsers(data);
    })


function displayUsers(users) {
    userCardsContainer.innerHTML = ''; 
    users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${user.image}" alt="${user.title}">
            <h2>${user.title}</h2>
            <p>${user.description.substring(0, 50)}...</p>
            <div class="price-button">
                <span class="price">$${user.price}</span>
                <button class="buy-button" data-price="${user.price}">Sotib olish</button>
            </div>
        `;
        userCardsContainer.appendChild(card);
    });
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', function () {
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(price);
        });
    });
}
function addToCart(price) {
    totalAmount += price;
    totalPriceContainer.innerHTML = `<h3>Общий счет: $${totalAmount.toFixed(2)}</h3>`;
}
});