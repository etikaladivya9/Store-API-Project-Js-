/************ CART HELPERS ************/
function getCart(){
return JSON.parse(localStorage.getItem("cart"))||[]
}
function saveCart(cart){
localStorage.setItem("cart",JSON.stringify(cart))
}
function updateCartCount(){
const el=document.getElementById("cart-count")
if(el)el.textContent=getCart().length
}
document.addEventListener("DOMContentLoaded",updateCartCount)

/************ NAVIGATION ************/
function goHome(){location.href="Home.html"}
function goLogin(){location.href="login.html"}
function goRegister(){location.href="register.html"}
function goCart(){location.href="cart.html"}

/************ PRODUCTS ************/
const productContainer=document.getElementById("product-container")
let allProducts=[]

if(productContainer){
fetch("https://fakestoreapi.com/products")
.then(r=>r.json())
.then(d=>{allProducts=d;renderProducts(d)})
}

function renderProducts(list){
productContainer.innerHTML=""
list.forEach(p=>{
productContainer.innerHTML+=`
<div class="product-card">
<img src="${p.image}">
<h4>${p.title}</h4>
<p>${p.description.substring(0,70)}...</p>
<p class="price">$${p.price}</p>
<div class="card-buttons">
<button onclick="addToCart(${p.id})">Add to Cart</button>
</div>
</div>`
})
}

function filterProducts(cat){
cat==="all"?renderProducts(allProducts):
renderProducts(allProducts.filter(p=>p.category===cat))
}

function addToCart(id){
const cart=getCart()
const p=allProducts.find(i=>i.id===id)
cart.push(p)
saveCart(cart)
updateCartCount()
goCart()
}

/************ CART ************/
const cartItems=document.getElementById("cart-items")
const emptyBox=document.getElementById("empty-cart")
const itemsPrice=document.getElementById("items-price")
const totalPrice=document.getElementById("total-price")

if(cartItems)renderCart()

function renderCart(){
const cart=getCart()
cartItems.innerHTML=""
if(cart.length===0){
emptyBox.style.display="block"
itemsPrice.textContent="$0"
totalPrice.textContent="$0"
return
}
emptyBox.style.display="none"

const map={}
cart.forEach(i=>{
map[i.id]?map[i.id].qty++:map[i.id]={...i,qty:1}
})

let total=0
Object.values(map).forEach(i=>{
total+=i.price*i.qty
cartItems.innerHTML+=`
<div class="cart-item">
<img src="${i.image}">
<div>
<b>${i.title}</b>
<p>$${i.price}</p>
</div>
<div class="qty">
<button onclick="changeQty(${i.id},-1)">-</button>
<span>${i.qty}</span>
<button onclick="changeQty(${i.id},1)">+</button>
</div>
</div>`
})

itemsPrice.textContent=`$${total.toFixed(2)}`
totalPrice.textContent=`$${total.toFixed(2)}`
updateCartCount()
}

function changeQty(id,val){
let cart=getCart()
if(val===1){
cart.push(cart.find(p=>p.id===id))
}else{
const i=cart.findIndex(p=>p.id===id)
cart.splice(i,1)
}
saveCart(cart)
renderCart()
}
