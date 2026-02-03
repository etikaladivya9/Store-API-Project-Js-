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
 CART COUNT
************************/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.textContent = getCart().length;
    }
}

document.addEventListener("DOMContentLoaded", updateCartCount);


/***********************
 CONTACT FORM
************************/
document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Please fill all fields ❌");
        return;
    }

    alert("Message sent successfully ✅");
    this.reset();
});
