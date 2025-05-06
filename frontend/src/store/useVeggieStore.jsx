import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useVeggieStore = create((set,get) => ({
    veggies: [],
    isLoading: false,
    error: null,

    createVeggie: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post("/admin/veggies", data);
            get().getVeggies();
            toast.success("Veggie Added");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getVeggies: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/veggies");
            set({ veggies: response.data.veggie });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteVeggie: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/admin/veggies/${id}`);
            set((prev) => ({ veggies: prev.veggies.filter((veggie) => veggie._id !== id) }));
            toast.success("Deleted Successfully");
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    updateVeggie: async (id, data) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.put(`/admin/veggies/${id}`, data);
            get().getVeggies();
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