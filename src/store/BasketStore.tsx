import { create } from "zustand";
import { persist } from "zustand/middleware"; // Import persist middleware
import { Dayjs } from "dayjs";

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    selectedDate: Date;
    category?: string;
    startDate?: Dayjs | null;
    endDate?: Dayjs | null;
    duration?: number;
}

interface CartState {
    basket: Service[];
    addToBasket: (service: Service) => void;
    removeFromBasket: (serviceId: string) => void;
    clearBasket: () => void;
}

export const useBasketStore = create<CartState>()(
    persist(
        (set) => ({
            basket: [],

            addToBasket: (service) =>
                set((state) => ({
                    basket: [...state.basket, service],
                })),

            removeFromBasket: (serviceId) =>
                set((state) => ({
                    basket: state.basket.filter((item) => item.id !== serviceId),
                })),

            clearBasket: () => set({ basket: [] }),
        }),
        {
            name: "basket-storage", // Unique key for localStorage
            storage: {
                getItem: (name) => {
                    const value = localStorage.getItem(name);
                    return value ? JSON.parse(value) : null;
                }, // Use localStorage
                setItem: (name, value) => localStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => localStorage.removeItem(name),
            }, // Use localStorage
        }
    )
);