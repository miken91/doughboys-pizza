import React, { useContext, useState } from 'react'
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";
import PaymentPage from '../components/square-payment';

function Checkout() {
    const state = useContext(ApplicationContext);
    const [orderReceipt, setOrderReceipt] = useState();                              
    const [orderPlacer, setOrderPlacer] = useState({ name: "", phone: "", email: "" })
    const [emailValidity, setEmailValidity] = useState(false);
    const [phoneValidity, setPhoneValidity] = useState(false);
    const handleChange = e => {
        const { name, value } = e.target;
        setOrderPlacer(prevState => ({
            ...prevState,
            [name]: value
        }));
        if(name === "email") {
            setEmailValidity(e.target.value.match(/.+@.+/));
        } else if(name === "phone") {
            setPhoneValidity(e.target.value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
        }
    };
    return (
        <div class="container" style={{ height: "100vh" }}>
            <div class="box">
                <div class="column is-4 is-offset-4">
                    {!orderReceipt ? <>
                    <h1 className="contact-information-title">Contact Information</h1>
                    <div class="field">
                        <label class="label">Name</label>
                        <div class="control">
                            <input class="input" type="text" placeholder="First and Last Name" name="name" value={orderPlacer.name} onChange={handleChange} />
                        </div>
                        <label class="label">Phone Number</label>
                        <div class="control">
                            <input class="input" type="tel" placeholder="Valid Phone Number" name="phone" value={orderPlacer.phone} onChange={handleChange} />
                        </div>
                        <label class="label">Email</label>
                        <div class="control">
                            <input class="input" type="email" placeholder="Valid Email" name="email" value={orderPlacer.email} onChange={handleChange} />
                        </div>
                        <label class="label">Pick Up Time</label>
                        <div class="control">
                            
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
                    {orderPlacer.name
                        && orderPlacer.email
                        && orderPlacer.phone 
                        && emailValidity
                        && phoneValidity
                        ? <PaymentPage orderReceipt={{orderReceipt,setOrderReceipt}} orderPlacer={orderPlacer}/>
                        : <div>Please provide contact information before processing payment.</div>}</> 
                    : <><h1 className="contact-information-title">Thank you for your order!</h1>
                        <p>Your order can be picked up at TIME at LOCATION</p>
                        <p>Your card was charged ${state.order.orderTotal}</p>
                        <p>A confirmation email has been sent to {orderPlacer.email}</p></>}
                </div>
            </div>
        </div>
    )
}

export default Checkout;