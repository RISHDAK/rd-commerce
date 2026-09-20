// =========================================================
// R&D COMMERCE — SHOP SYSTEM
// =========================================================


// PRODUCT CONTAINER
const container =
    document.getElementById("product-container");


// SEARCH + SORT ELEMENTS
const searchBox =
    document.getElementById("searchBox");

const sortProducts =
    document.getElementById("sortProducts");


// CURRENT PRODUCT LIST
let currentProducts = [...products];



// =========================================================
// DISPLAY PRODUCTS
// =========================================================

function displayShopProducts(items) {

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (!Array.isArray(items) || items.length === 0) {

        container.innerHTML = `

            <div class="empty-products">

                <h2>
                    No Products Found
                </h2>

                <p>
                    Try a different search or sorting option.
                </p>

            </div>

        `;

        return;

    }


    items.forEach(function(product) {

        // Use the master product card when available
        if (typeof productCard === "function") {

            container.innerHTML +=
                productCard(product);

            return;

        }


        // Fallback card
        const card =
            document.createElement("div");

        card.className = "card";


        card.innerHTML = `

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
                ₹${Number(product.price).toLocaleString("en-IN")}
            </h4>

            <button
                type="button"
                onclick="openProduct(${product.id})"
            >
                View Product
            </button>

        `;


        container.appendChild(card);

    });

}



// =========================================================
// FILTER + SORT
// =========================================================

function updateShopProducts() {

    if (!Array.isArray(products)) {
        return;
    }


    const searchValue =
        searchBox
            ? searchBox.value.trim().toLowerCase()
            : "";


    let result =
        products.filter(function(product) {

            if (!searchValue) {
                return true;
            }


            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.description
                    .toLowerCase()
                    .includes(searchValue)

            );

        });



    // SORT
    const sortValue =
        sortProducts
            ? sortProducts.value
            : "";


    if (sortValue === "low") {

        result.sort(function(a, b) {

            return Number(a.price) -
                   Number(b.price);

        });

    }


    else if (sortValue === "high") {

        result.sort(function(a, b) {

            return Number(b.price) -
                   Number(a.price);

        });

    }


    else if (sortValue === "rating") {

        result.sort(function(a, b) {

            return Number(b.rating) -
                   Number(a.rating);

        });

    }


    else if (sortValue === "discount") {

        result.sort(function(a, b) {

            return Number(b.discount || 0) -
                   Number(a.discount || 0);

        });

    }


    currentProducts = result;


    displayShopProducts(currentProducts);

}



// =========================================================
// SEARCH
// =========================================================

if (searchBox) {

    searchBox.addEventListener(
        "input",
        updateShopProducts
    );

}



// =========================================================
// SORT
// =========================================================

if (sortProducts) {

    sortProducts.addEventListener(
        "change",
        updateShopProducts
    );

}



// =========================================================
// OPEN PRODUCT
// =========================================================

function openProduct(id) {

    window.location.href =
        "product.html?id=" + id;

}



// =========================================================
// INITIALIZE SHOP
// =========================================================

updateShopProducts();