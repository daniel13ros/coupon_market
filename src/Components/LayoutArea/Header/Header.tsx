import React, { useState } from "react";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Clock from "../../SharedArea/Clock/Clock";
import "./Header.css";

function Header(): JSX.Element {


    return (
        <div className="Header flex-around fade-down">

            <div className="flip-box">
                <div className="flip-box-inner">
                    <div className="flip-box-front">
                    <img className="couponIcon1" src="https://media.giphy.com/media/J147q8Ip0EmLQFJOPZ/giphy.gif" alt="coupon icon" />
                    </div>
                    <div className="flip-box-back">
                    <img className="couponIcon2" src="https://media.giphy.com/media/sr8jYZVVsCmxddga8w/giphy.gif" alt="coupon icon" />
                    </div>
                </div>
            </div>

            <h1>Coupons Market</h1>
            <AuthMenu />
        </div>
    );
}

export default Header;
