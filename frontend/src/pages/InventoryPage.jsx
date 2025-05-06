import React from 'react';
import { ClipboardList, Boxes, Pizza, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


const InventoryPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-4 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 w-full max-w-5xl">

                <div onClick={() => navigate("/admin/inventory/orders")} className="bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-primary mb-4">
                        <ClipboardList size={48} />
                    </div>
                    <h3 className="text-xl font-semibold">Orders</h3>
                </div>

                <div onClick={() => navigate("/admin/inventory/stocks")} className="bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-primary mb-4">
                        <Boxes size={48} />
                    </div>
                    <h3 className="text-xl font-semibold">Stocks</h3>
                </div>

                <div onClick={() => navigate("/admin/inventory/pizzaCreation")} className="bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-primary mb-4">
                        <Pizza size={48} />
                    </div>
                    <h3 className="text-xl font-semibold">Pizza Creation</h3>
                </div>

                <div onClick={() => navigate("/admin/inventory/adminCreatedPizzas")} className="bg-base-100 shadow-xl rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-300 hover:scale-105 cursor-pointer">
                    <div className="text-primary mb-4">
                        <ShoppingCart size={48}/> 
                    </div>
                    <h3 className="text-xl font-semibold">All Pizzas</h3>
                </div>

            </div>
        </div>
    );
};

export default InventoryPage;
