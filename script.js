const homeBox = document.getElementById("home-products");


// Homepage products display

function productCard(product){

return `

<div class="card">

<button class="wishlist-btn" onclick="toggleWishlist(${product.id}, event)">
    ❤️
</button>

<div class="discount-badge">
-${product.discount}%
</div>

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<div class="rating">
⭐ ${product.rating} (${product.reviews})
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
${product.stock ? "✅ In Stock" : "❌ Out of Stock"}
</p>

<a href="product.html?id=${product.id}">
<button>
View Product
</button>
</a>

<button class="cart-btn" onclick="addToCart(${product.id})">
🛒 Add to Cart
</button>

</div>

`;

}

if(homeBox){

products.slice(0,3).forEach(product=>{

homeBox.innerHTML += productCard(product);

});

}



// Homepage Search System

const homeSearch = document.getElementById("homeSearchInput");


if(homeSearch){


homeSearch.addEventListener("input", function(){


let value = this.value.toLowerCase();



let result = products.filter(product =>

product.name
.toLowerCase()
.includes(value)

);



homeBox.innerHTML = "";



result.forEach(product=>{


homeBox.innerHTML += productCard(product);

});


});


}

function showCategory(category){


let filteredProducts = products.filter(product =>

product.category === category

);



homeBox.innerHTML = "";



filteredProducts.forEach(product=>{


homeBox.innerHTML += `

<div class="card">

<img src="${product.image}">


<h3>${product.name}</h3>
<div class="rating">
⭐ ${product.rating} (${product.reviews} Reviews)
</div>


<p>${product.category}</p>


<h4>

₹${product.price}</h4>
<span class="old-price">

₹${product.oldPrice}

</span>

</h4>

<a href="product.html?id=${product.id}">

<button>
View Product
</button>

</a>


</div>


`;

});


}

function updateCartCount(){

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];


let count =
document.getElementById("cart-count");


if(count){

count.innerText = cart.length;

}

}


updateCartCount();

function toggleWishlist(id,event){

    event.stopPropagation();

    alert("Wishlist feature is coming in the next update ❤️");

}

function addToCart(id){

    const product = products.find(p => p.id === id);

    if(!product){
        return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart 🛒");

}

const userMenu = document.getElementById("userMenu");

const currentUser = JSON.parse(localStorage.getItem("user"));

if(userMenu){

    if(currentUser){

        userMenu.innerHTML = "👤 " + currentUser.name;

        userMenu.href = "account.html";

    }else{

        userMenu.innerHTML = "Login";

        userMenu.href = "login.html";

    }

}

function isLoggedIn(){

    const user = JSON.parse(localStorage.getItem("user"));

    if(!user){

        alert("Please login first!");

        window.location.href = "login.html";

        return false;

    }

    return true;

}