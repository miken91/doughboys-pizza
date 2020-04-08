import React, { useContext } from 'react'
import { PayPalButton } from 'react-paypal-button';
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";

function Checkout() {
    const paypalOptions = {
        clientId: 'ASKoVgL7hRbpyGbnDZXdsh7iP6yyf4s00YbFuBaixpaE7ZCoIIW6_q9XNcz2gY-v1q3y7XGddMlKJjAp',
        intent: 'capture'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect',
    }
    const state = useContext(ApplicationContext);
    return (
        <div class="container" style={{ height: "80vh" }}>
            <div class="box columns">
                <div class="column is-4 is-offset-4 is-mobile">
                    <h1 className="contact-information-title">Contact Information</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="First and Last Name" />
                        </div>
                        <label class="label">Phone Number</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Valid Phone Number" />
                        </div>
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="Valid Email" />
                        </div>
                    </div>
                    <h1 className="contact-information-title">Order Summary</h1>
                    <div style={{ marginBottom: "1.15em" }}>
                        <div class="level is-mobile">
                            <div class="level-left">
                                <div class="level-item">
                                    <div className="order-summary-pizza-title">Order Total</div>
                                </div>
                                <div class="level-item">
                                    {state.order.orderTotal ?
                                        <div>{state.order.orderTotal}</div> : null}
                                </div>
                            </div>
                            <div class="level-right">
                                <Link to="/order-now">
                                    <button class="button">Edit Order</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={1.00}
                    />
                </div>
            </div>
        </div>
    )
}

export default Checkout;