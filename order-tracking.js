// =========================================================
// R&D COMMERCE — ORDER TRACKING
// =========================================================


// GET SAVED ORDERS
function getSavedOrders() {

    try {

        const savedOrders =
            JSON.parse(
                localStorage.getItem("orders")
            );

        return Array.isArray(savedOrders)
            ? savedOrders
            : [];

    } catch (error) {

        return [];

    }

}



// TRACK ORDER
function trackOrder() {

    const input =
        document.getElementById("orderId");

    const status =
        document.getElementById("status");


    if (!input || !status) {
        return;
    }


    // Clean the entered ID
    let enteredId =
        input.value.trim().toUpperCase();


    // Remove # if user enters #RD12345678
    enteredId =
        enteredId.replace(/^#/, "");


    // Empty input
    if (!enteredId) {

        status.innerHTML = `
            <div class="empty-products">

                <h2>⚠️ Order ID Required</h2>

                <p>
                    Please enter your Order ID.
                </p>

            </div>
        `;

        return;

    }


    const orders =
        getSavedOrders();


    // Find matching order
    const order =
        orders.find(function(item) {

            return String(item.orderId)
                .toUpperCase() === enteredId;

        });


    // ORDER NOT FOUND
    if (!order) {

        status.innerHTML = `
            <div class="empty-products">

                <h2>❌ Invalid Order ID</h2>

                <p>
                    We could not find an order with this ID.
                </p>

                <p>
                    Please check your Order ID and try again.
                </p>

            </div>
        `;

        return;

    }


    // ORDER FOUND
    status.innerHTML = `

        <div class="order-tracking-result">

            <h2>
                Order Confirmed ✅
            </h2>


            <p>
                <strong>Order ID:</strong>
                #${order.orderId}
            </p>


            <div class="tracking-step completed">

                <span>✓</span>

                <div>

                    <strong>
                        Order Placed
                    </strong>

                    <small>
                        Your order has been successfully placed.
                    </small>

                </div>

            </div>


            <div class="tracking-step completed">

                <span>✓</span>

                <div>

                    <strong>
                        Order Confirmed
                    </strong>

                    <small>
                        Your order has been confirmed.
                    </small>

                </div>

            </div>


            <div class="tracking-step">

                <span>📦</span>

                <div>

                    <strong>
                        Packed
                    </strong>

                    <small>
                        Your order will be prepared for shipping.
                    </small>

                </div>

            </div>


            <div class="tracking-step">

                <span>🚚</span>

                <div>

                    <strong>
                        Shipped
                    </strong>

                    <small>
                        Shipping information will be updated soon.
                    </small>

                </div>

            </div>


            <div class="tracking-delivery">

                <p>
                    <strong>
                        Expected Delivery:
                    </strong>
                </p>

                <p>
                    3–5 Business Days
                </p>

            </div>


            <div class="tracking-order-info">

                <p>
                    <strong>
                        Payment:
                    </strong>
                    ${order.paymentMethod || "N/A"}
                </p>

                <p>
                    <strong>
                        Total:
                    </strong>
                    ₹${Number(order.total || 0).toLocaleString("en-IN")}
                </p>

                <p>
                    <strong>
                        Order Date:
                    </strong>
                    ${order.date || "N/A"}
                </p>

            </div>

        </div>

    `;

}