import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useMeatStore = create((set, get) => ({
    meats: [],
    isLoading: false,
    error: null,

    createMeat: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.post("/admin/meat", data);
            get().getMeats();
            toast.success("Meat Added");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getMeats: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/admin/meat");
            set({ meats: response.data.meat });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteMeat: async (id) => {
        set({ isLoading: true });
        try {
            await axiosInstance.delete(`/admin/meat/${id}`);
            set((prev) => ({ meats: prev.meats.filter((meat) => meat._id !== id) }));
            toast.success("Deleted Successfully");
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    updateMeat: async (id, data) => {
        set({ isLoading: true })
        try {
            await axiosInstance.put(`/admin/meat/${id}`, data);
            get().getMeats();
            toast.success("Updated Successfully");
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    }
}))