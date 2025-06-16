import React, { useEffect } from 'react';
import { usePizzaStore } from '../../store/usePizzaStore';
import Spinner from "../../components/shared/Spinner";
import { Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CheckOutPage = () => {
    const { getUserCreatedPizzas, customPizzas, isLoading, deleteUserCreatedPizza, cartPizzas, getCartPizzas, removeFromCart, handleRazorpayPayment, clearCartPizzas } = usePizzaStore();

    const navigate = useNavigate();

    useEffect(() => {
        getUserCreatedPizzas();
        getCartPizzas();
    }, [getUserCreatedPizzas, getCartPizzas]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
                <Spinner />
            </div>
        );
    }

    const handleDelete = async (id) => {
        window.confirm("Are you sure you want to delete this pizza?") && await deleteUserCreatedPizza(id);
    }

    const removeItemFromCart = (id) => {
        removeFromCart(id)
    }

    const customTotal = customPizzas.reduce((acc, pizza) => acc + (pizza.totalPrice || 0), 0);

    const cartTotal = cartPizzas.reduce((cartAcc, cart) => {
        const itemsTotal = cart.items.reduce((itemAcc, pizza) => itemAcc + (pizza.totalPrice || 0), 0);
        return cartAcc + itemsTotal;
    }, 0);

    const totalAmount = customTotal + cartTotal;

    const handlePayment = async (totalAmount, combinedPizzas) => {
        const success = await handleRazorpayPayment(totalAmount, combinedPizzas);
        if (success) {
            navigate("/success");
            customPizzas.forEach((pizza) => deleteUserCreatedPizza(pizza._id));
            removeFromCart();
        }
    }


    return (
        <div className="min-h-[calc(100vh-4rem)] px-4 py-8 bg-base-200">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Pizza Lists */}
                <div className="space-y-10 lg:col-span-2">
                    {/* Custom Pizzas */}
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold mb-4 text-primary">🧾 Your Pizzas</h2>
                        {customPizzas.length > 0 ? (
                            customPizzas.map((pizza) => (
                                <div
                                    key={pizza._id}
                                    className="relative bg-base-100 rounded-2xl shadow-md p-6 space-y-3 border border-primary/10 hover:shadow-lg transition-transform hover:-translate-y-1"
                                >
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 flex gap-3">
                                        <span className="badge badge-primary text-white font-semibold text-xs py-1 px-3">
                                            Custom Pizza
                                        </span>
                                        <Trash2Icon className='cursor-pointer text-red-700' onClick={() => handleDelete(pizza._id)} />
                                    </div>

                                    <h3 className="text-xl font-bold text-primary">{pizza.pizzaBase?.name}</h3>
                                    <div className="text-sm space-y-1 text-gray-500">
                                        <p><strong>Sauce:</strong> {pizza.sauce?.name}</p>
                                        <p><strong>Cheese:</strong> {pizza.cheese?.name}</p>
                                        {pizza.veggies?.length > 0 && (
                                            <p><strong>Veggies:</strong> {pizza.veggies.map(v => v.name).join(', ')}</p>
                                        )}
                                        {pizza.meat && (
                                            <p><strong>Meat:</strong> {pizza.meat.name}</p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <label className="text-sm text-gray-500 font-medium">Qty:</label>
                                        <select
                                            className="select select-bordered select-sm w-20"
                                            defaultValue={1}
                                            onChange={(e) => console.log(`Qty for ${pizza._id}:`, e.target.value)}
                                        >
                                            {[...Array(10).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="text-lg font-semibold text-primary mt-2">
                                        ₹{pizza.totalPrice}
                                    </div>

                                </div>

                            ))
                        ) : (
                            <div className="text-gray-400"></div>
                        )}
                    </div>

                    {/* AddToCart Pizzas */}
                    <div className="space-y-6">
                        {cartPizzas.length > 0 ? (
                            cartPizzas.map((cart) =>
                                cart.items.map((pizza) => (
                                    <div
                                        key={pizza._id}
                                        className="relative bg-base-100 rounded-2xl shadow-md p-6 space-y-3 border border-primary/10 hover:shadow-lg transition-transform hover:-translate-y-1"
                                    >
                                        <div className="absolute top-4 right-4 flex gap-3">
                                            <Trash2Icon className="cursor-pointer text-red-700" onClick={() => removeItemFromCart(pizza._id)} />
                                        </div>

                                        <h3 className="text-xl font-bold text-primary">{pizza.pizzaBase.name}</h3>

                                        <div className="text-sm space-y-1 text-gray-500">
                                            <p><strong>Sauce:</strong> {pizza.sauce?.name}</p>
                                            <p><strong>Cheese:</strong> {pizza.cheese?.name}</p>
                                            {pizza.veggies?.length > 0 && (
                                                <p><strong>Veggies:</strong> {pizza.veggies.map(v => v.name).join(', ')}</p>
                                            )}
                                            {pizza.meat && (
                                                <p><strong>Meat:</strong> {pizza.meat.name}</p>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mt-2">
                                            <label className="text-sm text-gray-500 font-medium">Qty:</label>
                                            <select
                                                className="select select-bordered select-sm w-20"
                                                defaultValue={1}
                                                onChange={(e) => console.log(`Qty for ${pizza._id}:`, e.target.value)}
                                            >
                                                {[...Array(10).keys()].map(i => (
                                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="text-lg font-semibold text-primary mt-2">
                                            ₹{pizza.totalPrice}
                                        </div>
                                    </div>
                                ))
                            )
                        ) : (
                            <p className="text-center text-gray-500"></p>
                        )}
                    </div>

                </div>

                {/* Right: Checkout Box */}
                <div className="sticky top-24 mt-10 h-fit">
                    <div className="bg-base-100 rounded-2xl shadow-lg p-8 border border-primary/10 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-primary">Checkout Summary</h2>

                            {/* Address Form */}
                            <div className="space-y-3">
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="input input-bordered w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Street Address"
                                    className="input input-bordered w-full"
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="City"
                                        className="input input-bordered w-full"
                                    />
                                    <input
                                        type="text"
                                        placeholder="State"
                                        className="input input-bordered w-full"
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Pizza Summary */}
                            <p className="text-sm text-gray-500">
                                Total Pizzas: <span className="font-semibold">{customPizzas.length + cartPizzas.reduce((acc, c) => acc + c.items.length, 0)}</span>
                            </p>
                            <p className="text-xl font-bold text-green-500">Total: ₹{totalAmount}</p>

                            <p className="text-lg text-center font-bold text-primary">⚠️Razorpay Checkout Disabled⚠️</p>
                        </div>
                        <button
                            disabled
                            className="btn btn-primary btn-block mt-6 hover:scale-105 transition-transform"
                            onClick={() => {
                                const combinedPizzas = [
                                    ...customPizzas,
                                    ...cartPizzas.flatMap(c => c.items)
                                ];

                                handlePayment(totalAmount, combinedPizzas);
                                clearCartPizzas();
                            }}
                        >
                            💳 Pay Now
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckOutPage;
