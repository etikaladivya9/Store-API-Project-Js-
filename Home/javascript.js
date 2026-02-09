/*********************************
 GLOBAL CART HELPERS
*********************************/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = getCart().length;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);


/*********************************
 NAVIGATION
*********************************/
function goLogin() {
    window.location.href = "login.html";
}

function goRegister() {
    window.location.href = "register.html";
}

function goCart() {
    window.location.href = "cart.html";
}


/*********************************
 PRODUCTS PAGE
*********************************/
const productContainer = document.getElementById("product-container");
let allProducts = [];

if (productContainer) {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(err => console.error("API Error:", err));
}

function displayProducts(products) {
    productContainer.innerHTML = "";

    products.forEach(p => {
        const desc =
            p.description.length > 70
                ? p.description.substring(0, 70) + "..."
                : p.description;

        productContainer.innerHTML += `
            <div class="product-card">
                <img src="${p.image}" alt="${p.title}">
                <h4>${p.title}</h4>
                <p class="desc">${desc}</p>
             <hr/>
                <p class="price">$${p.price.toFixed(2)}</p>
                <hr/>
                <div class="card-buttons">
                    <button onclick="showDetails(${p.id})">Details</button>
                    <button onclick="addToCart(${p.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function filterProducts(category) {
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        displayProducts(allProducts.filter(p => p.category === category));
    }
}

function addToCart(id) {
    const cart = getCart();
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    saveCart(cart);
    updateCartCount();
    // alert("Product added to cart ✅");
}

function showDetails(id) {
    const p = allProducts.find(p => p.id === id);
    if (!p) return;

    alert(`${p.title}\n\nPrice: $${p.price}\n\n${p.description}`);
}


/*********************************
 CART PAGE
*********************************/
const cartItemsDiv = document.getElementById("cart-items");
const itemsPrice = document.getElementById("items-price");
const totalPrice = document.getElementById("total-price");

if (cartItemsDiv) renderCart();

function groupCartItems(cart) {
    const map = {};
    cart.forEach(item => {
        map[item.id] = map[item.id]
            ? { ...item, qty: map[item.id].qty + 1 }
            : { ...item, qty: 1 };
    });
    return Object.values(map);
}

function renderCart() {
    const cart = getCart();
    const grouped = groupCartItems(cart);
    let subtotal = 0;

    cartItemsDiv.innerHTML = "";

    if (grouped.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
        itemsPrice.textContent = "$0.00";
        totalPrice.textContent = "$0.00";
        return;
    }

    grouped.forEach(item => {
        subtotal += item.price * item.qty;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div>
                    <b>${item.title}</b>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="qty">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.qty}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    itemsPrice.textContent = `$${subtotal.toFixed(2)}`;
    totalPrice.textContent = `$${subtotal.toFixed(2)}`;
    updateCartCount();
}

function changeQty(id, change) {
    const cart = getCart();

    if (change === 1) {
        const product = cart.find(p => p.id === id);
        if (product) cart.push(product);
    } else {
        const index = cart.findIndex(p => p.id === id);
        if (index !== -1) cart.splice(index, 1);
    }

    saveCart(cart);
    renderCart();
}


/*********************************
 CONTACT PAGE
*********************************/
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        // alert("Message sent successfully ✅");
        contactForm.reset();
    });
}
