import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Article from "../models/Article";
import "../styles/ArticleCard.css";


const ArticleCard = ({ scale, position, articleScene, tag, description }) => {


    return (
        <div className="ArticleCard">
            <div className="articleTagContainer">
                <span>{tag}</span>
            </div>
            <Canvas className="articleCanvas">
                <OrbitControls enableZoom={false} target={[0, 0, 0]} />
                <directionalLight />
                <ambientLight />
                <pointLight />
                <spotLight />
                <hemisphereLight /> 
                <Article 
                    scale={scale} 
                    position={position}
                    articleScene={articleScene} 
                    tag={tag}
                    description={description}
                />
            </Canvas>
        </div>
    )
}


export default ArticleCard;