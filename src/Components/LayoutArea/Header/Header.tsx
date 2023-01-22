import React from "react";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Clock from "../../SharedArea/Clock/Clock";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header flex-around fade-down">
            <img className="couponIcon" src="https://cdn-icons-png.flaticon.com/128/9408/9408633.png" alt="coupon icon" />
			<h1>Coupons Market</h1>
            <AuthMenu/>
        </div>
    );
}

export default Header;
