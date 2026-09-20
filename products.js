// ===============================
// GET PRODUCT
// ===============================

const params =
    new URLSearchParams(window.location.search);

const id = params.get("id");

const product =
    products.find(item => item.id == id);

const box =
    document.getElementById("product-details");


// ===============================
// PRODUCT NOT FOUND
// ===============================

if (!product) {

    if (box) {

        box.innerHTML = `
            <div class="product-card">
                <div class="product-info">
                    <h1>Product Not Found</h1>
                    <p>The product you are looking for does not exist.</p>
                    <a href="shop.html">
                        <button>Back to Shop</button>
                    </a>
                </div>
            </div>
        `;

    }

} else {


// ===============================
// PRODUCT DISPLAY
// ===============================

box.innerHTML = `

<div class="product-card">

    <div class="product-image">

        <img
            src="${product.image}"
            alt="${product.name}"
        >

    </div>


    <div class="product-info">

        <h1>
            ${product.name}
        </h1>


        <h2 class="price">

            ₹${product.price}

            <span class="old-price">
                ₹${product.oldPrice}
            </span>

        </h2>


        <div class="discount-badge">
            -${product.discount}%
        </div>


        <div class="rating">
            ⭐ ${product.rating}
            (${product.reviews} Reviews)
        </div>


        <p class="stock">
            ${
                product.stock
                ? "✅ In Stock"
                : "❌ Out of Stock"
            }
        </p>


        <p class="delivery">
            🚚 ${product.delivery}
        </p>


        <p>
            ${product.description}
        </p>


        <!-- QUANTITY -->

        <div class="quantity">

            <button onclick="decrease()">
                -
            </button>

            <span id="qty">
                1
            </span>

            <button onclick="increase()">
                +
            </button>

        </div>


        <!-- ADD TO CART -->

        <button
            onclick="addProductToCart()"
            ${!product.stock ? "disabled" : ""}
        >
            🛒 Add To Cart
        </button>


        <!-- BUY NOW -->

        <button
            onclick="buyNow()"
            ${!product.stock ? "disabled" : ""}
        >
            ⚡ Buy Now
        </button>


        <!-- WISHLIST -->

        <button onclick="addProductToWishlist()">
            ❤️ Add To Wishlist
        </button>


        <div class="features">

            <p>✓ Worldwide Shipping</p>

            <p>✓ Secure Payment</p>

            <p>✓ Easy Returns</p>

        </div>

    </div>

</div>

`;

}


// ===============================
// QUANTITY
// ===============================

let quantity = 1;


function increase(){

    quantity++;

    const qty =
        document.getElementById("qty");

    if(qty){
        qty.innerText = quantity;
    }

}


function decrease(){

    if(quantity > 1){

        quantity--;

        const qty =
            document.getElementById("qty");

        if(qty){
            qty.innerText = quantity;
        }

    }

}


// ===============================
// ADD PRODUCT TO CART
// ===============================

function addProductToCart(){

    if(!product || !product.stock){
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];


    for(let i = 0; i < quantity; i++){

        cart.push(product);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    if(typeof updateCartCount === "function"){
        updateCartCount();
    }


    if(typeof showToast === "function"){

        showToast(
            product.name +
            " × " +
            quantity +
            " added to cart",
            "🛒"
        );

    } else {

        alert(
            product.name +
            " × " +
            quantity +
            " added to cart 🛒"
        );

    }

}


// ===============================
// BUY NOW
// ===============================

function buyNow(){

    if(!product || !product.stock){
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart"))
        || [];


    for(let i = 0; i < quantity; i++){

        cart.push(product);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    window.location.href = "checkout.html";

}


// ===============================
// ADD TO WISHLIST
// ===============================

function addProductToWishlist(){

    if(!product){
        return;
    }


    let wishlist =
        JSON.parse(localStorage.getItem("wishlist"))
        || [];


    const alreadyAdded =
        wishlist.some(item => item.id === product.id);


    if(alreadyAdded){

        if(typeof showToast === "function"){

            showToast(
                "Already in your wishlist",
                "❤️"
            );

        } else {

            alert("Already in your wishlist ❤️");

        }

        return;

    }


    wishlist.push(product);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    if(typeof showToast === "function"){

        showToast(
            product.name +
            " added to wishlist",
            "❤️"
        );

    } else {

        alert(
            product.name +
            " added to wishlist ❤️"
        );

    }

}


// ===============================
// REVIEWS
// ===============================

function addReview(){

    if(!product){
        return;
    }


    const input =
        document.getElementById("reviewText");


    if(!input){
        return;
    }


    const text =
        input.value.trim();


    if(text === ""){

        if(typeof showToast === "function"){

            showToast(
                "Please write a review",
                "✍️"
            );

        } else {

            alert("Please write a review");

        }

        return;

    }


    let allReviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];


    allReviews.push({

        productId: product.id,

        text: text,

        date:
            new Date().toLocaleDateString()

    });


    localStorage.setItem(
        "reviews",
        JSON.stringify(allReviews)
    );


    input.value = "";

    displayReviews();


    if(typeof showToast === "function"){

        showToast(
            "Review submitted successfully",
            "⭐"
        );

    }

}


// ===============================
// DISPLAY REVIEWS
// ===============================

function displayReviews(){

    const list =
        document.getElementById("review-list");


    if(!list || !product){
        return;
    }


    const allReviews =
        JSON.parse(
            localStorage.getItem("reviews")
        ) || [];


    const reviews =
        allReviews.filter(
            review =>
                review.productId === product.id
        );


    list.innerHTML = "";


    if(reviews.length === 0){

        list.innerHTML = `
            <p class="no-reviews">
                No reviews yet. Be the first to review this product!
            </p>
        `;

        return;

    }


    reviews.forEach(review => {

        list.innerHTML += `

            <div class="review-card">

                <div class="review-stars">
                    ★★★★★
                </div>

                <h4>
                    Verified Customer
                </h4>

                <p>
                    ${review.text}
                </p>

                <div class="review-date">
                    ${review.date}
                </div>

            </div>

        `;

    });

}


// ===============================
// RELATED PRODUCTS
// ===============================

function displayRelatedProducts(){

    const relatedBox =
        document.getElementById(
            "related-products"
        );


    if(!relatedBox || !product){
        return;
    }


    relatedBox.innerHTML = "";


    const related =
        products
            .filter(item => item.id !== product.id)
            .slice(0, 3);


    related.forEach(item => {

        relatedBox.innerHTML +=
            productCard(item);

    });

}


// ===============================
// INITIALIZE
// ===============================

if(product){

    displayReviews();

    displayRelatedProducts();

}