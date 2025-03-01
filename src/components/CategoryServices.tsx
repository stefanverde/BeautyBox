import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useBasketStore } from "../store/BasketStore"; // Zustand store for the basket

import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
}

const CategoryServices = () => {
    const { subscriptionType, category } = useParams();
    const [services, setServices] = useState<Service[]>([]); // List of services
    const addToBasket = useBasketStore((state: any) => state.addToBasket); // Zustand store for adding to basket
    const [value, setValue] = useState<Dayjs | null>(null); // Store the selected date
    const [calendarOpen, setCalendarOpen] = useState(false); // Control the visibility of the calendar

    // Fetch services based on the URL parameters
    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3001/categories/${subscriptionType}/${category}`);
            const data = await response.json();
            setServices(data);
        };

        fetchServices();
    }, [subscriptionType, category]);

    const handleAddToBasket = (service: Service) => {
        if (!value) {
            alert("Please select a date before adding to the basket.");
            return;
        }

        // Add service with the selected date to the basket
        addToBasket({ ...service, selectedDate: value });
        setValue(null); // Reset the date after adding to the basket
        setCalendarOpen(false); // Optionally close the calendar after adding to the basket
    };

    const handleToggleCalendar = () => {
        setCalendarOpen((prev) => !prev); // Toggle the calendar open/close state
    };

    return (
        <>
            <Header />
            <div className="category-page">
                {/* Page Header */}
                <header className="header">
                    <h1>{category} ({subscriptionType})</h1>
                </header>

                <main className="content">
                    {/* Services Section */}
                    <section className="services-section">
                        <h2>Available Services</h2>
                        <div className="services-grid">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <div key={service.id} className="service-card">
                                        <h3>{service.name}</h3>
                                        <p>{service.description}</p>
                                        <p className="price">${service.price}</p>

                                        {/* Toggle Button to open/close the Date Calendar */}
                                        <button onClick={handleToggleCalendar}>
                                            {calendarOpen ? "Close Calendar" : "Select Date"}
                                        </button>

                                        {/* Conditionally Render Date Calendar */}
                                        {calendarOpen && (
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DateCalendar', 'DateCalendar']}>

                                                        <DateCalendar
                                                            value={value}
                                                            onChange={(newValue) => setValue(newValue)}
                                                            autoFocus={false}
                                                            minDate={dayjs(new Date())}
                                                        />

                                                </DemoContainer>
                                            </LocalizationProvider>
                                        )}

                                        {/* Button to add to basket */}
                                        <button onClick={() => handleAddToBasket(service)}>
                                            Add to Basket
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="empty-message">No services available for this category.</p>
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default CategoryServices;
