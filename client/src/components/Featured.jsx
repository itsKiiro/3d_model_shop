import React, { useEffect, useState } from "react";
import "../styles/Featured.css";
import { getApi, addToCart } from "./ApiUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ArticlePreview from "../models/ArticlePreview";
import { useNavigate } from "react-router-dom";
import { formatCentToEuro } from "./Formats";


const Featured = () => {
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(getApi() + "/articles")
        .then((res) => res.json())
        .then((data) => {
            const filteredData = data.filter((article) => article.tags && article.tags[0] === "Featured");
            setArticles(filteredData);
        });
    }, []);
    
    const handleAddToCart = (article) => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            addToCart(token, article)
            
        } else {
            toast.error("Login to add Items to the Cart!")
        }

    }

    return (
        <div className="Featured">
            <ToastContainer />
            <div className="featuredHeaderContainer">
                <h2>Featured</h2>
                <p>view all</p>
            </div>
            <div className="featuredArticlesContainer">
                {articles.length > 0 && articles.map((article) => (
                    <div key={article._id} className="featuredArticleContainer">
                        <ArticlePreview 
                            navigation={article._id}
                            previewImage={getApi() + "/articles/" + article.previewImage} 
                            tag={article.tags[0]}
                            description={article.description}
                        />
                        <div className="featuredArticleInfoContainer">
                            <p>{article.title}</p>
                            <p>{formatCentToEuro(article.price)}</p>
                        </div>
                        <div className="featuredArticleBuyContainer">
                            <p>Made by Marcel</p>
                            <p className="featuredBuyButton" onClick={() => handleAddToCart(article)}>Buy</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default Featured;