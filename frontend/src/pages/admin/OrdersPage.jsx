import React, { useEffect } from 'react';
import { useOrdersStore } from '../../store/useOrdersStore';
import dayjs from 'dayjs';
import Spinner from "../../components/shared/Spinner";

const OrdersPage = () => {
  const { isLoading, orders, getAllOrders, updateOrder } = useOrdersStore();

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]"><Spinner/></div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-[calc(100vh-4rem)]">
      <h1 className="text-3xl font-bold mb-6 text-center">🧾 Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-base-100 shadow-xl rounded-xl p-6 border border-base-300">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-sm text-gray-400">Order ID: <span className="text-primary font-medium">{order.orderId}</span></p>
                  <p className="text-sm text-gray-400">Payment ID: {order.paymentId}</p>
                  <p className="text-sm text-gray-400">Created At: {dayjs(order.createdAt).format('MMMM D, YYYY')}</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <label className="label-text text-sm font-medium mr-2">Order Status:</label>
                  <select
                    className="select select-bordered select-sm"
                    value={order.orderStatus}
                    onChange={(e) => updateOrder(order._id, e.target.value)}
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="in Kitchen">In Kitchen</option>
                    <option value="sent to delivery">Sent to Delivery</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="font-semibold text-lg mb-2">Pizzas</h2>
                <ul className="space-y-2">
                  {order.pizzas.map((pizza, index) => (
                    <li key={pizza._id || index} className="bg-base-200 p-4 rounded-lg">
                      <p className="text-sm">Base: <span className="font-medium">{pizza.pizzaBase?.name || 'Unknown'}</span></p>
                      <p className="text-sm">Sauce: <span className="font-medium">{pizza.sauce?.name || 'Unknown'}</span></p>
                      <p className="text-sm">Cheese: <span className="font-medium">{pizza.cheese?.name || 'Unknown'}</span></p>
                      <p className="text-sm">Veggies: <span className="font-medium">{pizza.veggies?.map(v => v.name).join(', ') || 'None'}</span></p>
                      <p className="text-sm">Meat: <span className="font-medium">{pizza.meat?.name || 'None'}</span></p>
                      <p className="text-sm">Quantity: {pizza.quantity}</p>
                      <p className="text-sm">Total Price: ₹{pizza.totalPrice}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;