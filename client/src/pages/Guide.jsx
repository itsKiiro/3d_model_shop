import React from "react";
import "../styles/Guide.css";


const Guide = () => {


    return (
        <div className="Guide">
            <div className="guideContainer">
                <div className="guideHeaderContainer">
                    <h1>How To:</h1>
                    <p>This website is in test mode. Real money won't be charged.</p>
                    <p className="guideInfoText">If you want one of the products or want to see the functionality of this site do following:</p>
                </div>  

                <ul className="guideList">
                    <li className="guideListInfo">Create an Account by clicking on the person icon in the navbar</li>
                    <li className="guideListInfo">Add products to your cart</li>
                    <li className="guideListInfo">Open your cart by clicking the cart icon and press checkout</li>
                    <li className="guideListInfo">Use "4242 4242 4242 4242" as your card number</li>
                    <li className="guideListInfo">The products will be send to the email you used at the checkout</li>
                </ul>              
            </div>

        </div>
    )
}

export default Guide;