// /*************************
 //NAVIGATION FUNCTIONS
//**************************//
function goLogin() {
    window.location.href = "login.html";
}

function goRegister() {
    window.location.href = "register.html";
}

function goCart() {
    window.location.href = "cart.html";
}


/*************************
 CART COUNT LOGIC
**************************/
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    if (cartCount) {
        cartCount.innerText = getCart().length;
    }
}

// Run when page loads
document.addEventListener("DOMContentLoaded", updateCartCount);


/*************************
 OPTIONAL: USER CHECK
**************************/
const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedUser) {
    console.log("Logged in as:", loggedUser.name);
}

console.log("About page loaded successfully");
