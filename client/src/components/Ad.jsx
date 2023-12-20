import React from "react";
import "../styles/Ad.css";

const Ad = () => {


    return (
        <div className="Ad">
            <div className="adContainer">
                <div className="adHeaderContainer">
                  <h1>Visit karall.dev for more projects.</h1>  
                </div>
                <div className="adLinksContainer">
                    <div className="adLinkContainer">
                        <ion-icon name="logo-linkedin"></ion-icon>
                        <span>Linked In</span>
                    </div>
                    <div className="adLinkContainer">
                        <ion-icon name="globe-outline"></ion-icon>
                        <span>karall.dev</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ad;