import React, { useContext, useState } from 'react'
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";
import TimePicker from "rc-time-picker";
import 'rc-time-picker/assets/index.css';
import PaymentPage from '../components/square-payment';
import moment from 'moment';

function Checkout() {
    const state = useContext(ApplicationContext);
    const [orderReceipt, setOrderReceipt] = useState();
    const defaultPickupTime = moment().hour(17).minute(0)
    const [orderPlacer, setOrderPlacer] = useState({ name: "", phone: "", email: "", pickupTime: defaultPickupTime })
    const [emailValidity, setEmailValidity] = useState(false);
    const [phoneValidity, setPhoneValidity] = useState(false);
    const [timeValidity, setTimeValidity] = useState(true);
    const handleChange = e => {
        const { name, value } = e.target;
        setOrderPlacer(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (name === "email") {
            setEmailValidity(e.target.value.match(/.+@.+/));
        } else if (name === "phone") {
            setPhoneValidity(e.target.value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/))
        }
    };
    const format = "hh:mm a"
    const handlePickupTimeChange = (value) => {
        setOrderPlacer(prevState => ({
            ...prevState,
            pickupTime: value ? moment(value) : ""
        }));
        if(moment(value).isBetween(moment('17:00:00', format),moment('18:15:00', format))) {
            setTimeValidity(true);
        } else {
            setTimeValidity(false);
        }
    }
    const evaluateAndReturnTotal = () => {
        if(state.order.orderTip) {
            return (parseFloat(state.order.orderTotal) + parseFloat(state.order.orderTip)).toFixed(2);
        } else {
            return state.order.orderTotal
        }
    }

    const displayPaymentForm = () => {
        return orderPlacer.name
        && orderPlacer.email
        && orderPlacer.phone
        && orderPlacer.pickupTime
        && emailValidity
        && phoneValidity
        && timeValidity
    }

    return (
        <>
        <div class="notification is-primary" style={{ position: "sticky", top: "0", zIndex: "1", textAlign: "center" }}>
            <strong>Now taking orders to be picked up only at 17723 Westhampton Woods Drive in St. Louis, MO from 5 to 7 on Sunday, April 26th.</strong>
        </div>
        <div class="container" style={{ height: displayPaymentForm() && !orderReceipt ? '115vh' : '100vh'}}>
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
                                <TimePicker
                                    onChange={handlePickupTimeChange}
                                    format={format}
                                    use12Hours
                                    showSecond={false}
                                    defaultValue={defaultPickupTime} />
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
                                            <div>${state.order.orderTotal}</div> : null}
                                    </div>
                                </div>
                                <div class="level-right">
                                    <Link to="/order-now">
                                        <button class="button">Edit Order</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {displayPaymentForm()
                            ? <PaymentPage orderReceipt={{ orderReceipt, setOrderReceipt }} orderPlacer={orderPlacer} />
                            : <div>Please provide contact information before processing payment.</div>}</>
                        : <><h1 className="contact-information-title">Thank you for your order!</h1>
                            <p>Your order can be picked up at {orderPlacer.pickupTime.format(format)}</p>
                        <p>Your card was charged ${evaluateAndReturnTotal()}</p></>}
                </div>
            </div>
        </div>
        </>
    )
}

export default Checkout;