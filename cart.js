// ===============================
// CART DATA
// ===============================

let discountAmount = 0;

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


const box =
    document.getElementById("cart-items");

const total =
    document.getElementById("total");

const discount =
    document.getElementById("discount");

const finalTotal =
    document.getElementById("finalTotal");


// ===============================
// DISPLAY CART
// ===============================

function displayCart(){

    if(!box){
        return;
    }

    box.innerHTML = "";

    let sum = 0;


    // EMPTY CART

    if(cart.length === 0){

        box.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty 🛒</h2>
                <p>Add some products to continue shopping.</p>

                <a href="shop.html">
                    <button>Continue Shopping</button>
                </a>
            </div>
        `;

        if(total){
            total.innerText = "0";
        }

        if(discount){
            discount.innerText = "0";
        }

        if(finalTotal){
            finalTotal.innerText = "0";
        }

        updateCartCount();

        return;
    }


    // CART ITEMS

    cart.forEach((item, index) => {

        sum += Number(item.price);


        box.innerHTML += `

            <div class="cart-card">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div>

                    <h3>
                        ${item.name}
                    </h3>


                    <p>
                        ₹${item.price}
                    </p>


                    <div class="cart-actions">

                        <button
                            onclick="removeItem(${index})"
                        >
                            🗑️ Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    // TOTAL

    let finalAmount =
        Math.max(0, sum - discountAmount);


    if(total){
        total.innerText =
            sum.toLocaleString();
    }


    if(discount){
        discount.innerText =
            discountAmount.toLocaleString();
    }


    if(finalTotal){
        finalTotal.innerText =
            finalAmount.toLocaleString();
    }


    updateCartCount();

}


// ===============================
// REMOVE ITEM
// ===============================

function removeItem(index){

    if(index < 0 || index >= cart.length){
        return;
    }


    const removedItem =
        cart[index];


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Recalculate discount

    if(cart.length === 0){

        discountAmount = 0;

    }


    if(typeof showToast === "function"){

        showToast(
            removedItem.name +
            " removed from cart",
            "🗑️"
        );

    }

localStorage.setItem(
    "discountAmount",
    discountAmount
);
    displayCart();

}


// ===============================
// APPLY COUPON
// ===============================

function applyCoupon(){

    const couponInput =
        document.getElementById("coupon");


    if(!couponInput){
        return;
    }


    const code =
        couponInput.value.trim().toUpperCase();


    let subtotal = 0;


    cart.forEach(item => {

        subtotal += Number(item.price);

    });


    if(cart.length === 0){

        discountAmount = 0;

        if(typeof showToast === "function"){

            showToast(
                "Your cart is empty",
                "🛒"
            );

        }
localStorage.setItem(
    "discountAmount",
    discountAmount
);
        displayCart();

        return;

    }


    // RISHU — 100% OFF

    if(code === "RISHU"){

        discountAmount = subtotal;


        if(typeof showToast === "function"){

            showToast(
                "RISHU coupon applied — 100% OFF",
                "🎉"
            );

        }

    }


    // SAVE10 — 10% OFF

    else if(code === "SAVE10"){

        discountAmount =
            subtotal * 0.10;


        if(typeof showToast === "function"){

            showToast(
                "10% discount applied",
                "🎉"
            );

        }

    }


    // WELCOME — ₹200 OFF

    else if(code === "WELCOME"){

        discountAmount =
            Math.min(200, subtotal);


        if(typeof showToast === "function"){

            showToast(
                "₹200 discount applied",
                "🎉"
            );

        }

    }


    // INVALID

    else{

        discountAmount = 0;


        if(typeof showToast === "function"){

            showToast(
                "Invalid coupon code",
                "❌"
            );

        }

    }


    displayCart();

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount(){

    const count =
        document.getElementById("cart-count");


    if(!count){
        return;
    }


    count.innerText =
        cart.length;

}


// ===============================
// INITIAL LOAD
// ===============================

displayCart();
updateCartCount();