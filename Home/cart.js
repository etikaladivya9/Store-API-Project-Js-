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
 CART DATA
************************/
const cartItemsDiv = document.getElementById("cart-items");
const itemsPrice = document.getElementById("items-price");
const totalPrice = document.getElementById("total-price");
const cartCountEl = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];


/***********************
 CART COUNT
************************/
function updateCartCount() {
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}


/***********************
 GROUP SAME PRODUCTS
************************/
function groupCartItems() {
    const map = {};

    cart.forEach(item => {
        if (map[item.id]) {
            map[item.id].qty += 1;
        } else {
            map[item.id] = { ...item, qty: 1 };
        }
    });

    return Object.values(map);
}


/***********************
 RENDER CART
************************/
function renderCart() {
    cartItemsDiv.innerHTML = "";
    const grouped = groupCartItems();
    let subtotal = 0;

    if (grouped.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    }

    grouped.forEach(item => {
        subtotal += item.price * item.qty;

        cartItemsDiv.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}">
                <div class="cart-info">
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
    totalPrice.textContent = `$${(subtotal + 30).toFixed(2)}`;

    updateCartCount();
}


/***********************
 CHANGE QUANTITY
************************/
function changeQty(id, change) {
    if (change === 1) {
        const product = cart.find(p => p.id === id);
        if (product) cart.push(product);
    } else {
        const index = cart.findIndex(p => p.id === id);
        if (index !== -1) cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}


/***********************
 INITIAL LOAD
************************/
renderCart();
