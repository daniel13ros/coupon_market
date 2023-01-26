import "./SocialMedia.css";
import { FaLinkedin, FaGit } from "react-icons/fa";
import React from "react";
function SocialMedia(): JSX.Element {
    return (
        <div className="SocialMedia">
            <a className="social-icon" href="https://www.linkedin.com/">
            <FaLinkedin size={42} className="custom-image" />
            </a>
            <a className="social-icon" href="https://github.com/">
            <FaGit size={42} className="custom-image" />
            </a>
            
        </div>
    );
}

export default SocialMedia;
