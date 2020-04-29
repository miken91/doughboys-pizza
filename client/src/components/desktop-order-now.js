import React, { useContext } from "react";
import CustomPizza from "../components/custom-pizza";
import ApplicationContext from "../ApplicationContext";
import {
    Link
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
let pizzasForMenu = require('./pizzasForMenu.json');

function DesktopOrderNow() {
    const state = useContext(ApplicationContext);
    const handleDelete = (index) => {
        let orderTotal = (parseFloat(state.order.orderTotal) - parseFloat(state.order.pizzasOrdered[index].price)).toFixed(2);
        state.order.pizzasOrdered.splice(index, 1);
        state.setOrder({ pizzasOrdered: [...state.order.pizzasOrdered], orderTotal: orderTotal })
    }
    const beverages = ['Coke', 'Red Bull', 'Sprite', 'Water']
    return (
        <div className="desktop">
            <div class="box columns">
                <div class="column is-8 is-mobile">
                    <div class="columns">
                        <div class="column is-8 is-mobile">
                            <h1 class="title">Build Your Own</h1>
                            {pizzasForMenu.Pizzas.map((pizza, i) =>
                                <>
                                    {i === 1 ? <h1 class="title" style={{ marginTop: "1.5em" }}>Speciality Pizzas</h1> : null}
                                    <CustomPizza order={{ order: state.order, setOrder: state.setOrder }} pizza={pizza} />
                                </>
                            )}
                            {/* <h1 class="title">Beverages</h1>
                            <div class="field">
                                <div class="control">
                                    <div class="select is-primary">
                                        <select>
                                            {beverages.map((beverage, i) =>
                                                <option>{beverage}</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <button class="button is-primary is-small">Add To Order</button>
                                </div>
                            </div> */}
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
                                                        <h1>${pizza.price}</h1>
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
                                        <div className="order-summary-pizza-title">Order Total</div>
                                    </div>
                                </div>
                                <div class="level-right">
                                    <div class="level-item">
                                        <div>${parseFloat(state.order.orderTotal).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="level is-mobile">
                                <div class="level-right">
                                    {parseInt(state.order.orderTotal) !== 0 ? <Link to="/checkout">
                                        <button class="button is-primary">Place Order</button>
                                    </Link> : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesktopOrderNow;