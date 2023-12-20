import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart, getApi } from "./ApiUrl";
import ArticleCard from "./ArticleCard";
import "../styles/ProductView.css";
import { ToastContainer, toast } from "react-toastify";
import { formatCentToEuro } from "./Formats";


const ProductView = () => {

    const [articles, setArticles] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(getApi() + `/article/${id}`)
            .then((res) => res.json())
            .then((data) => setArticles(data))
    }, [])

    const handleAddToCart = (article) => {
        const token = localStorage.getItem('jwtToken');
        
        if (token) {
            addToCart(token, article)
        } else {
            toast.error("Login to add Items to the Cart!")
        }
    }

    return (
        <div className="ProductView">
            <ToastContainer />
            <div className="productViewContainer">
                {articles.length > 0 && articles.map((article) => (
                    <ArticleCard 
                        key={article._id}
                        articleScene={getApi() + "/articles/" + article.sceneUrl}
                    />
                ))}  
            </div>
            {articles.length > 0 && (            
                <div className="productInfoContainer">
                    <div className="productInfoHeaderContainer">
                        <h1>{articles[0].title}</h1>
                        <p>{formatCentToEuro(articles[0].price)}</p>
                    </div>    
                    <div className="productInfoTextContainer">
                        <p>{articles[0].description}</p>
                    </div>  
                    <div className="productBuyButtonContainer">
                        <p onClick={() => handleAddToCart(articles[0])}>Add to Cart <span><ion-icon name="cart-outline"></ion-icon></span></p>                     
                    </div>              
                </div>
            )}           
        </div>
    )
}

export default ProductView;