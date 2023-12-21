import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import "../styles/SignIn.css";
import { ToastContainer, toast } from "react-toastify";
import { getApi } from "./ApiUrl";
import { useNavigate } from "react-router-dom";
import AnimatedArticle from "../models/AnimatedArticle";


const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        const bodyData = {
            username: username,
            password: password
        }

        fetch(getApi() + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then((res) => res.json())
        .then((data) => {
            if (data.token) {
                localStorage.setItem("jwtToken", data.token);
                window.location = "/";
            } else {
                toast.error(data)
            }
        })
    }


    return (
        <div className="SignIn">
            <ToastContainer />
            <div className="signInCanvasContainer">
                <Canvas>
                    <directionalLight />
                    <ambientLight />
                    <pointLight />
                    <spotLight />
                    <hemisphereLight /> 
                    <AnimatedArticle 
                        scale={[0.4, 0.4, 0.4]}
                        rotation={[0, Math.PI / 2.4, 0]}
                        position={[0, -24, -40]}
                        articleScene={getApi() + `/articles/fox.glb`}
                    />
                </Canvas>
            </div>
            <form className="signInContainer" onSubmit={handleLogin}>
                <div>
                    <label>Username</label>
                    <input 
                        type="text"
                        placeholder="Type here..."
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />                    
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Type here..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <p>No Account? Click <a href="/sign-up">here</a> to sign up!</p>
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    )
}


export default SignIn;