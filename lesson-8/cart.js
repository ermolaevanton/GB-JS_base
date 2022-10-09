'use strict';

const cards = document.querySelectorAll('.featuredItems');
const cart = document.querySelector('.cartIconWrap');
const cartMenu = document.querySelector('.cartMenu');
const numCart = document.querySelector('.cartIconWrap__num');
const totalPrice = document.querySelector('.totalPrice');
const divTotalPrice = document.querySelector('.cartMenu__total');
const cartContent = {};

cart.addEventListener('click', () => {
    cartMenu.classList.toggle('hidden');
});

cards.forEach(el => {
    el.addEventListener('click', event => {
        if (!event.target.closest('.addToCart')) {
            return;
        }
        const item = event.target.closest('.featuredItem');
        const id = +item.dataset.id;
        const name = item.dataset.name;
        const price = +item.dataset.price;
        addToCart(id, name, price);
    })
});

function addToCart(id, name, price) {
    if (!(id in cartContent)) {
        cartContent[id] = { id, name, price, count: 0 };
    }
    cartContent[id].count++;
    numCart.textContent = getTotalCount().toString();
    totalPrice.textContent = getTotalPrice().toFixed(2);
    renderProductInCart(id);
}

function getTotalCount() {
    return Object.values(cartContent)
        .reduce((acc, product) => acc + product.count, 0);
}

function getTotalPrice() {
    return Object.values(cartContent)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInCart(id) {
    const cartMenuTopEl = cartMenu
        .querySelector(`.cartMenu__top[data-productId="${id}"]`);
    if (!cartMenuTopEl) {
        renderNewProductInCart(id);
        return;
    }
    cartMenuTopEl.querySelector('.cartMenu__Count').textContent =
        cartContent[id].count;
    cartMenuTopEl.querySelector('.cartMenu__Total').textContent =
        cartContent[id].count * cartContent[id].price;
}

function renderNewProductInCart(productId) {
    const productRow = `
    <div class="cartMenu__top" data-productId="${productId}">
        <div class="cartMenu__Name">${cartContent[productId].name}</div>
        <div>
            <span class="cartMenu__Count">${cartContent[productId].count}</span>.шт
        </div>
        <div class="cartMenu__Price">$${cartContent[productId].price}</div>
        <div>
            $<span class="cartMenu__Total">${(cartContent[productId].price * cartContent[productId].count)}</span >
        </div>
    </div >
    `
    divTotalPrice.insertAdjacentHTML('beforebegin', productRow);
}
