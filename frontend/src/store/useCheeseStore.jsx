import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useCheeseStore = create((set, get) => ({
    cheeses: [],
    isLoading: false,
    error: null,

    createCheese: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post("/admin/cheese", data);
            get().getCheeses();
            toast.success("Cheese Added");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getCheeses: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/cheese");
            set({ cheeses: response.data.cheese });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteCheese: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/cheese/${id}`);
            set((prev) => ({ cheeses: prev.cheeses.filter((cheese) => cheese._id !== id) }));
            toast.success("Deleted Successfully");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    updateCheese: async (id, data) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.put(`/admin/cheese/${id}`, data);
            get().getCheeses();
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