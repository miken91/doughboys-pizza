import React from "react";
import DesktopOrderNow from "../components/desktop-order-now";
import MobileOrderNow from "../components/mobile-order-now";

function OrderNow(props) {
    return (
        <>
            <div className="viewport-toggle">
                <div class="container">
                    <DesktopOrderNow />
                    <MobileOrderNow />
                </div>
            </div>
        </>
    )
}

export default OrderNow