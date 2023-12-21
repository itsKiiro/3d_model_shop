import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from 'three';


const AnimatedArticle = (props) => {
    const { scene, animations } = useGLTF(props.articleScene);
    const { ref, mixer } = useAnimations(animations);

    useEffect(() => {
        if (animations.length > 0) {
            const action = mixer.clipAction(animations[0], ref.current);

            action.play()
        }
    }, [mixer, animations, ref, props.animationSection]);

  
    return (
        <primitive 
            ref={ref} 
            object={scene} 
            position={props.position} 
            rotation={props.rotation} 
            scale={props.scale} 
        />
    )
};  

export default AnimatedArticle;