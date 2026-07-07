const container =
document.getElementById("product-container");


function displayProducts(items){


container.innerHTML="";


items.forEach(product=>{


let card=document.createElement("div");


card.className="card";


card.innerHTML=`

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.category}</p>

<h4>₹${product.price}</h4>

<button onclick="openProduct(${product.id})">
View Product
</button>

`;

container.appendChild(card);


});


}



displayProducts(products);
const searchInput = document.getElementById("searchInput");


searchInput.addEventListener("input", function(){

let searchValue = this.value.toLowerCase();


let filteredProducts = products.filter(product =>

product.name
.toLowerCase()
.includes(searchValue)

);


displayProducts(filteredProducts);


});


function openProduct(id){

window.location.href=
"product.html?id="+id;

}




document
.getElementById("searchInput")
.addEventListener("input",function(){


let value=this.value.toLowerCase();


let result=products.filter(product=>

product.name
.toLowerCase()
.includes(value)

);


displayProducts(result);


});



document
.getElementById("sortSelect")
.addEventListener("change",function(){


let sorted=[...products];


if(this.value=="low"){

sorted.sort((a,b)=>a.price-b.price);

}


if(this.value=="high"){

sorted.sort((a,b)=>b.price-a.price);

}


displayProducts(sorted);


});