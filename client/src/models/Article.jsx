import React from "react";
import { useGLTF } from "@react-three/drei";


const Article = (props) => {
    const { scene } = useGLTF(props.articleScene);
  
    return <primitive object={scene} />;
};  

export default Article;