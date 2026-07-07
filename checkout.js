 const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    alert("Please Login First");

    window.location.href = "login.html";

}

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];

const box =
document.getElementById("checkout-items");

const total =
document.getElementById("checkout-total");

let sum = 0;

cart.forEach(item=>{

sum += item.price;

box.innerHTML += `

<p>

${item.name}

<span style="float:right">

₹${item.price}

</span>

</p>

`;

});

total.innerText = sum;	