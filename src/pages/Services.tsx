// Services.tsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import SubscriptionList from "../components/SubscriptionList";
import DropdownMenu from "../components/DropdownMenu"; // Import the updated DropdownMenu

export type Subscription = {
    name: string;
    description: string;
    price: number;
    id: string;
    category: string;
    selectedDate: Date;

};

const Services = () => {
    const [perSedintaArr, setPerSedintaArr] = useState<Subscription[]>([]);
    const [abonamentLunarArr, setAbonamentLunarArr] = useState<Subscription[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Example fetch data logic here
                // const perSedintaData = await fetchCategories("per sedinta");
                // setPerSedintaArr(perSedintaData);

                // const abonamentLunarData = await fetchCategories("abonament lunar");
                // setAbonamentLunarArr(abonamentLunarData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    // Hardcoded categories for services
    const categories = {
        "Per Sedinta": ["Laminare", "Makeup", "Tratamente Faciale"],
        "Abonament": ["Laminare", "Tratamente Faciale"]
    };

    return (
        <div>
            <Header />
            <div style={{ display: "flex", flexDirection: "column", width: "70%", margin: "0 auto" }}>
                {/* Pass the categories object as a prop */}
                <DropdownMenu categories={categories} />
                <SubscriptionList title="Per Sedinta" data={perSedintaArr} />
                <SubscriptionList title="Abonament Lunar" data={abonamentLunarArr} />
            </div>
        </div>
    );
};

export default Services;
