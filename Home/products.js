const container = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");

let allProducts = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count
function updateCartCount() {
    cartCount.innerText = cart.length;
}
updateCartCount();

// Fetch products
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        allProducts = data;
        displayProducts(allProducts);
    });

// Display products
function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="product-card">
                <img src="${product.image}">
                <h4>${product.title}</h4>
                <p class="desc">${product.description.substring(0, 60)}...</p>
                <p class="price">$${product.price}</p>

                <div class="card-buttons">
                    <button class="details-btn" onclick="showDetails(${product.id})">
                        Details
                    </button>
                    <button class="cart-btn" onclick="addToCart(${product.id})">
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

// Add to cart
function addToCart(id) {
    const product = allProducts.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart ✅");
}

// Details (simple demo – can redirect later)
function showDetails(id) {
    const product = allProducts.find(p => p.id === id);
    alert(
        `Title: ${product.title}\n\nPrice: $${product.price}\n\n${product.description}`
    );
}
