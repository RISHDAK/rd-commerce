// =========================================================
// R&D COMMERCE — MASTER SCRIPT
// =========================================================


// =========================================================
// SAFE LOCAL STORAGE
// =========================================================

function getStorageArray(key) {

    try {

        const data =
            JSON.parse(localStorage.getItem(key));

        return Array.isArray(data) ? data : [];

    } catch (error) {

        return [];

    }

}


function getStorageObject(key) {

    try {

        const data =
            JSON.parse(localStorage.getItem(key));

        return data && typeof data === "object"
            ? data
            : null;

    } catch (error) {

        return null;

    }

}


// =========================================================
// PAGE LOADER
// =========================================================

window.addEventListener("load", function () {

    const loader =
        document.getElementById("pageLoader");

    if (!loader) {
        return;
    }

    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";

    setTimeout(function () {

        loader.style.display = "none";

    }, 400);

});


// =========================================================
// HOME PRODUCTS
// =========================================================

const homeBox =
    document.getElementById("home-products");


// =========================================================
// PRODUCT CARD
// =========================================================

function productCard(product) {

    if (!product) {
        return "";
    }

    return `

        <div class="card">

            <button
                class="wishlist-btn"
                onclick="toggleWishlist(${product.id}, event)"
                aria-label="Add to wishlist"
            >
                ❤️
            </button>


            <div class="discount-badge">
                -${product.discount || 0}%
            </div>


            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
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
                ₹${Number(product.price).toLocaleString()}

                <span class="old-price">
                    ₹${Number(product.oldPrice).toLocaleString()}
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


          <a
    href="product.html?id=${product.id}"
    class="view-product-btn"
>
    <span class="btn-icon">👁️</span>
    <span>View Product</span>
    <span class="btn-arrow">→</span>
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


// =========================================================
// DISPLAY PRODUCTS
// =========================================================

function displayProducts(list) {

    if (!homeBox) {
        return;
    }

    homeBox.innerHTML = "";


    if (!Array.isArray(list) || list.length === 0) {

        homeBox.innerHTML = `

            <div class="empty-products">

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    list.forEach(function (product) {

        homeBox.innerHTML +=
            productCard(product);

    });

}


// =========================================================
// FEATURED PRODUCTS
// =========================================================

function displayFeaturedProducts() {

    if (!homeBox) {
        return;
    }

    displayProducts(
        products.slice(0, 3)
    );

}


if (homeBox) {

    displayFeaturedProducts();

}


// =========================================================
// HOME SEARCH
// =========================================================

const homeSearch =
    document.getElementById("homeSearchInput");


const searchSuggestions =
    document.getElementById("searchSuggestions");


