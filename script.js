// ===============================
// PAGE LOADER
// ===============================

window.addEventListener("load", function () {

    const loader =
        document.getElementById("pageLoader");

    if (loader) {

        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";

        setTimeout(function () {

            loader.style.display = "none";

        }, 300);

    }

});


// ===============================
// HOME PRODUCTS
// ===============================

const homeBox =
    document.getElementById("home-products");


// ===============================
// PRODUCT CARD
// ===============================

function productCard(product) {

    return `

        <div class="card">

            <button
                class="wishlist-btn"
                onclick="toggleWishlist(${product.id}, event)"
            >
                ❤️
            </button>


            <div class="discount-badge">
                -${product.discount}%
            </div>


            <img
                src="${product.image}"
                alt="${product.name}"
            >


            <h3>
                ${product.name}
            </h3>


            <p>
                ${product.category}
            </p>


            <div class="rating">
                ⭐ ${product.rating}
                (${product.reviews} Reviews)
            </div>


            <h4>
                ₹${product.price}

                <span class="old-price">
                    ₹${product.oldPrice}
                </span>
            </h4>


            <p class="delivery">
                🚚 ${product.delivery}
            </p>


            <p class="stock">
                ${
                    product.stock
                    ? "✅ In Stock"
                    : "❌ Out of Stock"
                }
            </p>


            <a href="product.html?id=${product.id}">

                <button>
                    View Product
                </button>

            </a>


            <button
                class="cart-btn"
                onclick="addToCart(${product.id})"
                ${!product.stock ? "disabled" : ""}
            >
                🛒 Add to Cart
            </button>

        </div>

    `;

}


// ===============================
// DISPLAY FEATURED PRODUCTS
// ===============================

function displayFeaturedProducts() {

    if (!homeBox) {
        return;
    }

    homeBox.innerHTML = "";


    products
        .slice(0, 3)
        .forEach(function (product) {

            homeBox.innerHTML +=
                productCard(product);

        });

}


// Run featured products

if (homeBox) {

    displayFeaturedProducts();

}


// ===============================
// HOME SEARCH
// ===============================

const homeSearch =
    document.getElementById("homeSearchInput");


if (homeSearch) {

    homeSearch.addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .trim()
                    .toLowerCase();


            if (!homeBox) {
                return;
            }


            const result =
                products.filter(function (product) {

                    return (
                        product.name
                            .toLowerCase()
                            .includes(value)
                        ||
                        product.category
                            .toLowerCase()
                            .includes(value)
                    );

                });


            homeBox.innerHTML = "";


            if (result.length === 0) {

                homeBox.innerHTML = `

                    <div class="empty-products">

                        <h3>
                            No products found
                        </h3>

                        <p>
                            Try searching for another product.
                        </p>

                    </div>

                `;

                return;
            }


            result.forEach(function (product) {

                homeBox.innerHTML +=
                    productCard(product);

            });

        }
    );

}


// ===============================
// CATEGORY FILTER
// ===============================

function showCategory(category) {

    if (!homeBox) {
        return;
    }


    let filteredProducts;


    // HOME CATEGORY
    // Show all products

    if (category === "Home") {

        filteredProducts = products;

    }

    // NORMAL CATEGORIES

    else {

        filteredProducts =
            products.filter(function (product) {

                return (
                    product.category === category
                );

            });

    }


    homeBox.innerHTML = "";


    // NO PRODUCTS

    if (filteredProducts.length === 0) {

        homeBox.innerHTML = `

            <div class="empty-products">

                <h3>
                    No products available
                </h3>

                <p>
                    More products are coming soon.
                </p>

            </div>

        `;

        return;
    }


    // DISPLAY PRODUCTS

    filteredProducts.forEach(function (product) {

        homeBox.innerHTML +=
            productCard(product);

    });


    // Scroll to products

    homeBox.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    const count =
        document.getElementById("cart-count");


    if (count) {

        count.innerText =
            cart.length;

    }

}


updateCartCount();


// ===============================
// TOAST SYSTEM
// ===============================

function showToast(message, icon = "✓") {

    const container =
        document.getElementById(
            "toast-container"
        );


    // If toast container doesn't exist,
    // use a simple alert fallback

    if (!container) {

        alert(
            icon + " " + message
        );

        return;

    }


    const toast =
        document.createElement("div");


    toast.className =
        "toast";


    toast.innerHTML = `

        <span class="toast-icon">
            ${icon}
        </span>

        <span class="toast-message">
            ${message}
        </span>

    `;


    container.appendChild(toast);


    setTimeout(function () {

        toast.classList.add("hide");

    }, 2500);


    setTimeout(function () {

        toast.remove();

    }, 3000);

}


// ===============================
// WISHLIST
// ===============================

function toggleWishlist(id, event) {

    if (event) {

        event.stopPropagation();

    }


    const product =
        products.find(function (item) {

            return item.id === id;

        });


    if (!product) {
        return;
    }


    let wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    const alreadyAdded =
        wishlist.some(function (item) {

            return item.id === id;

        });


    if (alreadyAdded) {

        showToast(
            "Already in your wishlist",
            "❤️"
        );

        return;

    }


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    showToast(
        product.name +
        " added to wishlist",
        "❤️"
    );

}


// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

    const product =
        products.find(function (item) {

            return item.id === id;

        });


    if (!product) {
        return;
    }


    // OUT OF STOCK

    if (!product.stock) {

        showToast(
            product.name +
            " is currently out of stock",
            "❌"
        );

        return;

    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showToast(
        product.name +
        " added to cart",
        "🛒"
    );

}


// ===============================
// USER MENU
// ===============================

const userMenu =
    document.getElementById("userMenu");


let currentUser = null;


try {

    currentUser =
        JSON.parse(
            localStorage.getItem("user")
        );

} catch (error) {

    currentUser = null;

}


if (userMenu) {

    if (currentUser) {

        userMenu.innerHTML =
            "👤 " +
            currentUser.name;


        userMenu.href =
            "account.html";

    }

    else {

        userMenu.innerHTML =
            "Login";


        userMenu.href =
            "login