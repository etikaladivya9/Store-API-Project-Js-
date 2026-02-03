/***********************
 CART + NAVBAR LOGIC
************************/

// Always get cart safely
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Update cart count everywhere
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Run cart count on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

// Navigation helpers
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
 PRODUCTS PAGE LOGIC
************************/

const container = document.getElementById("product-container");
let allProducts = [];

// Fetch products ONLY if container exists
if (container) {
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            allProducts = data;
            displayProducts(allProducts);
        })
        .catch(err => console.error("API Error:", err));
}

// Display products
function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        const shortDesc =
            product.description.length > 70
                ? product.description.substring(0, 70) + "..."
                : product.description;

        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.title}">
                <h4>${product.title}</h4>
                <p>${shortDesc}</p>
                <p><b>$${product.price}</b></p>

                <div class="card-buttons">
                    <button onclick="showDetails(${product.id})">
                        Details
                    </button>
                    <button onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
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
            product => product.category === category
        );
        displayProducts(filtered);
    }
}

// Add to cart (FINAL FIX)
function addToCart(productId) {
    const cart = getCart();
    const product = allProducts.find(p => p.id === productId);

    if (!product) return;

    cart.push(product);
    saveCart(cart);

    updateCartCount();   // 🔥 THIS WAS THE MISSING PIECE
    alert("Product added to cart ✅");
}

// Details (simple)
function showDetails(id) {
    const product = allProducts.find(p => p.id === id);
    if (!product) return;

    alert(
        `Title: ${product.title}\n\nPrice: $${product.price}\n\n${product.description}`
    );
}
