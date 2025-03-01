import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";
import { useBasketStore } from "../store/BasketStore";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import "./styles.css"
interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    category?: string;
}

const CategoryServices = () => {
    const { subscriptionType, category } = useParams();
    const [services, setServices] = useState<Service[]>([]);
    const addToBasket = useBasketStore((state: any) => state.addToBasket);

    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [durations, setDurations] = useState<{ [key: string]: number | null }>({});
    const [selectedDates, setSelectedDates] = useState<{ [key: string]: Dayjs | null }>({});
    const [calendarOpen, setCalendarOpen] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchServices = async () => {
            const response = await fetch(`http://localhost:3001/categories/${subscriptionType}/${category}`);
            const data = await response.json();
            setServices(data);
        };

        fetchServices();
    }, [subscriptionType, category]);

    const calculateEndDate = (startDate: Dayjs, duration: number): Dayjs => {
        return startDate.add(duration, "month");
    };

    const handleAddToBasket = (service: Service) => {
        if (!selectedDates[service.id]) {
            alert("Please select a date before adding to the basket.");
            return;
        }

        let endDate = null;
        if (subscriptionType?.toLowerCase() === "abonament") {
            if (!durations[service.id]) {
                alert("Please select a duration for the subscription.");
                return;
            }
            endDate = calculateEndDate(selectedDates[service.id]!, durations[service.id]!);
        }

        addToBasket({
            ...service,
            selectedDate: selectedDates[service.id],
            duration: durations[service.id],
            endDate
        });

        setSelectedDates((prev) => ({ ...prev, [service.id]: null }));
        setDurations((prev) => ({ ...prev, [service.id]: null }));
        setCalendarOpen((prev) => ({ ...prev, [service.id]: false }));
    };

    const handleToggleCalendar = (serviceId: string) => {
        setCalendarOpen((prev) => ({ ...prev, [serviceId]: !prev[serviceId] }));
    };

    return (
        <>
            <Header />
            <div className="category-page">
                <header className="header">
                    <h1>{category} ({subscriptionType})</h1>
                </header>

                <main className="content">
                    <section className="services-section">
                        <h2>Available Services</h2>
                        <div className="services-grid">
                            {services.length > 0 ? (
                                services.map((service) => (
                                    <div key={service.id} className="service-card">
                                        <h3>{service.name}</h3>
                                        <p>{service.description}</p>
                                        <p className="price">${service.price}</p>

                                        {/* Duration Dropdown for Abonament */}
                                        {subscriptionType?.toLowerCase() === "abonament" && (
                                            <div className="duration-select">
                                                <label>Select Duration:</label>
                                                <select
                                                    value={durations[service.id] || ""}
                                                    onChange={(e) =>
                                                        setDurations((prev) => ({ ...prev, [service.id]: Number(e.target.value) }))
                                                    }
                                                >
                                                    <option value="" disabled>Select duration</option>
                                                    <option value={1}>1 Month</option>
                                                    <option value={3}>3 Months</option>
                                                    <option value={6}>6 Months</option>
                                                </select>
                                            </div>
                                        )}

                                        {/* Toggle Calendar Button */}
                                        <button
                                            onClick={() => handleToggleCalendar(service.id)}
                                            disabled={subscriptionType?.toLowerCase() === "abonament" && !durations[service.id]}
                                        >
                                            {calendarOpen[service.id] ? "Close Calendar" : "Select Date"}
                                        </button>

                                        {/* Show Date Picker */}
                                        {calendarOpen[service.id] && (
                                            <div className="date-picker-container">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DateCalendar
                                                        value={selectedDates[service.id] || null}
                                                        onChange={(newValue) =>
                                                            setSelectedDates((prev) => ({ ...prev, [service.id]: newValue }))
                                                        }
                                                        minDate={dayjs(new Date())} // Prevent past dates
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        )}

                                        {/* Add to Basket Button */}
                                        <button
                                            onClick={() => handleAddToBasket(service)}
                                            disabled={!selectedDates[service.id]}
                                        >
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