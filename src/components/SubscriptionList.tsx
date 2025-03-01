import { Colors } from "../utils/ColorPalette";
import {Subscription} from "../pages/Services";
import {useEffect, useState} from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useBasketStore} from "../store/BasketStore";


type SubscriptionListProps = {
    title: string;
    data: Subscription[];
};

const isAdmin = () => {
    return localStorage.getItem('AdminStorage') !== null;
};

const SubscriptionList = ({ title, data }:SubscriptionListProps) => {

    const [admin, setAdmin] = useState(false);
    const addToBasket = useBasketStore((state) => state.addToBasket);
    useEffect(() => {
        setAdmin(isAdmin());
    }, []);

    const handleAddToBasket = (item: Subscription) => {
        addToBasket(item);
        console.log(`Added to basket: ${item.name}`);
    };

    const handleDelete = (id:any) => {
        // Implement delete functionality here
        console.log(`Delete item with id: ${id}`);
    };

    const handleEdit = (id:any) => {
        // Implement edit functionality here
        console.log(`Edit item with id: ${id}`);
    };

    return (
        <div>
            <h2
                style={{
                    color: `${Colors.White}`,
                    textShadow: "2px 2px #000000",
                }}
            >
                {title.toUpperCase()}
            </h2>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    justifyContent: "center",
                    padding: "20px 0",
                }}
            >
                {data.map((item:Subscription) => {
                    return (
                        <div
                            key={item.id}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                                width: "200px",
                                padding: "20px",
                                border: "1px solid black",
                                borderRadius: "10px",
                                backgroundColor: "#f8f9fa",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = "scale(1.05)";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLDivElement).style.transform = "scale(1)";
                                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
                            }}
                        >
                            <h3 style={{color: Colors.White}}>{item.name}</h3>
                            <p style={{textAlign: "center", marginBottom: "10px"}}>
                                {item.description}
                            </p>
                            <p style={{fontWeight: "bold", marginBottom: "15px"}}>
                                {item.price} RON
                            </p>
                            <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
                            {admin && (<DeleteIcon
                                style={{marginRight: '10px', cursor: 'pointer'}}
                                onClick={() => handleDelete(item.id)}/>)}

                            <button
                                style={{
                                    padding: "10px 20px",
                                    backgroundColor: Colors.White,
                                    color: "white",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#444";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = Colors.White;
                                }}
                                onClick={() => handleAddToBasket(item)}
                            >
                                Adaugă în Coș
                            </button>
                            {admin && (<EditIcon
                                style={{marginLeft: '10px', cursor: 'pointer'}}
                                onClick={() => handleEdit(item.id)}/>)}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SubscriptionList;