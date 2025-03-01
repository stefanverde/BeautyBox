import React from "react";
import { useBasketStore } from "../store/BasketStore";
import dayjs from "dayjs";
import "../components/styles.css"
const ShoppingCart = () => {
    const { basket, removeFromBasket } = useBasketStore();

    return (
        <div className="shopping-cart">
            <div className="cart-header">
                <h2>Your Basket</h2>
            </div>
            {basket.length > 0 ? (
                <div className="cart-items">
                    {basket.map((item) => (
                        <div key={item.id} className="cart-item">
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="price">${item.price}</p>
                                {item.duration ? (
                                    <p>
                                        <strong>Subscription Duration:</strong> {item.duration} {item.duration === 1 ? "Month" : "Months"}
                                        <br />
                                        <strong>From:</strong> {dayjs(item.selectedDate).format("MMMM D, YYYY")}
                                        <br />
                                        <strong>To:</strong> {dayjs(item.endDate).format("MMMM D, YYYY")}
                                    </p>
                                ) : (
                                    <p>
                                        <strong>Selected Date:</strong> {dayjs(item.selectedDate).format("MMMM D, YYYY")}
                                    </p>
                                )}
                            </div>
                            <button className="remove-button" onClick={() => removeFromBasket(item.id)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="empty-message">Your basket is empty.</p>
            )}
        </div>
    );
};

export default ShoppingCart;