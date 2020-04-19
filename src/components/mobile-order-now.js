import React, { useState, useContext } from "react";
import CustomPizza from "../components/custom-pizza";
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
let pizzasForMenu = require('./pizzasForMenu.json');
function MobileOrderNow() {
    const state = useContext(ApplicationContext);
    const [mobileTab, setMobileTab] = useState(0);
    const handleDelete = (index) => {
        let orderSubTotal = (parseFloat(state.order.orderSubTotal) - parseFloat(state.order.pizzasOrdered[index].price)).toFixed(2);
        let orderTax = (parseFloat(orderSubTotal * .08363)).toFixed(2);
        let orderTotal = (parseFloat(orderSubTotal) + parseFloat(orderTax)).toFixed(2);
        state.order.pizzasOrdered.splice(index, 1);
        state.setOrder({ pizzasOrdered: [...state.order.pizzasOrdered], orderSubTotal: orderSubTotal, orderTax: orderTax, orderTotal: orderTotal })
    }
    return (
        <div className="mobile">
            <div class="tabs is-centered is-large">
                <ul>
                    <li class={mobileTab === 0 ? "is-active" : ""}><a onClick={() => { setMobileTab(0) }}>Menu</a></li>
                    <li class={mobileTab === 1 ? "is-active" : ""}><a onClick={() => { setMobileTab(1) }}>Cart</a></li>
                </ul>
            </div>
            <div class="box">
                {mobileTab === 0 ?
                    <>
                        {pizzasForMenu.Pizzas.map((pizza, i) =>
                            <CustomPizza order={{ order: state.order, setOrder: state.setOrder }} pizza={pizza} />
                        )}
                    </> :
                    <>
                        <div className="order-summary">
                            <h1 className="order-title">Your Order</h1>
                            <div className="order-summary-orders">
                                {state.order.pizzasOrdered ? <>
                                    {state.order.pizzasOrdered.map((pizza, i) =>
                                        <>
                                            <div className="order-summary-pizza-item">
                                                <div class="level is-mobile">
                                                    <div class="level-left">
                                                        <div class="level-item">
                                                            <h1>{i + 1}</h1>
                                                        </div>
                                                        <div class="level-item">
                                                            <h1 className="order-summary-pizza-title">{pizza.type}</h1>
                                                        </div>
                                                    </div>
                                                    <div class="level-right">
                                                        <div class="level-item">
                                                            <h1>{pizza.price}</h1>
                                                        </div>
                                                        <div class="level-item">
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(i)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {pizza.toppings.length > 0 ?
                                                pizza.toppings.map((topping) =>
                                                    <div>{topping}</div>
                                                ) : null}
                                            {pizza.comments !== "" ? <div>Comments: {pizza.comments}</div> : null}
                                        </>
                                    )}
                                </> : null}
                            </div>
                            <div>
                                <div class="level is-mobile">
                                    <div class="level-left">
                                        <div class="level-item">
                                            <div className="order-summary-pizza-title">Tax</div>
                                        </div>
                                    </div>
                                    <div class="level-right">
                                        <div class="level-item">
                                            <div>{state.order.orderTax}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="level is-mobile">
                                    <div class="level-left">
                                        <div class="level-item">
                                            <div className="order-summary-pizza-title">Order Total</div>
                                        </div>
                                    </div>
                                    <div class="level-right">
                                        <div class="level-item">
                                            <div>{state.order.orderTotal}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="level is-mobile">
                                    <div class="level-right">
                                        <Link to="/checkout">
                                            <button class="button is-primary">Place Order</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default MobileOrderNow;