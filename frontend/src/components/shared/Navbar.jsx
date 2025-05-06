import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/useAuthStore'
import { usePizzaStore } from '../../store/usePizzaStore';
import { ShoppingBag } from 'lucide-react';


const Navbar = () => {
    const { authUser, logout } = useAuthStore();
    const {
        customPizzas,
        getUserCreatedPizzas,
        getPizzas,
        getCartPizzas,
        cartPizzas
    } = usePizzaStore();

    const navigate = useNavigate();

    useEffect(() => {
        getUserCreatedPizzas();
        getPizzas();
        getCartPizzas(); 
    }, [getUserCreatedPizzas, getPizzas, getCartPizzas]);

    const handleLogout = () => {
        logout();
        navigate("/");
    };


    const cartItems = cartPizzas.flatMap(cart => cart.items || []);
    const totalStocks = customPizzas.length + cartItems.length;
    const price = [
        ...customPizzas,
        ...cartItems
    ].reduce((acc, pizza) => acc + (pizza.totalPrice || 0), 0);

    return (
        <div className="navbar shadow-sm">
            <div className="flex-1">
                {
                    authUser && authUser.role === "admin"
                        ? <Link to="/admin/inventory" className="btn btn-ghost text-xl">Admin Inventory</Link>
                        : <Link to="/" className="btn btn-ghost text-xl">Pizza Delivery App</Link>
                }
            </div>

            <div className="flex-none">
                {
                    authUser && authUser.role === "user" && authUser.isVerified && (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <span className="badge badge-sm indicator-item">{totalStocks}</span>
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                                <div className="card-body">
                                    <span className="text-lg font-bold">{totalStocks} Items</span>
                                    <span className="text-info">Subtotal: ₹{price}</span>
                                    <div className="card-actions">
                                        <Link to="/checkout" className="btn btn-primary btn-block">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                

                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Profile Image"
                                src="https://t3.ftcdn.net/jpg/09/48/09/30/360_F_948093078_6kRWXnAWFNEaakRMX5OM9CRNNj2gdIfw.jpg" />
                        </div>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            authUser && <li><Link to="/profile">Profile</Link></li>
                        }
                        {
                            authUser && authUser.role === "user" && <li><Link to="/myOrders">Orders</Link></li>
                        }
                        <li><Link to="/settings">Settings</Link></li>
                        {
                            authUser && <li><a onClick={handleLogout}>Logout</a></li>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
