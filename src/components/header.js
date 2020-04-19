import React from "react"
import {
    Link
} from "react-router-dom";

const Header = () => (
    <>
        <div class="columns" className="header">
            <div class="column is-2 is-offset-5">
                <Link to="/">
                    <h1 className="brand-title">Doughboy's</h1>
                    <h1 className="brand-title">Wood Fired Pizza</h1>
                </Link>
                <div class="level is-mobile">
                <div class="level-item">
                    <Link to="/order-now">
                        <h1 className="header-menu">Order Now</h1>
                    </Link>
                </div>
                <div class="level-item">
                    <Link to="/contact">
                        <h1 className="header-menu">Contact</h1>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    </>
)

export default Header