import "./SocialMedia.css";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import React from "react";
function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <FaFacebook size={42} className="custom-image" />
            <FaLinkedin size={42} className="custom-image" />
            <FaInstagram size={42} className="custom-image" />
        </div>
    );
}

export default SocialMedia;
