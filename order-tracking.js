// ===============================
// TRACK ORDER
// ===============================

function trackOrder(){

    const input =
        document.getElementById("orderId");

    const status =
        document.getElementById("status");


    if(!input || !status){
        return;
    }


    const enteredId =
        input.value.trim().toUpperCase();


    // ===============================
    // EMPTY ID
    // ===============================

    if(!enteredId){

        status.innerHTML = `

            <h2>
                Please enter an Order ID
            </h2>

            <p>
                Example: RD12345678
            </p>

        `;

        return;

    }


    // ===============================
    // LOAD ORDERS
    // ===============================

    const orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    // ===============================
    // FIND ORDER
    // ===============================

    const order =
        orders.find(item =>
            String(item.orderId).toUpperCase()
            === enteredId.replace("#", "")
        );


    // ===============================
    // ORDER NOT FOUND
    // ===============================

    if(!order){

        status.innerHTML = `

            <div class="order-status">

                <h2>
                    ❌ Order Not Found
                </h2>

                <p>
                    Please check your Order ID
                    and try again.
                </p>

            </div>

        `;

        return;

    }


    // ===============================
    // ORDER FOUND
    // ===============================

    status.innerHTML = `

        <div class="order-status">

            <h2>
                Order Found ✅
            </h2>


            <p>
                <strong>Order ID:</strong>
                #${order.orderId}
            </p>


            <p>
                <strong>Status:</strong>
                ${order.status}
            </p>


            <p>
                <strong>Payment:</strong>
                ${order.paymentMethod}
            </p>


            <p>
                <strong>Total:</strong>
                ₹${Number(order.total).toLocaleString()}
            </p>


            <hr>


            <h3>
                Order Progress
            </h3>


            <p>
                ✅ Order Placed
            </p>


            <p>
                📦 Packed
            </p>


            <p>
                🚚 Shipped
            </p>


            <p>
                📍 Out for Delivery
            </p>


            <p>
                Expected Delivery:
                3–5 Business Days
            </p>

        </div>

    `;

}