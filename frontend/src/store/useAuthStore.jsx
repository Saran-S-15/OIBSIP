import { create } from "zustand"
import { axiosInstance } from "../utils/axios"
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    isLoading: false,
    error: null,
    isCheckingAuth: true,
    forgotPasswordError:null,

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            const response = await axiosInstance.get("/auth/checkAuth");
            set({ authUser: response.data.user });
        } catch (error) {
            set({ error: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    login: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/login", data);
            set({ authUser: response.data.user });
            toast.success("Login Successfull")
        } catch (error) {
            set({ error: error.response.data.message });
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    signup: async (data) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            set({ authUser: response.data.user });
            toast('Verification code sent to your Email!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
        } catch (error) {
            set({ error: error.response.data.message });
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    logout: async () => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout Successfull");
        } catch (error) {
            set({ error: error.response.data.message });
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false })
        }
    },

    verifyEmail: async (code) => {
        set({ isLoading: true })
        try {
            const response = await axiosInstance.post("/auth/verify-email", code);
            set({ authUser: response.data.user });
            toast.success("Signup Successfull");
        } catch (error) {
            set({ error: error.response.data.message });
        } finally {
            set({ isLoading: false });
        }
    },

    forgotPassword: async (data) => {
        set({ isLoading: true, error: null })
        try {
            await axiosInstance.post("/auth/forgot-password", data);
            toast('Reset Password sent to your mail!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            return true;
        } catch (error) {
            set({ forgotPasswordError: error.response.data.message });
            return false;
        } finally {
            set({ isLoading: false })
        }
    },

    resetPassword: async (token, data) => {
        set({ isLoading: true });
        try {
            await axiosInstance.post(`/auth/reset-password/${token}`, data);
            toast.success("Password Changed Successfully");
        } catch (error) {
            set({ error: error.response.data.message });
            toast.error(error.response.data.message);
        } finally {
            set({ isLoading: false });
        }
    },

    adminLogin: async (data) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/admin", data);
            set({ authUser: response.data.user });
            return true;
        } catch (error) {
            set({ error: error.response.data.message });
            return false;
        } finally {
            set({ isLoading: false });
        }
    }


}));