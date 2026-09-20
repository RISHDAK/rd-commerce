// =========================================================
// R&D COMMERCE — PRODUCT PAGE
// =========================================================


// =========================================================
// GET PRODUCT
// =========================================================

const params =
    new URLSearchParams(
        window.location.search
    );


const productId =
    params.get("id");


const currentProduct =
    products.find(function (item) {

        return String(item.id) ===
            String(productId);

    });


const productBox =
    document.getElementById(
        "product-details"
    );


// =========================================================
// INVALID PRODUCT
// =========================================================

if (!currentProduct) {

    if (productBox) {

        productBox.innerHTML = `

            <div class="empty-products">

                <h2>
                    Product Not Found
                </h2>

                <p>
                    The product you are looking for
                    does not exist.
                </p>

                <a href="shop.html">

                    <button>
                        Continue Shopping
                    </button>

                </a>

            </div>

        `;

    }

}


// =========================================================
// QUANTITY
// =========================================================

let quantity = 1;


function updateQuantityDisplay() {

    const quantityElement =
        document.getElementById("qty");


    if (quantityElement) {

        quantityElement.innerText =
            quantity;

    }

}


function increase() {

    if (!currentProduct) {
        return;
    }


    quantity++;


    updateQuantityDisplay();

}


function decrease() {

    if (quantity <= 1) {
        return;
    }


    quantity--;


    updateQuantityDisplay();

}


// =========================================================
// DISPLAY PRODUCT
// =========================================================

if (
    currentProduct &&
    productBox
) {

    productBox.innerHTML = `

        <div class="product-card">


            <!-- PRODUCT IMAGE -->

            <div class="product-image">

                <img
                    src="${currentProduct.image}"
                    alt="${currentProduct.name}"
                >

            </div>


            <!-- PRODUCT INFORMATION -->

            <div class="product-info">


                <h1>
                    ${currentProduct.name}
                </h1>


                <h2 class="price">

                    ₹${Number(
                        currentProduct.price
                    ).toLocaleString("en-IN")}

                    <span class="old-price">

                        ₹${Number(
                            currentProduct.oldPrice
                        ).toLocaleString("en-IN")}

                    </span>

                </h2>


                <div class="discount-badge">

                    -${currentProduct.discount || 0}%

                </div>


                <div class="rating">

                    ⭐ ${currentProduct.rating}

                    (${currentProduct.reviews}
                    Reviews)

                </div>


                <p class="stock">

                    ${
                        currentProduct.stock
                        ? "✅ In Stock"
                        : "❌ Out of Stock"
                    }

                </p>


                <p class="delivery">

                    🚚 ${currentProduct.delivery}

                </p>


                <p>

                    ${currentProduct.description}

                </p>


                <!-- QUANTITY -->

                <div class="quantity">

                    <button
                        type="button"
                        onclick="decrease()"
                    >
                        −
                    </button>


                    <span id="qty">
                        1
                    </span>


                    <button
                        type="button"
                        onclick="increase()"
                    >
                        +
                    </button>

                </div>


                <!-- ADD TO CART -->

                <button
    type="button"
    class="product-action-btn add-cart-btn"
    onclick="addProductToCart()"
    ${!currentProduct.stock ? "disabled" : ""}
>
    <span class="btn-icon">🛒</span>
    <span>Add To Cart</span>
</button>

                <!-- WISHLIST -->

                <button
    type="button"
    class="product-action-btn wishlist-action-btn"
    onclick="addProductToWishlist()"
>
    <span class="btn-icon">❤️</span>
    <span>Add To Wishlist</span>
</button>


                <!-- FEATURES -->

                <div class="features">

                    <p>
                        ✓ Worldwide Shipping
                    </p>

                    <p>
                        ✓ Secure Payment
                    </p>

                    <p>
                        ✓ Easy Returns
                    </p>

                </div>


            </div>

        </div>

    `;

}


// =========================================================
// ADD PRODUCT TO CART
// =========================================================

function addProductToCart() {

    if (!currentProduct) {
        return;
    }


    if (!currentProduct.stock) {

        if (
            typeof showToast ===
            "function"
        ) {

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


    for (
        let i = 0;
        i < quantity;
        i++
    ) {

        cart.push(currentProduct);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Reset any old coupon

    localStorage.removeItem(
        "discountAmount"
    );


    if (
        typeof updateCartCount ===
        "function"
    ) {

        updateCartCount();

    }


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(

            quantity === 1

                ? currentProduct.name +
                  " added to cart"

                : quantity +
                  " × " +
                  currentProduct.name +
                  " added to cart",

            "🛒"

        );

    }

}


// =========================================================
// ADD PRODUCT TO WISHLIST
// =========================================================

function addProductToWishlist() {

    if (!currentProduct) {
        return;
    }


    let wishlist = [];


    try {

        const savedWishlist =
            JSON.parse(
                localStorage.getItem(
                    "wishlist"
                )
            );


        if (
            Array.isArray(
                savedWishlist
            )
        ) {

            wishlist =
                savedWishlist;

        }

    } catch (error) {

        wishlist = [];

    }


    const alreadyExists =
        wishlist.some(function (item) {

            return String(item.id) ===
                String(currentProduct.id);

        });


    if (alreadyExists) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Already in your wishlist",
                "❤️"
            );

        }

        return;

    }


    wishlist.push(
        currentProduct
    );


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            currentProduct.name +
            " added to wishlist",
            "❤️"
        );

    }

}


// =========================================================
// REVIEWS
// =========================================================

function getReviews() {

    try {

        const savedReviews =
            JSON.parse(
                localStorage.getItem(
                    "reviews"
                )
            );


        return Array.isArray(
            savedReviews
        )
            ? savedReviews
            : [];

    } catch (error) {

        return [];

    }

}


// =========================================================
// DISPLAY REVIEWS
// =========================================================

function displayReviews() {

    const reviewList =
        document.getElementById(
            "review-list"
        );


    if (!reviewList) {
        return;
    }


    const reviews =
        getReviews();


    reviewList.innerHTML = "";


    if (reviews.length === 0) {

        reviewList.innerHTML = `

            <div class="empty-reviews">

                <p>
                    No reviews yet.
                    Be the first to review
                    this product!
                </p>

            </div>

        `;

        return;

    }


    reviews.forEach(
        function (review) {

            const reviewCard =
                document.createElement(
                    "div"
                );


            reviewCard.className =
                "review-card";


            const stars =
                document.createElement(
                    "div"
                );

            stars.className =
                "review-stars";

            stars.innerText =
                "★★★★★";


            const customer =
                document.createElement(
                    "h4"
                );

            customer.innerText =
                "Verified Customer";


            const reviewText =
                document.createElement(
                    "p"
                );

            reviewText.innerText =
                review.text || "";


            const date =
                document.createElement(
                    "div"
                );

            date.className =
                "review-date";

            date.innerText =
                review.date || "";


            reviewCard.appendChild(
                stars
            );

            reviewCard.appendChild(
                customer
            );

            reviewCard.appendChild(
                reviewText
            );

            reviewCard.appendChild(
                date
            );


            reviewList.appendChild(
                reviewCard
            );

        }
    );

}


// =========================================================
// ADD REVIEW
// =========================================================

function addReview() {

    const reviewInput =
        document.getElementById(
            "reviewText"
        );


    if (!reviewInput) {
        return;
    }


    const text =
        reviewInput.value.trim();


    if (!text) {

        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                "Please write a review first",
                "✍️"
            );

        }

        else {

            alert(
                "Please write a review"
            );

        }

        return;

    }


    const reviews =
        getReviews();


    reviews.push({

        text: text,

        date:
            new Date()
                .toLocaleDateString(
                    "en-IN"
                )

    });


    localStorage.setItem(
        "reviews",
        JSON.stringify(reviews)
    );


    reviewInput.value = "";


    displayReviews();


    if (
        typeof showToast ===
        "function"
    ) {

        showToast(
            "Your review has been added",
            "⭐"
        );

    }

}


// =========================================================
// RELATED PRODUCTS
// =========================================================

function displayRelatedProducts() {

    const relatedBox =
        document.getElementById(
            "related-products"
        );


    if (
        !relatedBox ||
        !currentProduct
    ) {

        return;

    }


    relatedBox.innerHTML = "";


    const relatedProducts =
        products

            .filter(function (item) {

                return (
                    String(item.id) !==
                    String(currentProduct.id)
                );

            })

            .slice(0, 3);


    relatedProducts.forEach(
        function (item) {

            if (
                typeof productCard ===
                "function"
            ) {

                relatedBox.innerHTML +=
                    productCard(item);

            }

        }
    );

}


// =========================================================
// INITIALIZE
// =========================================================

displayReviews();

displayRelatedProducts();