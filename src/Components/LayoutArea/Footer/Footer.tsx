
import React from "react";
import SocialMedia from "../../SharedArea/SocialMedia/SocialMedia";
import "./Footer.css";

function Footer(): JSX.Element {
    return (
        <div className="Footer flex-around fade-up">
            <span>All rights reserved to Daniel Rosman 2023 &copy;</span>
            <SocialMedia />
        </div>
    );
}

export default Footer;
