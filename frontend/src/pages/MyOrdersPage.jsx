import React, { useEffect } from 'react';
import { useOrdersStore } from '../store/useOrdersStore';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/shared/Spinner';

const MyOrdersPage = () => {
    const { getMyOrders, myOrders, isLoading } = useOrdersStore();
    const { authUser } = useAuthStore();

    useEffect(() => {
        getMyOrders();
    }, [getMyOrders]);

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case "confirmed":
                return "badge badge-primary";
            case "in kitchen":
                return "badge badge-info";
            case "delivered":
                return "badge badge-success";
            default:
                return "badge badge-neutral";
        }
    };

    if (isLoading) return <div className="text-center py-10 flex justify-center items-center min-h-[calc(100vh-4rem)]"><Spinner/></div>;

    if (!myOrders || myOrders.length === 0)
        return <div className="text-center py-10 text-base-content/50 min-h-[calc(100vh-4rem)]">No orders found.</div>;

    return (
        <div className="p-4 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
            <h1 className="text-3xl font-bold mb-6 text-center">My Orders</h1>

            <div className="space-y-6">
                {myOrders
                    .filter(order => order.user === authUser._id)
                    .map(order => (
                        <div key={order._id} className="border border-base-300 rounded-xl p-4 bg-base-200 shadow-md">
                            <div className="mb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                <div className="text-sm text-base-content">
                                    <span className="block sm:inline ">
                                        <span className="font-bold text-primary">Order ID:</span> {order._id}
                                    </span>
                                    <br className="sm:hidden" />
                                    <span className="text-sm lg:ms-10 md:ms-5">
                                        <span className="font-bold text-primary">Placed on:</span> {new Date(order.createdAt).toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={getStatusBadgeClass(order.orderStatus)}>
                                        {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {order.pizzas.map((pizza, idx) => (
                                    <div key={idx} className="card bg-base-100 shadow">
                                        <div className="card-body p-4">
                                            <ul className="text-sm space-y-1 mt-2">
                                                <li><span className="font-semibold">Base:</span> {pizza.pizzaBase?.name}</li>
                                                <li><span className="font-semibold">Sauce:</span> {pizza.sauce?.name}</li>
                                                <li><span className="font-semibold">Cheese:</span> {pizza.cheese?.name}</li>
                                                <li><span className="font-semibold">Veggies:</span> {pizza.veggies?.map(v => v.name).join(', ')}</li>
                                                {pizza.meat && <li><span className="font-semibold">Meat:</span> {pizza.meat?.name}</li>}
                                                <li><span className="font-semibold">Price:</span> ₹{pizza.totalPrice}</li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default MyOrdersPage;
