import React from "react";
import { useNavigate } from "react-router-dom";


const ArticlePreview = (props) => {

    const navigate = useNavigate();
  
    return (
        <div className="ArticlePreview" onClick={() => navigate(`/article/${props.navigation}`)}>
           <img src={props.previewImage} alt="" />
        </div>
    ) 
};  

export default ArticlePreview;