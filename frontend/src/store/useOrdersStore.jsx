import { create } from "zustand";
import { axiosInstance } from "../utils/axios";

export const useOrdersStore = create((set) => ({
    isLoading: false,
    error: null,
    orders: [],
    myOrders: [],

    getAllOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/order/allOrders");
            set({ orders: response.data.orders })
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    getMyOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/order/myOrders");
            set({ myOrders: response.data.orders })
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    updateOrder: async (id, status) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.put(`/order/updateOrder/${id}`, { status });
            set((state) => ({
                orders: state.orders.map((order) =>
                  order._id === id ? { ...order, orderStatus: status } : order
                ),
              }));
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },
}))