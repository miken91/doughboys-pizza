import React, { useState } from 'react';
import { store } from 'react-notifications-component';
import { isMobile } from 'react-device-detect';

function CustomPizza(props) {
    const [checkedItems, setCheckedItems] = useState(props.pizza.toppings);
    const [selectedRadioButton, setSelectedRadioButton] = useState(props.pizza.sauceOptions[0]);
    const [additionalComments, setAdditionalComments] = useState("");

    function mapToppingsToSquareModifiers() {
        let toppings = [];
        Object.keys(props.pizza.toppings).forEach(topping => {
            if(props.pizza.type === "Cheese") {
                if(checkedItems[topping]) {
                    toppings.push(topping === "No Cheese" ? topping :"Add " + topping);
                } 
            } else {
                if(!checkedItems[topping] && topping !== "No Cheese") {
                    toppings.push("No " + topping);
                } else if(checkedItems[topping] && topping === "No Cheese") {
                    toppings.push(topping);
                }
            }  
        });
        if(props.pizza.type === "Cheese") {
            toppings.push(selectedRadioButton);
        }
        return toppings
    }

    const handleClick = () => {
        let orders = props.order.order.pizzasOrdered;
        let pizzaTotal;
        if (props.pizza.type === "Cheese") {
            pizzaTotal = ((Object.keys(checkedItems).filter(k => checkedItems[k] && k !== "No Cheese").length * .50) + 7).toFixed(2);
        } else {
            pizzaTotal = props.pizza.price.toFixed(2);
        }
        orders.push({ type: props.pizza.type, sauce: selectedRadioButton, toppings: mapToppingsToSquareModifiers(), comments: additionalComments, price: pizzaTotal })
        let orderSubTotal = (parseFloat(props.order.order.orderSubTotal) + parseFloat(pizzaTotal)).toFixed(2);
        let orderTax = (parseFloat(orderSubTotal * .08363)).toFixed(2);
        let orderTotal = (parseFloat(orderSubTotal) + parseFloat(orderTax)).toFixed(2);
        props.order.setOrder({ pizzasOrdered: [...orders], orderSubTotal: orderSubTotal, orderTax: orderTax, orderTotal: orderTotal})
        if (isMobile) {
            store.addNotification({
                title: "Item Added",
                message: props.pizza.type + " Pizza Added To Cart.",
                type: "success",
                insert: "top",
                container: "top-center",
                dismiss: {
                    duration: 1500,
                }
            })
        }
        setCheckedItems(props.pizza.toppings);
        setSelectedRadioButton("Pizza Sauce");
        setAdditionalComments("");
    }

    const handleCheckBoxChange = (event) => {
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }

    return (
        <div className="field" style={{marginBottom: "2em"}}>
            <h1 className="pizza-title">
                {props.pizza.type} - {props.pizza.price}
            </h1>
            {props.pizza.sauceOptions.length > 1 ?
                <>
                    <label class="label">Sauce</label>
                    <div class="control">
                        {props.pizza.sauceOptions.map((sauce) =>
                            <>
                                <label class="radio">
                                    <input type="radio" value={sauce} checked={selectedRadioButton === sauce} onChange={(event) => setSelectedRadioButton(event.target.value)} />
                                    {sauce}
                                </label>
                            </>
                        )}
                    </div>
                </>
                : null}
            <label class="label">{props.pizza.type === "Cheese" ? "Add toppings .50 each" : props.pizza.sauceOptions[0] + " with checked toppings below."}</label>
            <div class="field is-grouped is-grouped-multiline">
                {Object.keys(props.pizza.toppings).map((topping) =>
                    <div class="control">
                        <label class="checkbox">
                            <input type="checkbox" name={topping} checked={checkedItems[topping]} onChange={handleCheckBoxChange} />
                            {topping}
                        </label>
                    </div>
                )}
            </div>
            <label class="label">Additional Comments</label>
            <div class="field">
                <div class="contorl">
                    <textarea class="textarea has-fixed-size" value={additionalComments} onChange={(event) => setAdditionalComments(event.target.value)}></textarea>
                </div>
            </div>
            <button class="button is-primary is-small" onClick={handleClick}>Add To Order</button>
        </div>
    )
}

export default CustomPizza