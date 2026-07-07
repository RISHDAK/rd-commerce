const params =
new URLSearchParams(window.location.search);


const id = params.get("id");


const product =
products.find(item => item.id == id);



const box =
document.getElementById("product-details");



box.innerHTML = `


<div class="product-card">


<div class="product-image">

<img src="${product.image}">

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

⭐ ${product.rating} (${product.reviews} Reviews)

</div>

<p class="stock">

${product.stock ? "✅ In Stock" : "❌ Out of Stock"}

</p>

<p class="delivery">

🚚 ${product.delivery}

</p>

<p>
${product.description}
</p>



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



<button onclick="addToCart()">

Add To Cart

</button>

<button onclick="addToWishlist()">
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



let quantity = 1;



function increase(){

quantity++;

document.getElementById("qty").innerText=quantity;

}



function decrease(){

if(quantity>1){

quantity--;

document.getElementById("qty").innerText=quantity;

}

}




function addToCart(){


let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];



for(let i=0;i<quantity;i++){

cart.push(product);

}



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



alert("Added to Cart 🛒");
updateCartCount();

}

function addToWishlist(){

let wishlist =
JSON.parse(localStorage.getItem("wishlist"))
|| [];


wishlist.push(product);


localStorage.setItem(
"wishlist",
JSON.stringify(wishlist)
);


alert("Added to Wishlist ❤️");

}

function addReview(){

let text =
document.getElementById("reviewText").value;


if(text===""){

alert("Please write a review");

return;

}


let reviews =
JSON.parse(localStorage.getItem("reviews"))
|| [];


reviews.push({

text:text,

date:new Date().toLocaleDateString()

});


localStorage.setItem(
"reviews",
JSON.stringify(reviews)
);


displayReviews();

const relatedBox = document.getElementById("related-products");

if (relatedBox) {

    products
        .filter(item => item.id != product.id)
        .slice(0,3)
        .forEach(item => {

            relatedBox.innerHTML += productCard(item);

        });

}

document.getElementById("reviewText").value="";


}



function displayReviews(){


let list =
document.getElementById("review-list");


if(!list) return;


let reviews =
JSON.parse(localStorage.getItem("reviews"))
|| [];


list.innerHTML="";


reviews.forEach(review=>{


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


displayReviews();