if (homeSearch) {

    homeSearch.addEventListener(
        "input",
        function () {

            const value =
                this.value
                    .trim()
                    .toLowerCase();


            if (!value) {

                displayFeaturedProducts();

                if (searchSuggestions) {

                    searchSuggestions.style.display =
                        "none";

                    searchSuggestions.innerHTML =
                        "";

                }

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


            displayProducts(result);


            // Search suggestions

            if (searchSuggestions) {

                searchSuggestions.innerHTML =
                    "";


                if (result.length > 0) {

                    result
                        .slice(0, 5)
                        .forEach(function (product) {

                            const item =
                                document.createElement("div");

                            item.className =
                                "suggestion-item";

                            item.innerHTML =
                                `
                                ${product.name}
                                `;


                            item.addEventListener(
                                "click",
                                function () {

                                    homeSearch.value =
                                        product.name;

                                    displayProducts(
                                        [product]
                                    );

                                    searchSuggestions.style.display =
                                        "none";

                                }
                            );


                            searchSuggestions.appendChild(
                                item
                            );

                        });


                    searchSuggestions.style.display =
                        "block";

                }

                else {

                    searchSuggestions.style.display =
                        "none";

                }

            }

        }
    );

}


// Hide suggestions when clicking elsewhere

document.addEventListener(
    "click",
    function (event) {

        if (
            searchSuggestions &&
            homeSearch &&
            !searchSuggestions.contains(event.target) &&
            event.target !== homeSearch
        ) {

            searchSuggestions.style.display =
                "none";

        }

    }
);


// =========================================================
// CATEGORY FILTER
// =========================================================

function showCategory(category) {

    if (!homeBox) {
        return;
    }


    let filteredProducts;


    if (category === "Home") {

        filteredProducts =
            products;

    }

    else {

        filteredProducts =
            products.filter(function (product) {

                return (
                    product.category === category
                );

            });

    }


    displayProducts(filteredProducts);


    // Scroll to products section

    homeBox.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


// =========================================================
// CART COUNT
// =========================================================

function updateCartCount() {

    const cart =
        getStorageArray("cart");


    const count =
        document.getElementById("cart-count");


    if (!count) {
        return;
    }


    count.innerText =
        cart.length;

}


updateCartCount();


// =========================================================
// TOAST SYSTEM
// =========================================================

function showToast(
    message,
    icon = "✓"
) {

    const container =
        document.getElementById(
            "toast-container"
        );


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


    const iconElement =
        document.createElement("span");

    iconElement.className =
        "toast-icon";

    iconElement.innerText =
        icon;


    const messageElement =
        document.createElement("span");

    messageElement.className =
        "toast-message";

    messageElement.innerText =
        message;


    toast.appendChild(
        iconElement
    );

    toast.appendChild(
        messageElement
    );


    container.appendChild(
        toast
    );


    setTimeout(function () {

        toast.classList.add("hide");

    }, 2500);


    setTimeout(function () {

        toast.remove();

    }, 3000);

}


// =========================================================
// WISHLIST
// =========================================================

function toggleWishlist(
    id,
    event
) {

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
        getStorageArray("wishlist");


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


// =========================================================
// ADD TO CART
// =========================================================

function addToCart(id) {

    const product =
        products.find(function (item) {

            return item.id === id;

        });


    if (!product) {
        return;
    }


    if (!product.stock) {

        showToast(
            product.name +
            " is currently out of stock",
            "❌"
        );

        return;

    }


    let cart =
        getStorageArray("cart");


    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // New cart means previous coupon
    // should not remain active.

    localStorage.removeItem(
        "discountAmount"
    );


    updateCartCount();


    showToast(
        product.name +
        " added to cart",
        "🛒"
    );

}


// =========================================================
// USER MENU
// =========================================================

const userMenu =
    document.getElementById("userMenu");


const currentUser =
    getStorageObject("user");


if (userMenu) {

    if (
        currentUser &&
        currentUser.name
    ) {

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
            "login.html";

    }

}


// =========================================================
// LOGIN CHECK
// =========================================================

function isLoggedIn() {

    const user =
        getStorageObject("user");


    if (!user) {

        showToast(
            "Please login first",
            "🔐"
        );


        setTimeout(function () {

            window.location.href =
                "login.html";

        }, 600);


        return false;

    }


    return true;

}


// =========================================================
// STAT COUNTERS
// =========================================================

function animateCounter(
    id,
    target
) {

    const element =
        document.getElementById(id);


    if (!element) {
        return;
    }


    let value = 0;


    const step =
        Math.max(
            1,
            Math.ceil(target / 100)
        );


    const interval =
        setInterval(function () {

            value += step;


            if (value >= target) {

                value =
                    target;

                clearInterval(
                    interval
                );

            }


            element.innerText =
                value.toLocaleString() +
                "+";

        }, 20);

}


animateCounter(
    "customers",
    25000
);


animateCounter(
    "orders",
    8500
);


animateCounter(
    "products",
    1200
);


// =========================================================
// SALE COUNTDOWN
// =========================================================

const timer =
    document.getElementById("timer");


if (timer) {

    let saleEnd =
        localStorage.getItem(
            "saleEndTime"
        );


    if (
        !saleEnd ||
        Number(saleEnd) <= Date.now()
    ) {

        saleEnd =
            Date.now() +
            (12 * 60 * 60 * 1000);


        localStorage.setItem(
            "saleEndTime",
            saleEnd
        );

    }


    function updateCountdown() {

        const remaining =
            Number(saleEnd) -
            Date.now();


        if (remaining <= 0) {

            timer.innerHTML =
                "00:00:00";

            return;

        }


        const totalSeconds =
            Math.floor(
                remaining / 1000
            );


        const hours =
            Math.floor(
                totalSeconds / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        timer.innerHTML =

            String(hours)
                .padStart(2, "0")

            +

            ":" +

            String(minutes)
                .padStart(2, "0")

            +

            ":" +

            String(seconds)
                .padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

}


// =========================================================
// DARK MODE
// =========================================================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        themeToggle.innerHTML =
            "☀️";

    }

    else {

        themeToggle.innerHTML =
            "🌙";

    }


    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const darkMode =
                document.body.classList.contains(
                    "dark-mode"
                );


            if (darkMode) {

                localStorage.setItem(
                    "theme",
                    "dark"
                );

                themeToggle.innerHTML =
                    "☀️";

            }

            else {

                localStorage.setItem(
                    "theme",
                    "light"
                );

                themeToggle.innerHTML =
                    "🌙";

            }

        }
    );

}


// =========================================================
// BACK TO TOP
// =========================================================

const backToTop =
    document.getElementById(
        "backToTop"
    );


if (backToTop) {

    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY >
                400
            ) {

                backToTop.style.display =
                    "flex";

            }

            else {

                backToTop.style.display =
                    "none";

            }

        }
    );


    backToTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


// =========================================================
// END OF MASTER SCRIPT
// =========================================================