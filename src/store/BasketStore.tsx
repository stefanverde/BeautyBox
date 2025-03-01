import { create } from "zustand";

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    selectedDate: Date;
}

interface CartState {
    basket: Service[];
    addToBasket: (service: Service) => void;
    removeFromBasket: (serviceId: string) => void;
    clearBasket: () => void;
}

export const useBasketStore = create<CartState>((set) => ({
    basket: [],

    addToBasket: (service) => set((state) => ({
        basket: [...state.basket, service],
    })),

    removeFromBasket: (serviceId) => set((state) => ({
        basket: state.basket.filter((item) => item.id !== serviceId),
    })),

    clearBasket: () => set({ basket: [] }),
}));
