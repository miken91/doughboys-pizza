import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const HomePage = () => {
    return(
        <div style={{height: "80vh"}} class="container">
            <div class="box">
                <div class="columns">
                    <div class="column is-9">
                        <figure class="image is-4-by-3">
                            <img src={require("./doughboys-new.jpg")}/>
                        </figure>
                    </div>
                    <div class="column is-3">
                        <h1 className="homepage-title">"It's doughlicous!"</h1>
                        <p className="intro-paragraph">We're a St.Louis based food truck creating delicious woodfired pizza in 2 minutes or less. We are also now serving frozen pizzas every weekend at our comissary.</p>
                        <div className="order-now-button">
                            <Link to="order-now">
                                <button class="button is-large is-primary">Order Now!</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage