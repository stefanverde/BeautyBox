import React from "react";
import {useBasketStore} from "../store/BasketStore"
import dayjs from "dayjs";

const ShoppingCart = () => {
    const { basket, removeFromBasket, clearBasket } = useBasketStore(); // Get Zustand state and actions

    return (
        <section className="basket-section">
            <h2>Your Basket</h2>
            {basket.length > 0 ? (
                <div className="basket-list">
                    {basket.map((item) => (
                        <div key={item.id} className="basket-item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="price">${item.price}</p>
                            <p>{dayjs(item.selectedDate).format("MMMM D, YYYY")}</p>
                            <button onClick={() => removeFromBasket(item.id)}>Remove</button>
                        </div>
                    ))}
                    <button onClick={clearBasket} className="clear-basket">Clear Basket</button>
                </div>
            ) : (
                <p className="empty-message">Your basket is empty.</p>
            )}
        </section>
    );
};

export default ShoppingCart;
