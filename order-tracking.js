function trackOrder(){

let id =
document.getElementById("orderId").value;

let status =
document.getElementById("status");


if(id==="RD10001"){

status.innerHTML=`

<h2>Order Confirmed ✅</h2>

<p>📦 Packed</p>

<p>🚚 Shipped</p>

<p>Expected Delivery:
3-5 Business Days</p>

`;

}

else{

status.innerHTML=`

<h2>

Invalid Order ID

</h2>

`;

}

}