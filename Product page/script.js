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
            qty: 1  // ⭐ ADDED QUANTITY
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

    // ----- DELETE ITEM -----
    document.querySelectorAll(".delete-items").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart.splice(index, 1);

            localStorage.setItem("cart", JSON.stringify(cart));

            // disable container-2 if cart is empty
            if (cart.length === 0) {
                const container2 = document.querySelector(".container-2");
                container2.style.pointerEvents = "none";
                container2.style.opacity = "0.5";
            }
            loadCart();
        });
    });


    // ----- INCREASE QTY -----
    document.querySelectorAll(".inc-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            cart[index].qty++;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // ----- DECREASE QTY -----
    document.querySelectorAll(".dec-btn").forEach((btn, index) => {
        btn.addEventListener("click", () => {
            if (cart[index].qty > 1) {
                cart[index].qty--;
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        });
    });

    // ----- ORDER SUMMARY -----
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


// Load cart on page refresh
loadCart();

// ---------------- SHOW CART PAGE ---------------------

document.getElementById("cart-btn").addEventListener("click", () => {
    document.querySelector(".cart-container").style.display = "block";
    document.querySelector(".products").style.display = "none";
    document.querySelector(".starting-title").style.display = "none";
    document.querySelector('#products-page-1').style.display = "none"
    document.querySelector('#products-page-2').style.display = "none"
    document.querySelector('#products-page-3').style.display = "none"
    document.querySelector('#products-page-4').style.display = "none"
    window.scrollTo(0, 0);
});


// Starting Title Page //
const selectmenu = document.querySelector('.select-menu');

const productspage1 = document.querySelector('#products-page-1');
const productspage2 = document.querySelector('#products-page-2');
const productspage3 = document.querySelector('#products-page-3');
const productspage4 = document.querySelector('#products-page-4');

// hide all first
productspage1.style.display = "none";
productspage2.style.display = "none";
productspage3.style.display = "none";
productspage4.style.display = "none";

selectmenu.addEventListener('click', () => {

    // hide all every time
    productspage1.style.display = "none";
    productspage2.style.display = "none";
    productspage3.style.display = "none";
    productspage4.style.display = "none";

    if (selectmenu.value === "watches") {
        productspage1.style.display = "block";
    }
    else if (selectmenu.value === "shoes") {
        productspage2.style.display = "block";
    }
    else if (selectmenu.value === "belts") {
        productspage3.style.display = "block";
    }
    else if (selectmenu.value === "eyeglasses") {
        productspage4.style.display = "block";
    }

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

placeorder.addEventListener('click',()=>{
    ordersucess.style.display="block"
    placeorder.style.display="none"
})

continueshop.addEventListener('click', () => {

    // Hide order success & place order
    ordersucess.style.display = "none";
    placeorder.style.display = "none";

    // Hide cart & shipping pages
    document.querySelector(".cart-container").style.display = "none";
    shipcontainer.style.display = "none";

    // Show products page
    document.querySelector(".products").style.display = "block";
    document.querySelector(".starting-title").style.display = "block";

    // Show first products section (shopping page)
    productspage1.style.display = "block";
    productspage2.style.display = "none";
    productspage3.style.display = "none";
    productspage4.style.display = "none";

    // Scroll to top (shopping page)
    window.scrollTo({ top: 0, behavior: "smooth" });
});













