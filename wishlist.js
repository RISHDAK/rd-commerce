let wishlist =
JSON.parse(localStorage.getItem("wishlist"))
|| [];


let box =
document.getElementById("wishlist-items");



wishlist.forEach(product=>{


box.innerHTML += `

<div class="card">

<img src="${product.image}">


<h3>
${product.name}
</h3>


<p>
₹${product.price}
</p>


<a href="product.html?id=${product.id}">

<button>
View Product
</button>

</a>


</div>

`;

});