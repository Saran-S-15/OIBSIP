import React, { useEffect } from 'react';
import { usePizzaStore } from '../../store/usePizzaStore';
import Spinner from "../../components/shared/Spinner";
import { Trash2Icon } from 'lucide-react';

const AllStocksPage = () => {
    const { getPizzas, adminCreatedPizzas, isLoading, deleteAdminCreatedPizza } = usePizzaStore();

    useEffect(() => {
        getPizzas();
    }, [getPizzas]);

    if (isLoading) {
        return (
            <div className='flex justify-center items-center min-h-[calc(100vh-4rem)]'>
                <Spinner />
            </div>
        );
    }

    const handleDelete = async (id) => {
        await deleteAdminCreatedPizza(id);
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] px-4 py-8 bg-base-200">
            <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-bold text-primary text-center">🍕 All Pizzas Stock</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {adminCreatedPizzas.length > 0 ? (
                        adminCreatedPizzas.map((pizza) => (
                            <div
                                key={pizza._id}
                                className="relative bg-base-100 border border-primary/10 rounded-2xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 p-6 flex flex-col"
                            >
                                {/* Delete Button */}
                                <button
                                    className="absolute top-4 right-4 text-red-600 hover:text-red-800"
                                    onClick={() => handleDelete(pizza._id)}
                                >
                                    <Trash2Icon className="w-5 h-5 cursor-pointer" />
                                </button>

                                <h3 className="text-xl font-bold text-primary mb-2">{pizza.pizzaBase?.name}</h3>

                                <div className="text-sm text-gray-500 flex-1">
                                    <p><strong>Sauce:</strong> {pizza.sauce?.name}</p>
                                    <p><strong>Cheese:</strong> {pizza.cheese?.name}</p>
                                    {pizza.veggies?.length > 0 && (
                                        <p><strong>Veggies:</strong> {pizza.veggies.map(v => v.name).join(', ')}</p>
                                    )}
                                    {pizza.meat && (
                                        <p><strong>Meat:</strong> {pizza.meat.name}</p>
                                    )}
                                </div>

                                <div className="text-lg font-semibold text-green-500 mt-4">
                                    ₹{pizza.totalPrice}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400">
                            No pizzas available. Please add some!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllStocksPage;
