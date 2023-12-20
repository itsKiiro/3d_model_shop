import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SuccessPage.css";
import { getApi } from '../components/ApiUrl';

const SuccessPage = () => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(5);

    useEffect(() => {
        clearCart();
        const interval = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);

        setTimeout(() => navigate('/'), 5000);

        return () => clearInterval(interval);
    }, [navigate]);

    const clearCart = () => {
        const token = localStorage.getItem("jwtToken");

        fetch(getApi() + `/cart/remove/all`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
        })
    }

    return (
        <div className='SuccessPage'>
            <div>
                <h1>Danke für deinen Einkauf!</h1>
                <p>Du wirst in {counter} Sekunden weitergeleitet...</p>                
            </div>
        </div>
    );
};

export default SuccessPage;
