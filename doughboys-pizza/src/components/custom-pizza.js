import React, { useState } from 'react';

function CustomPizza(props) {
    const [checkedItems, setCheckedItems] = useState(props.pizza.toppings);
    const [selectedRadioButton, setSelectedRadioButton] = useState(props.pizza.sauceOptions[0]);
    const [additionalComments, setAdditionalComments] = useState("");
    const handleClick = () => {
        let orders = props.order.order.pizzasOrdered;
        let total;
        if (props.pizza.type === "Cheese") {
            total = ((Object.keys(checkedItems).filter(k => checkedItems[k]).length * .50) + 5).toFixed(2);
        } else {
            total = props.pizza.price.toFixed(2);
        }
        orders.push({ type: props.pizza.type, sauce: selectedRadioButton, toppings: Object.keys(checkedItems).filter(k => checkedItems[k]), comments: additionalComments, price: total })
        props.order.setOrder({ pizzasOrdered: [...orders], orderTotal: (parseFloat(props.order.order.orderTotal) + parseFloat(total)).toFixed(2) })
        setCheckedItems(props.pizza.toppings);
        setSelectedRadioButton("Pizza Sauce");
        setAdditionalComments("");
    }
    const handleCheckBoxChange = (event) => {
        setCheckedItems({ ...checkedItems, [event.target.name]: event.target.checked });
    }
    return (
        <div className="field">
            <h1 className="pizza-title">
                {props.pizza.type} - {props.pizza.price}
            </h1>
            <label class="label">Sauce</label>
            {props.pizza.sauceOptions.length > 1 ?
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
                : <div>{props.pizza.sauceOptions[0]}</div>}
            <label class="label">Toppings {props.pizza.type === "Cheese" ? "- 0.50" : ""}</label>
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
                    <textarea class="textarea has-fixed-size"value={additionalComments} onChange={(event) => setAdditionalComments(event.target.value)}></textarea>
                </div>
            </div>
            <button class="button is-primary is-small" onClick={handleClick}>Add To Order</button>
        </div>
    )
}

export default CustomPizza