import { toast } from "react-toastify"

export function getApi() {
    return "http://localhost:8080/api"
}

export function addToCart(token, article) {
    fetch(getApi() + `/cart/add`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ article })
    }).then((res) => {
        if (res.ok) {
            toast.success("Added to Cart!")
        } else {
            res.text().then(text => toast.error(text));
        }
    })
}

export function removeFromCart(token, article) {
    fetch(getApi() + `/cart/remove`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ article })
    }).then((res) => {
        if (res.ok) {
            toast.success("Item removed!")
        } else {
            res.text().then(text => toast.error(text));
        }
    })
}