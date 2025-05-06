import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage";
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage"
import Navbar from './components/shared/Navbar';
import SettingsPage from './pages/SettingsPage';
import { useThemeStore } from './store/useThemeStore';
import { Toaster } from "react-hot-toast"
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import EmailVerificationPage from './pages/EmailVerificationPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminLoginPage from './pages/AdminLoginPage';
import InventoryPage from './pages/InventoryPage';
import StocksPage from './pages/admin/StocksPage';
import PizzaBasePage from './pages/admin/PizzaBasePage';
import SaucePage from './pages/admin/SaucePage';
import CheesePage from './pages/admin/CheesePage';
import VeggiesPage from './pages/admin/VeggiesPage';
import MeatPage from './pages/admin/MeatPage';
import { stocksURL } from './components/shared/RoutingURL';
import PizzaCreationPage from './pages/admin/PizzaCreationPage';
import CreateCustomPizza from './pages/CreateCustomPizza';
import CheckOutPage from './pages/checkout/CheckOutPage';
import AllStocksPage from './pages/admin/AllStocksPage';
import SuccessPage from './pages/SuccessPage';
import OrdersPage from './pages/admin/OrdersPage';
import MyOrdersPage from './pages/MyOrdersPage';

const App = () => {
  const { themebg } = useThemeStore();

  const { checkAuth, isCheckingAuth, authUser } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <div>
      <Loader className='h-screen justify-center items-center animate-spin mx-auto' size={50} />
    </div>
  }


  return (
    <div data-theme={themebg}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={authUser && authUser.isVerified && authUser.role === "user" ? <HomePage /> : <LoginPage />} />
          <Route path='/login' element={authUser && authUser.isVerified ? <HomePage /> : <LoginPage />} />
          <Route path='/signup' element={authUser && authUser.isVerified ? <HomePage /> : <SignupPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/email-verification' element={authUser && authUser.isVerified ? <HomePage /> : <EmailVerificationPage />} />
          <Route path='/profile' element={authUser && authUser.isVerified ? <ProfilePage /> : <LoginPage />} />
          <Route path='/forgot-password' element={<ForgotPasswordPage />} />
          <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
          <Route path='/admin' element={<AdminLoginPage />} />
          <Route path='/admin/inventory' element={authUser && authUser.role === "admin" ? <InventoryPage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}`} element={authUser && authUser.role === "admin" ? <StocksPage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}/pizzabase`} element={authUser && authUser.role === "admin" ? <PizzaBasePage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}/sauce`} element={authUser && authUser.role === "admin" ? <SaucePage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}/cheese`} element={authUser && authUser.role === "admin" ? <CheesePage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}/veggies`} element={authUser && authUser.role === "admin" ? <VeggiesPage /> : <AdminLoginPage />} />
          <Route path={`${stocksURL}/meat`} element={authUser && authUser.role === "admin" ? <MeatPage /> : <AdminLoginPage />} />
          <Route path='/admin/inventory/adminCreatedPizzas' element={authUser && authUser.role === "admin" ? <AllStocksPage /> : <AdminLoginPage />} />
          <Route path='/admin/inventory/pizzaCreation' element={authUser && authUser.role === "admin" ? <PizzaCreationPage /> : <AdminLoginPage />} />
          <Route path='/createCustomPizza' element={authUser && authUser.isVerified && authUser.role === "user" ? <CreateCustomPizza /> : <HomePage />} />
          <Route path='/checkout' element={authUser && authUser.isVerified && authUser.role === "user" ? <CheckOutPage /> : <HomePage />} />
          <Route path='/success' element={<SuccessPage />} />
          <Route path='/admin/inventory/orders' element={authUser && authUser.role === "admin" ? <OrdersPage/> : <AdminLoginPage />} />
          <Route path='/myOrders' element={authUser && authUser.isVerified && authUser.role === "user" ? <MyOrdersPage/> : <HomePage />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  )
}

export default App