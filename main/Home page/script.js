var main = document.querySelector('#home-page-1');
var container = document.querySelector('.cart-container');
var cartBtn = document.getElementById('cart-btn');
var endpage = document.querySelector('.sec-3')

// SHOW CART PAGE
cartBtn.addEventListener('click', () => {
    main.style.display = "none";       // hide home
    container.style.display = "block"; // show cart
    endpage.style.display = "none"
    window.scrollTo(0, 0);
});


// ---------------- FILTER BUTTONS ---------------------

const filterButtons = document.querySelectorAll(".btn-1");
const products = document.querySelectorAll(".image");

// Clean price text: ₹ 46,820.14 → 46820
function getPrice(priceText) {
    return Number(priceText.replace("₹", "").replace(/,/g, "").trim());
}

// Filtering
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const txt = btn.innerText;

        if (txt === "All") {
            products.forEach(p => p.style.display = "block");
        } else {
            const limit = Number(txt.replace("₹", "").replace(/,/g, "").trim());
            products.forEach(p => {
                const price = getPrice(p.querySelector(".detail-two").innerText);
                p.style.display = (price <= limit) ? "block" : "none";
            });
        }
    });
});

// ---------------- ADD TO CART -------------------------

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        const product = products[index];

        const item = {
            title: product.querySelector(".detail-three").innerText,
            brand: product.querySelector(".detail-one").innerText,
            price: product.querySelector(".detail-two").innerText,
            img: product.querySelector("img").src,
            qty: 1
        };

        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart");
        loadCart();
    });
});

// ---------------- CART DISPLAY -------------------------

function loadCart() {
    const cartContainer = document.querySelector(".container-1");

    if (cart.length === 0) {
        cartContainer.innerHTML = "Your Cart is Empty";
        return;
    }

    let html = "";
    let total = 0;

    cart.forEach(item => {
        const priceNum = Number(item.price.replace("₹", "").replace(/,/g, "").trim());
        total += priceNum * item.qty;

        html += `
            <div class="item-container" style="display:flex; gap:20px; margin:20px 0; padding:15px; background:#fff; border-radius:10px;">
                <img src="${item.img}" width="120" style="border-radius:8px;">
                <div>
                    <h3>${item.brand}</h3>
                    <p>${item.title}</p>
                    <p><strong>${item.price}</strong></p>

                    <button class="dec-btn">-</button> 
                    <span>${item.qty}</span>
                    <button class="inc-btn">+</button>

                    <button class="delete-items">Delete</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = html;

    // DELETE ITEM
    document.querySelectorAll(".delete-items").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // INCREASE QTY
    document.querySelectorAll(".inc-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart[index].qty++;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // DECREASE QTY
    document.querySelectorAll(".dec-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (cart[index].qty > 1) {
                cart[index].qty--;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // ORDER SUMMARY
    document.querySelector(".container-2").innerHTML = `
        <p>Order Summary : ₹${total.toLocaleString()}</p>
        <p>Shipping : ₹150</p>
        <p>Tax : ₹0</p>
        <hr>
        <p><strong>Total : ₹${(total + 150).toLocaleString()}</strong></p>
        <div class="proceed-btn">
                    <button id="check-btn" ${cart.length === 0 ? "disabled" : ""}>
                        Checkout
                    </button>
    `;
}

// Load cart on refresh
loadCart();


// ---------------- SHOW CART PAGE ---------------------

document.getElementById("cart-btn").addEventListener("click", () => {
    document.querySelector(".cart-container").style.display = "block"; // show cart
    document.getElementById("home-page-1").style.display = "none";     // hide home section
    window.scrollTo(0, 0);
});




// -------------Shipping Page--------------- //

const shipcontainer = document.querySelector('.shipping-container');
const container1 = document.querySelector('.container-1');

shipcontainer.style.display = "none";

document.addEventListener('click', (e) => {

    if (!e.target.matches('#check-btn')) return;

    e.preventDefault();

    if (cart.length === 0) {
        alert('Please insert items');
        shipcontainer.style.display = "none";
        container1.style.display = "block";
        return;
    }

    // ✅ Cart has items
    shipcontainer.style.display = "block";
    container1.style.display = "none";
});


// Place Order //

var placeorder = document.querySelector('#place-order');
var cashdelivery = document.querySelector('#cash-on-delivery');
var continueshop = document.querySelector('#contshop-btn');
var ordersucess = document.querySelector('.order-success');
var container2 = document.querySelector('.container-2');

placeorder.style.display = "none"
ordersucess.style.display = "none"

cashdelivery.addEventListener('click', () => {
    placeorder.style.display = "block"
    shipcontainer.style.display = "none";
    container2.style.display = "none"
})

placeorder.addEventListener('click', () => {
    ordersucess.style.display = "block"
    placeorder.style.display = "none"
})

continueshop.addEventListener('click', () => {
    window.location.href = "../Product page/index.html";

});



