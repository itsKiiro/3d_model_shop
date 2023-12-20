import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from '@react-three/fiber';

import skyBoxScene from "../assets/skybox.glb";

const SkyBox = () => {
    const { scene } = useGLTF(skyBoxScene);
  
  
    return <primitive object={scene} scale={[7, 7, 7]} />;
};  

export default SkyBox;
