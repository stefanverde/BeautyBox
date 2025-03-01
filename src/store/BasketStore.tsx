import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid"; // Import uuid
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
    uniqueId?: string; // Add a unique identifier
}

interface CartState {
    basket: Service[];
    addToBasket: (service: Service) => void;
    removeFromBasket: (uniqueId: string) => void; // Use uniqueId to remove items
    clearBasket: () => void;
}

export const useBasketStore = create<CartState>()(
    persist(
        (set) => ({
            basket: [],

            addToBasket: (service) =>
                set((state) => ({
                    basket: [...state.basket, { ...service, uniqueId: uuidv4() }], // Add uniqueId
                })),

            removeFromBasket: (uniqueId) =>
                set((state) => ({
                    basket: state.basket.filter((item) => item.uniqueId !== uniqueId), // Remove by uniqueId
                })),

            clearBasket: () => set({ basket: [] }),
        }),
        {
            name: "basket-storage",
            storage: {
                getItem: (name) => {
                    const value = localStorage.getItem(name);
                    if (!value) return null;

                    // Parse the state and convert selectedDate strings back to Date objects
                    const parsed = JSON.parse(value, (key, value) => {
                        if (key === "selectedDate" && typeof value === "string") {
                            return new Date(value); // Convert string to Date
                        }
                        return value;
                    });
                    return parsed;
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, JSON.stringify(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        }
    )
);