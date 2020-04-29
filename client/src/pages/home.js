import React, { useEffect } from "react";
import Img from "react-image";
import {
    Link
} from "react-router-dom";
import Banner from "../components/banner";

const HomePage = (props) => {
    return (
        <>
            <Banner event={props.event}/>
            <div style={{ height: "80vh" }} class="container">
                <div class="box">
                    <div class="columns">
                        <div class="column is-9">
                            <figure class="image is-4-by-3">
                                <Img alt="pizza-truck" src={require("./doughboys-new.jpg")} />
                            </figure>
                        </div>
                        <div class="column is-3">
                            <h1 className="homepage-title">"It's doughlicous!"</h1>
                            <p className="intro-paragraph">We're a St. Louis based food truck creating delicious wood fired pizza in 3 minutes or less. Click the order now button to schedule your pick up time and skip the line at our next event. </p>
                            <div className="order-now-button">
                                <Link to="order-now">
                                    <button class="button is-large is-primary">Order Now!</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage