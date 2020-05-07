import React, { useState, useContext } from "react";
import CustomPizza from "../components/custom-pizza";
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { store } from 'react-notifications-component';
let pizzasForMenu = require('./pizzasForMenu.json');

function MobileOrderNow() {
    const state = useContext(ApplicationContext);
    const [mobileTab, setMobileTab] = useState(0);
    const [index, setIndex] = useState(0)
    const handleDelete = (index) => {
        let orderTotal = (parseFloat(state.order.orderTotal) - parseFloat(state.order.itemsOrdered[index].price)).toFixed(2);
        state.order.itemsOrdered.splice(index, 1);
        state.setOrder({ itemsOrdered: [...state.order.itemsOrdered], orderTotal: orderTotal })
    }

    const handleBeverageChange = (event) => {
        setIndex(event.target.value);
    }

    const handleBeverageAdd = () => {
        let items = state.order.itemsOrdered;
        let beverage = beverages[index];
        items.push({ type: beverage === "Red Bull" ? "Red Bull" : "Beverage", modifiers: [], price: beverage === "Red Bull" ? "2.50" : "1.50", comments: beverage });
        let orderTotal = (parseFloat(state.order.orderTotal) + parseFloat(beverage === "Red Bull" ? 2.50 : 1.50)).toFixed(2);
        state.setOrder({ itemsOrdered: [...items], orderTotal: orderTotal })
        store.addNotification({
            title: "Item Added",
            message: beverage + " Added To Cart.",
            type: "success",
            insert: "top",
            container: "top-center",
            dismiss: {
                duration: 1500,
            }
        })
    }

    const displayOnlineOrderFee = () => {
        return (parseFloat(state.order.orderTotal) * .04).toFixed(2);
    }

    const displayOrderTotal = () => {
        return ((parseFloat(state.order.orderTotal) * .04) + parseFloat(state.order.orderTotal)).toFixed(2)
    }
    const beverages = ['Coke', 'Red Bull', 'Sprite', 'Water']
    return (
        <div className="mobile">
            <div className="mobile-menu">
                <div class="tabs is-centered is-large">
                    <ul>
                        <li class={mobileTab === 0 ? "is-active" : ""}><a onClick={() => { setMobileTab(0) }}>Menu</a></li>
                        <li class={mobileTab === 1 ? "is-active" : ""}><a onClick={() => { setMobileTab(1) }}>Cart</a></li>
                    </ul>
                </div>
            </div>
            <div class="box">
                {mobileTab === 0 ?
                    <>
                        <h1 class="title">Build Your Own</h1>
                        {pizzasForMenu.Pizzas.map((pizza, i) =>
                            <>
                                {i === 1 ? <h1 class="title">Speciality Pizzas</h1> : null}
                                <CustomPizza order={{ order: state.order, setOrder: state.setOrder }} pizza={pizza} />
                            </>
                        )}
                        <h1 class="title">Beverages</h1>
                        <div class="field">
                            <div class="control">
                                <div class="select is-primary">
                                    <select value={index} onChange={(event) => handleBeverageChange(event)}>
                                        {beverages.map((beverage, index) =>
                                            <option value={index}>{beverage}-{beverage === "Red Bull" ? "2" : "1.50"}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="field">
                            <div class="control">
                                <button onClick={() => handleBeverageAdd()} class="button is-primary is-small">Add To Order</button>
                            </div>
                        </div>
                    </> :
                    <>
                        <div className="order-summary">
                            <h1 className="order-title">Your Order</h1>
                            <div className="order-summary-orders">
                                {state.order.itemsOrdered ? <>
                                    {state.order.itemsOrdered.map((item, i) =>
                                        <>
                                            <div className="order-summary-pizza-item">
                                                <div class="level is-mobile">
                                                    <div class="level-left">
                                                        <div class="level-item">
                                                            <h1>{i + 1}</h1>
                                                        </div>
                                                        <div class="level-item">
                                                            <h1 className="order-summary-pizza-title">{item.type !== "Beverage" ? item.type : item.comments}</h1>
                                                        </div>
                                                    </div>
                                                    <div class="level-right">
                                                        <div class="level-item">
                                                            <h1>${item.price}</h1>
                                                        </div>
                                                        <div class="level-item">
                                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(i)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {item.type !== "Beverage" && item.type !== "Red Bull" ?
                                                <>
                                                    {item.toppings.length > 0 ?
                                                        item.toppings.map((topping) =>
                                                            <div>{topping}</div>
                                                        ) : null}
                                                    {item.comments !== "" ? <div>Comments: {item.comments}</div> : null}
                                                </>
                                                : null}
                                        </>
                                    )}
                                </> : null}
                            </div>
                            <div>
                            <div class="level is-mobile">
                                <div class="level-left">
                                    <div class="level-item">
                                        <div className="order-summary-pizza-title">Online Ordering Fee</div>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <div class="level-item">
                                        <div>${displayOnlineOrderFee()}</div>
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
                                        <div>${displayOrderTotal()}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="level is-mobile">
                                {parseInt(state.order.orderTotal) !== 0 ? <Link to="/checkout">
                                    <button class="button is-primary">Place Order</button>
                                </Link> : null}
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