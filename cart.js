// =========================================================
// R&D COMMERCE — CART SYSTEM
// =========================================================


// =========================================================
// SAFE STORAGE
// =========================================================

function getCartData() {

    try {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            );


        return Array.isArray(savedCart)
            ? savedCart
            : [];

    } catch (error) {

        return [];

    }

}


function getSavedDiscount() {

    const saved =
        Number(
            localStorage.getItem(
                "discountAmount"
            )
        );


    return Number.isFinite(saved) &&
        saved > 0
        ? saved
        : 0;

}


// =========================================================
// CART DATA
// =========================================================

let cart =
    getCartData();


let discountAmount =
    getSavedDiscount();


// =========================================================
// ELEMENTS
// =========================================================

const box =
    document.getElementById(
        "cart-items"
    );


const total =
    document.getElementById(
        "total"
    );


const discount =
    document.getElementById(
        "discount"
    );


const finalTotal =
    document.getElementById(
        "finalTotal"
    );


// =========================================================
// SAVE DISCOUNT
// =========================================================

function saveDiscount() {

    localStorage.setItem(
        "discountAmount",
        String(discountAmount)
    );

}


// =========================================================
// DISPLAY CART
// =========================================================

function displayCart() {

    if (!box) {
        return;
    }


    box.innerHTML = "";


    let subtotal = 0;


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cart.length === 0) {

        discountAmount = 0;

        saveDiscount();


        box.innerHTML = `

            <div class="empty-cart">

                <h2>
                    Your cart is empty 🛒
                </h2>

                <p>
                    Add some products to
                    continue shopping.
                </p>


                <a href="shop.html">

                    <button type="button">
                        Continue Shopping
                    </button>

                </a>

            </div>

        `;


        updateTotals(
            0,
            0
        );


        updateCartCount();

        return;

    }


    // =====================================================
    // CART ITEMS
    // =====================================================

    cart.forEach(
        function (item, index) {

            const price =
                Number(item.price) || 0;


            subtotal += price;


            box.innerHTML += `

                <div class="cart-card">


                    <img
                        src="${item.image || ""}"
                        alt="${item.name || "Product"}"
                    >


                    <div>


                        <h3>
                            ${item.name || "Product"}
                        </h3>


                        <p>
                            ₹${price.toLocaleString("en-IN")}
                        </p>


                        <div class="cart-actions">


                            <button
                                type="button"
                                onclick="removeItem(${index})"
                            >
                                🗑️ Remove
                            </button>


                        </div>


                    </div>


                </div>

            `;

        }
    );


    // =====================================================
    // SAFETY CHECK FOR DISCOUNT
    // =====================================================

    if (discountAmount > subtotal) {

        discountAmount =
            subtotal;

        saveDiscount();

    }


    updateTotals(
        subtotal,
        discountAmount
    );


    updateCartCount();

}


// =========================================================
// UPDATE TOTALS
// =========================================================

function updateTotals(
    subtotal,
    discountValue
) {

    const finalAmount =
        Math.max(
            0,
            subtotal - discountValue
        );


    if (total) {

        total.innerText =
            subtotal.toLocaleString(
                "en-IN"
            );

    }


    if (discount) {

        discount.innerText =
            discountValue.toLocaleString(
                "en-IN"
            );

    }


    if (finalTotal) {

        finalTotal.innerText =
            finalAmount.toLocaleString(
                "en-IN"
            );

    }

}


// =========================================================
// REMOVE ITEM
// =========================================================

function removeItem(index) {

    if (
        index < 0 ||
        index >= cart.length
    ) {

        return;

    }


    const removedItem =
        cart[index];


    cart.splice(
        index,
        1
    );


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Recalculate subtotal

    let subtotal = 0;


    cart.forEach(
        function (item) {

            subtotal +=
                Number(item.price) || 0;

        }
    );


    // Prevent discount from
    // becoming larger than subtotal

    if (
        cart.length === 0
    ) {

        discountAmount = 0;

    }

    else if (
        discountAmount > subtotal
    ) {

        discountAmount =
            subtotal;

    }


    saveDiscount();


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(

            (removedItem.name ||
                "Product") +
            " removed from cart",

            "🗑️"

        );

    }


    displayCart();

}


// =========================================================
// APPLY COUPON
// =========================================================

function applyCoupon() {

    const couponInput =
        document.getElementById(
            "coupon"
        );


    if (!couponInput) {
        return;
    }


    const code =
        couponInput.value
            .trim()
            .toUpperCase();


    // =====================================================
    // CALCULATE SUBTOTAL
    // =====================================================

    let subtotal = 0;


    cart.forEach(
        function (item) {

            subtotal +=
                Number(item.price) || 0;

        }
    );


    // =====================================================
    // EMPTY CART
    // =====================================================

    if (cart.length === 0) {

        discountAmount = 0;

        saveDiscount();


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Your cart is empty",
                "🛒"
            );

        }


        displayCart();

        return;

    }


    // =====================================================
    // EMPTY COUPON
    // =====================================================

    if (!code) {

        discountAmount = 0;

        saveDiscount();


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Please enter a coupon code",
                "⚠️"
            );

        }


        displayCart();

        return;

    }


    // =====================================================
    // RISHU — 100% OFF
    // =====================================================

    if (code === "RISHU") {

        discountAmount =
            subtotal;


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "RISHU coupon applied — 100% OFF",
                "🎉"
            );

        }

    }


    // =====================================================
    // SAVE10 — 10% OFF
    // =====================================================

    else if (code === "SAVE10") {

        discountAmount =
            subtotal * 0.10;


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "10% discount applied",
                "🎉"
            );

        }

    }


    // =====================================================
    // WELCOME — ₹200 OFF
    // =====================================================

    else if (code === "WELCOME") {

        discountAmount =
            Math.min(
                200,
                subtotal
            );


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "₹200 discount applied",
                "🎉"
            );

        }

    }


    // =====================================================
    // INVALID COUPON
    // =====================================================

    else {

        discountAmount = 0;


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Invalid coupon code",
                "❌"
            );

        }

    }


    // Save for checkout

    saveDiscount();


    displayCart();

}


// =========================================================
// CART COUNT
// =========================================================

function updateCartCount() {

    const count =
        document.getElementById(
            "cart-count"
        );


    if (!count) {
        return;
    }


    count.innerText =
        cart.length;

}


// =========================================================
// INITIALIZE
// =========================================================

displayCart();

updateCartCount();
