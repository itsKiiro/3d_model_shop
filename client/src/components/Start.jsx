import React, { useState, useRef, useEffect } from "react";
import "../styles/Start.css";
import { getApi } from "./ApiUrl";
import ArticlePreview from "../models/ArticlePreview";
import { useNavigate } from "react-router-dom";

const Start = () => {

    const [articles, setArticles] = useState([]);

    const navigate = useNavigate();


    useEffect(() => {
        fetch(getApi() + "/articles")
        .then((res) => res.json())
        .then((data) => setArticles(data));
    })


    return (
        <div className="Start">
            <div className="leftSideContainer">
                <div className="startHeaderContainer">
                    <h1>3d Models made by hand</h1>
                </div>
                <div className="startInfoContainer">
                    <p className="startInfoText">Every 3D model displayed here is a creation of my own hands; for detailed information on how to get a product, please refer to the provided guide.</p>
                </div>
                <div className="startButtonContainer">
                    <ul className="startButtons">
                        <li className="startButton">Shop now</li>
                        <li className="startButton" onClick={() => navigate("/guide")}>
                            <span>Guide</span>
                            <ion-icon name="arrow-forward-outline"></ion-icon>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="rightSideContainer">
                {articles.length > 0 && articles.map((article) => (
                    <div key={article._id} className="startArticleContainer" onClick={() => navigate(`/article/${article._id}`)}>
                        <div className="startTagContainer">
                            <span>{article.tags[0]}</span>
                        </div>
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


export default Start;