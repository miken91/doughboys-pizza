import React, {useState, useContext} from "react";
import CustomPizza from "../components/custom-pizza";
import ApplicationContext from "../ApplicationContext";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
let pizzasForMenu = require('./pizzasForMenu.json');

function OrderNow() {
    const state = useContext(ApplicationContext);
    const [mobileTab, setMobileTab] = useState(0);
    return (
            <div className="viewport-toggle">
                <div class="container">
                    <div className="desktop">
                        <div class="box columns">
                            <div class="column is-8 is-mobile">
                                <div class="columns">
                                    <div class="column is-8 is-mobile">
                                        {pizzasForMenu.Pizzas.map((pizza, i) =>
                                            <CustomPizza order={{order:state.order, setOrder:state.setOrder}} pizza={pizza} />
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div class="column is-4 is-mobile">
                                <div className="order-summary">
                                    <h1 className="order-title">Your Order</h1>
                                    <div className="order-summary-orders">
                                    {state.order.pizzasOrdered ? <>
                                        {state.order.pizzasOrdered.map((pizza, i) =>
                                            <>
                                                <div className="order-summary-pizza-item">
                                                    <div class="level">
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
                                        </> : null }
                                    </div>
                                    <div>
                                        <div class="level">
                                            <div class="level-left">
                                                <div class="level-item">
                                                    <div className="order-summary-pizza-title">Order Total</div>
                                                </div>
                                                <div class="level-item">
                                                    <div>{state.order.orderTotal}</div>
                                                </div>
                                            </div>
                                            <div class="level-right">
                                                <Link to="/checkout">
                                                    <button class="button is-primary">Place Order</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                    <CustomPizza order={{order:state.order, setOrder:state.setOrder}} pizza={pizza} />
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
                                        </> : null }
                                    </div>
                                    <div>
                                        <div class="level is-mobile">
                                            <div class="level-left">
                                                <div class="level-item">
                                                    <div className="order-summary-pizza-title">Order Total</div>
                                                </div>
                                                <div class="level-item">
                                                    <div>{state.order.orderTotal}</div>
                                                </div>
                                            </div>
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
                </div>
            </div>
    )
}

export default OrderNow