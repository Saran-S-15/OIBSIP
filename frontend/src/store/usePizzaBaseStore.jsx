import { create } from "zustand";
import { axiosInstance } from "../utils/axios"
import { toast } from "react-hot-toast"

export const usePizzaBaseStore = create((set, get) => ({
    pizzaBases: [],
    isLoading: false,
    error: null,

    createPizzaBase: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.post("/admin/pizzaBase", data);
            get().getPizzaBases();
            toast.success("Pizza Base Added");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getPizzaBases: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/pizzaBase");
            set({ pizzaBases: response.data.pizzaBase });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deletePizzaBase: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.delete(`/admin/pizzaBase/${id}`);
            set((prev) => ({ pizzaBases: prev.pizzaBases.filter((pizzaBase) => pizzaBase._id !== id) }));
            toast.success("Deleted Successfully");
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    updatePizzaBase: async (id, data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.put(`/admin/pizzaBase/${id}`, data);
            get().getPizzaBases();
            toast.success("Updated Successfully");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false })
        }
    }
}))