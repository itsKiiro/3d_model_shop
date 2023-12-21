import React, { useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";


const AnimatedArticle = (props) => {
    const { scene, animations } = useGLTF(props.articleScene);
    const { ref, mixer, names } = useAnimations(animations);

    useEffect(() => {
        if (names.length > 0) {
            mixer.clipAction(animations[0], ref.current).play();
        }
    }, [mixer, names, animations, ref]);

    const playSection = (start, end) => {
        if (actionRef.current) {
            actionRef.current.reset().setLoop(THREE.LoopRepeat, Infinity)
                .startAt(start).endAt(end).play();
        }
    };
  
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