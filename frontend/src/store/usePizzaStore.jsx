import { create } from "zustand";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";


export const usePizzaStore = create((set, get) => ({
    adminCreatedPizzas: [],
    isLoading: false,
    error: null,
    customPizzas: [],
    cartPizzas: [],

    createPizza: async (data) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.post("/pizza", data);
            toast.success("Pizza Created Successfully");
            get().getPizzas();
            return true;
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
            return false;
        } finally {
            set({ isLoading: false });
        }
    },

    getPizzas: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get("/pizza");
            set({ adminCreatedPizzas: response.data.pizzas })
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    getUserCreatedPizzas: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/pizza/userCustomPizzas");
            set({ customPizzas: response.data.pizzas });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    getPizzasById: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.post("/cart/addToCart", { id });
            get().getCartPizzas();
            toast.success("Added to Cart");
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    getCartPizzas: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axiosInstance.get("/cart/getItems");
            set({ cartPizzas: response.data.cart });
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    removeFromCart: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete(`/cart/deletePizza/${id}`);
            get().getCartPizzas();
            toast.success("Removed from Cart");
        } catch (error) {
            set({ error: error.response?.data?.message || "Failed to remove item" });
            toast.error("Error removing item");
        } finally {
            set({ isLoading: false });
        }
    },

    deleteUserCreatedPizza: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.delete(`/pizza/${id}`);
            await get().getUserCreatedPizzas();
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAdminCreatedPizza: async (id) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.delete(`/pizza/adminCreatedPizza/${id}`);
            await get().getPizzas();
            toast.success("Deleted Successfully");
            set((prev) => ({ adminCreatedPizzas: prev.adminCreatedPizzas.filter((pizza) => pizza._id !== id) }));
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false })
        }
    },

    handleRazorpayPayment: async (amount, pizzas) => {
        try {
            // Step 1: Create Razorpay order on backend
            const { data } = await axiosInstance.post('/order/create-order', { amount });

            // Step 2: Format pizzas to match the orderSchema
            const formattedPizzas = pizzas.map(p => ({
                pizzaBase: p.pizzaBase?._id || p.pizzaBase,
                sauce: p.sauce?._id || p.sauce,
                cheese: p.cheese?._id || p.cheese,
                veggies: p.veggies?.map(v => v._id || v) || [],
                meat: p.meat?._id || p.meat || null,
                totalPrice: p.totalPrice,
                quantity: p.quantity || 1
            }));

            // Step 3: Razorpay payment options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID, // public key
                amount: amount * 100,
                currency: 'INR',
                name: 'Pizza App',
                description: 'Pizza Order Payment',
                order_id: data.orderId,
                handler: async function (response) {
                    const { razorpay_order_id, razorpay_payment_id } = response;

                    try {
                        await axiosInstance.post('/order/verify-order', {
                            orderId: razorpay_order_id,
                            paymentId: razorpay_payment_id,
                            pizzas: formattedPizzas,
                        });

                        alert('Payment Successful!');
                        get().deleteAllUserCreatedPizzas();
                        get().clearCartPizzas();
                    } catch (verifyError) {
                        console.error("Order verification failed:", verifyError);
                        alert('Payment succeeded, but order saving failed. Please contact support.');
                    }
                },
                prefill: {
                    name: 'Saran S',
                    email: 'kuttysaran1515@gmail.com',
                    contact: '9344539955',
                },
                theme: {
                    color: '#6366f1',
                },
            };

            // Step 4: Open Razorpay Checkout
            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err) {
            console.error('Razorpay error:', err);
            alert('Something went wrong while initiating payment.');
        }
    },

    clearCartPizzas: async () => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.delete("/cart/clearCart");
            set({ cartPizzas: [] });
            get().getCartPizzas();
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: true });
        }
    },

    updateCustomPizzaData: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.put(`/pizza/updateStock/${id}`);
        } catch (error) {
            set({ error: error.response.data.message || "Something went Wrong" });
        } finally {
            set({ isLoading: false });
        }
    },

    deleteAllUserCreatedPizzas: async () => {
        const { customPizzas, updateCustomPizzaData, deleteUserCreatedPizza } = get();

        try {
            await Promise.all(customPizzas.map(async (pizza) => {
                await updateCustomPizzaData(pizza._id);
                await deleteUserCreatedPizza(pizza._id);
            }));

            set({ customPizzas: [] });
        } catch (error) {
            console.error("Error while updating and deleting custom pizzas", error);
        }
    }



}))