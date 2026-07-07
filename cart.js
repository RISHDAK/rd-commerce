let discountAmount = 0;

let cart =
JSON.parse(localStorage.getItem("cart"))
|| [];


const box =
document.getElementById("cart-items");


const total =
document.getElementById("total");



function displayCart(){


box.innerHTML="";


let sum=0;



if(cart.length===0){

box.innerHTML=
"<h2>Your cart is empty 🛒</h2>";

total.innerText=0;

return;

}



cart.forEach((item,index)=>{


sum += item.price;



box.innerHTML += `


<div class="cart-card">


<img src="${item.image}">



<div>


<h3>
${item.name}
</h3>


<p>
₹${item.price}
</p>



<button onclick="removeItem(${index})">

Remove

</button>


</div>


</div>


`;



});



total.innerText=sum;

document.getElementById("discount").innerText = discountAmount;

document.getElementById("finalTotal").innerText = sum - discountAmount;

}



function removeItem(index){


cart.splice(index,1);



localStorage.setItem(
"cart",
JSON.stringify(cart)
);



displayCart();


}



displayCart();

function applyCoupon(){


let code =
document.getElementById("coupon").value
.toUpperCase();



let subtotal = 0;


cart.forEach(item=>{

subtotal += item.price;

});



if(code === "SAVE10"){


discountAmount =
subtotal * 0.10;


alert("10% Discount Applied 🎉");


}


else if(code === "RISHU"){

    discountAmount = subtotal;

    alert("🎉 Congratulations! RISHU Coupon Applied (100% OFF)");

}


else if(code === "WELCOME"){


discountAmount = 200;


alert("₹200 Discount Applied 🎉");


}

else{


discountAmount = 0;


alert("Invalid Coupon Code");


}



displayCart();


}