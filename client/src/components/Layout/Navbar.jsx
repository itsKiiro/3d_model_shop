import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { getApi, removeFromCart } from "../ApiUrl";
import { ToastContainer, toast } from "react-toastify";
import { formatCentToEuro } from "../Formats";

const Navbar = () => {
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);
    const [showUserSidebar, setShowUserSidebar] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');

        if (token) {
            fetch(getApi() + "/cart/get", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
                .then((res) => res.json())
                .then((data) => setCart(data))
                .catch((error) => {
                    console.error("Error fetching data: ", error);
                });            
        }

    }, [cart])

    const handleCartClick = () => {
        setShowUserSidebar(false);
        setShowCart(prev => !prev);
    };

    const handleRemoveFromCart = (article) => {
        const token = localStorage.getItem('jwtToken');
        
        if (token) {
            removeFromCart(token, article)
        } else {
            toast.error("Error while removing Article")
        }
    }
    
    const handleSearchClick = () => {
        const searchElement = document.getElementById("SearchBar");
        if (searchElement) {
            searchElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleUserClick = () => {
        const token = localStorage.getItem('jwtToken');
    
        if (token) {
            setShowCart(false);
            setShowUserSidebar(prev => !prev);
        } else {
            navigate("/login");
        }
    };

    const handleLogout = () => {
        setShowUserSidebar(false);
        localStorage.removeItem("jwtToken");
        navigate("/login")
    }

    const handleCheckout = () => {
        if (cart.length > 0) {
            fetch(getApi() + "/create/checkout/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ items: cart })
            }).then(async (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    const json = await res.json();
                    return await Promise.reject(json);
                }
            }).then(({ url }) => {
                window.location = url;
            }).catch((e) => {
                console.error(e.error)
            })
        } else {
            toast.error("Cart is empty!")
        }
    }
    

    return (
        <div className="Navbar">
            <div className="navLinksContainer">
                <ul className="navLinks">
                    <li className="navLink" onClick={() => navigate("/")}>Shop</li>
                    <li className="navLink" onClick={() => navigate("/")}>Products</li>
                    <li className="navLink" onClick={() => navigate("/")}>About</li>
                    <li className="navLink" onClick={() => navigate("/")}>Guide</li>
                </ul>
            </div>
            <div className="logoContainer" onClick={() => navigate("/")}>
                <h2>Logo</h2>
            </div>
            <div className="iconsContainer">
                <div className="iconContainer" onClick={handleSearchClick}>
                    <ion-icon name="search-outline"></ion-icon>
                </div>
                <div className="iconContainer" onClick={handleUserClick}>
                    <ion-icon name="person-outline"></ion-icon>
                </div>
                <div className="iconContainer" onClick={handleCartClick}>
                    <ion-icon name="cart-outline"></ion-icon>
                    <div className="cartIndicator" style={{ display: cart.length > 0 ? "flex" : "none" }}></div>
                </div>
            </div>

            <div className={`cartSidebar ${showCart ? "open" : ""}`}>
                {cart.map((article) => (
                    <div className="cartItemContainer" key={article._id}>
                        <div className="cartItemImgContainer">
                            <img src={getApi() + "/articles/" + article.previewImage} />
                        </div>
                        <div className="cartItemInfoContainer">
                            <h4>{article.title}</h4>
                            <p>{formatCentToEuro(article.price)}</p>
                            <button onClick={() => handleRemoveFromCart(article)}>Remove</button>
                        </div>
                    </div>
                ))}
                <div className="checkOutContainer">
                    <p>Total: {formatCentToEuro(cart.reduce((acc, item) => acc + item.price, 0))}</p>
                    <button onClick={handleCheckout}>Check Out</button>
                </div>
            </div>

            <div className={`userSidebar ${showUserSidebar ? "open" : ""}`}>
                <div className="userInteractionContainer">
                    <h4>Welcome</h4>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>

        </div>
    )
}


export default Navbar;