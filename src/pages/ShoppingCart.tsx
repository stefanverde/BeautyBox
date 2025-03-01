import React from "react";
import { useBasketStore } from "../store/BasketStore";
import dayjs from "dayjs";

const ShoppingCart = () => {
    const { basket, removeFromBasket } = useBasketStore();

    return (
        <div>
            <h2>Your Basket</h2>
            {basket.length > 0 ? (
                <div className="basket-list">
                    {basket.map((item) => (
                        <div key={item.id} className="basket-item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p className="price">${item.price}</p>
                            {item.startDate && item.endDate && (
                                <p>
                                    Duration: {item.duration} months
                                    <br />
                                    From: {dayjs(item.startDate).format("MMMM D, YYYY")}
                                    <br />
                                    To: {dayjs(item.endDate).format("MMMM D, YYYY")}
                                </p>
                            )}
                            <button onClick={() => removeFromBasket(item.id)}>Remove</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Your basket is empty.</p>
            )}
        </div>
    );
};

export default ShoppingCart;
