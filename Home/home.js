/***********************
 NAVIGATION
************************/
function goLogin() {
    window.location.href = "login.html";
}

function goRegister() {
    window.location.href = "register.html";
}

function goCart() {
    window.location.href = "cart.html";
}


/***********************
 CART LOGIC
************************/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const cart = getCart();
    const countEl = document.getElementById("cart-count");
    if (countEl) {
        countEl.textContent = cart.length;
    }
}

// Run on every page load
document.addEventListener("DOMContentLoaded", updateCartCount);


/***********************
 PRODUCTS LOGIC
************************/
const container = document.getElementById("product-container");
let allProducts = [];

if (container) {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
            updateCartCount();
        })
        .catch(err => console.error("API Error:", err));
}

// Display products
function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        const shortTitle =
            product.title.length > 20
                ? product.title.substring(0, 20) + "..."
                : product.title;

        const shortDesc =
            product.description.length > 60
                ? product.description.substring(0, 60) + "..."
                : product.description;

        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h4>${shortTitle}</h4>
                <p class="desc">${shortDesc}</p>
                <div class="price">$${product.price.toFixed(2)}</div>

                <div class="card-buttons">
                    <button onclick="showDetails(${product.id})">Details</button>
                    <button onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

// Filter products
function filterProducts(category) {
    if (category === "all") {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(
            p => p.category === category
        );
        displayProducts(filtered);
    }
}

// Add to cart
function addToCart(id) {
    const cart = getCart();
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("Product added to cart ✅");
}

// Details
function showDetails(id) {
    const p = allProducts.find(p => p.id === id);
    if (!p) return;

    alert(
        `${p.title}\n\nPrice: $${p.price}\n\n${p.description}`
    );
}
