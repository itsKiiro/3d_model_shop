import React, { useState, useEffect } from "react";
import "../styles/NewArrivals.css";
import { getApi } from "./ApiUrl";
import ArticleCard from "./ArticleCard";
import ArticlePreview from "../models/ArticlePreview";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(getApi() + "/articles")
        .then((res) => res.json())
        .then((data) => {
            const filteredData = data.filter((article) => article.tags && article.tags[0] === "New");
            setArticles(filteredData);
        });
    }, []);

    return (
        <div className="NewArrivals">
            <div className="newArrivalsHeaderContainer">
                <h2>New Arrivals</h2>
                <p>view all</p>
            </div>
            <div className="newArticlesContainer">
                {articles.length > 0 && articles.map((article) => (
                    <div key={article._id} className="newArticleContainer" onClick={() => navigate(`/article/${article._id}`)}>
                        <ArticlePreview
                            previewImage={getApi() + "/articles/" + article.previewImage} 
                            tag={article.tags[0]}
                            description={article.description}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NewArrivals;