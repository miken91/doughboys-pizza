import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Header = () => (
    <>
        <div class="columns" className="header">
            <div class="column is-2 is-offset-5">
                <Link to="/">
                    <h1 className="brand-title">Doughboy's</h1>
                    <h1 className="brand-title">Woodfired Pizza</h1>
                </Link>
                <div class="level is-mobile">
                    <Link to="/order-now">
                        <div class="level-item"><h1 className="header-menu">Order Now</h1></div>
                    </Link>
                    <Link to="/contact">
                        <div class="level-item"><h1 className="header-menu">Contact</h1></div>
                    </Link>
                </div>
            </div>
        </div>
    </>
)

export default Header