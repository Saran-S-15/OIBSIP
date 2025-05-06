import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";

export const useSauceStore = create((set, get) => ({
    sauces: [],
    isLoading: false,
    error: null,

    createSauce: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post("/admin/sauce", data);
            get().getSauces();
            toast.success("Sauce Added");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getSauces: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/sauce");
            set({ sauces: response.data.sauce });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteSauce: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/admin/sauce/${id}`);
            set((prev) => ({ sauces: prev.sauces.filter((sauce) => sauce._id !== id) }));
            toast.success("Deleted Successfully");
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    updateSauce: async (id, data) => {
        set({isLoading:true})
        try {
            await axiosInstance.put(`/admin/sauce/${id}`, data);
            get().getSauces();
            toast.success("Updated Successfully");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally{
            set({isLoading:false});
        }
    }
}))