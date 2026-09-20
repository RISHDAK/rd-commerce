// =========================================================
// R&D COMMERCE — WISHLIST SYSTEM
// =========================================================


// WISHLIST CONTAINER
const wishlistBox =
    document.getElementById("wishlist-items");


// SAFE LOAD WISHLIST
function getWishlist() {

    try {

        const savedWishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            );

        return Array.isArray(savedWishlist)
            ? savedWishlist
            : [];

    } catch (error) {

        return [];

    }

}



// SAVE WISHLIST
function saveWishlist(list) {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(list)
    );

}



// =========================================================
// DISPLAY WISHLIST
// =========================================================

function displayWishlist() {

    if (!wishlistBox) {
        return;
    }


    const wishlist =
        getWishlist();


    wishlistBox.innerHTML = "";


    // EMPTY WISHLIST
    if (wishlist.length === 0) {

        wishlistBox.innerHTML = `

            <div class="empty-products">

                <h2>
                    Your Wishlist is Empty ❤️
                </h2>

                <p>
                    Save products here and come back
                    whenever you're ready.
                </p>

                <a href="shop.html">

                    <button type="button">
                        Explore Products
                    </button>

                </a>

            </div>

        `;

        return;

    }



    // DISPLAY PRODUCTS
    wishlist.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className = "card";


        card.innerHTML = `

            <button
                type="button"
                class="wishlist-btn"
                onclick="removeFromWishlist(${product.id})"
                aria-label="Remove from wishlist"
                title="Remove from wishlist"
            >
                ❤️
            </button>


            <img
                src="${product.image || ""}"
                alt="${product.name || "Product"}"
                loading="lazy"
            >


            <h3>
                ${product.name || "Product"}
            </h3>


            <p>
                ${product.category || ""}
            </p>


            <div class="rating">
                ⭐ ${product.rating || 0}
                (${product.reviews || 0} Reviews)
            </div>


            <h4>
                ₹${Number(product.price || 0).toLocaleString("en-IN")}

                ${
                    product.oldPrice
                    ? `
                        <span class="old-price">
                            ₹${Number(product.oldPrice).toLocaleString("en-IN")}
                        </span>
                    `
                    : ""
                }

            </h4>


            <p class="delivery">
                🚚 ${product.delivery || "Free Delivery"}
            </p>


            <p class="stock">
                ${
                    product.stock
                    ? "✅ In Stock"
                    : "❌ Out of Stock"
                }
            </p>


            <a href="product.html?id=${product.id}">

                <button type="button">
                    View Product
                </button>

            </a>


            <button
                type="button"
                class="cart-btn"
                onclick="addWishlistToCart(${product.id})"
                ${!product.stock ? "disabled" : ""}
            >
                🛒 Add to Cart
            </button>

        `;


        wishlistBox.appendChild(card);

    });

}



// =========================================================
// REMOVE FROM WISHLIST
// =========================================================

function removeFromWishlist(id) {

    let wishlist =
        getWishlist();


    const product =
        wishlist.find(function(item) {

            return String(item.id) === String(id);

        });


    wishlist =
        wishlist.filter(function(item) {

            return String(item.id) !== String(id);

        });


    saveWishlist(wishlist);


    if (typeof showToast === "function") {

        showToast(
            product
                ? product.name + " removed from wishlist"
                : "Removed from wishlist",
            "🗑️"
        );

    }


    displayWishlist();

}



// =========================================================
// ADD WISHLIST PRODUCT TO CART
// =========================================================

function addWishlistToCart(id) {

    const wishlist =
        getWishlist();


    const product =
        wishlist.find(function(item) {

            return String(item.id) === String(id);

        });


    if (!product) {
        return;
    }


    if (!product.stock) {

        if (typeof showToast === "function") {

            showToast(
                "This product is out of stock",
                "❌"
            );

        }

        return;

    }


    let cart = [];


    try {

        const savedCart =
            JSON.parse(
                localStorage.getItem("cart")
            );

        if (Array.isArray(savedCart)) {

            cart = savedCart;

        }

    } catch (error) {

        cart = [];

    }


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Coupon is reset when cart changes
    localStorage.removeItem(
        "discountAmount"
    );


    if (typeof updateCartCount === "function") {

        updateCartCount();

    }


    if (typeof showToast === "function") {

        showToast(
            product.name + " added to cart",
            "🛒"
        );

    }

}



// =========================================================
// INITIALIZE
// =========================================================

displayWishlist();