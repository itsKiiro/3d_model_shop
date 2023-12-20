import React, { useState } from "react";
import "../styles/SignUpImpl.css";
import { getApi } from "./ApiUrl";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const SignUpImpl = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");

    const navigate = useNavigate();


    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            toast.error("Password must equal confirmed Password!")
            return;
        }

        const bodyData = {
            username: username,
            email: email,
            password: password
        }

        fetch(getApi() + "/sign-up", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyData)
        }).then((res) => {
            if (res.ok) {
                toast.success("User created!")                
                navigate("/login")
            } else {
                toast.error("Creating new User failed!")
            }
        })
    }


    return (
        <div className="SignUpImpl">
            <ToastContainer />
            <form className="signUpContainer" onSubmit={handleSignUp}>
                <div>
                    <label>Username</label>
                    <input 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Type here..."
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Type here..."
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}     
                        placeholder="Type here..."               
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input 
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}     
                        placeholder="Type here..."              
                    />
                </div>
                <div>
                    <p>Already have an Account? Click <a href="/login">here</a> to Sign in!</p>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    )
}

export default SignUpImpl;