import React from 'react';
import pizzaBase from "../../assets/pizzaBase.jpg";
import sauce from "../../assets/sauce.jpg";
import cheese from "../../assets/cheese.jpg";
import veggies from "../../assets/veggies.jpg";
import meat from "../../assets/meat.jpg";
import { useNavigate } from "react-router-dom"
import { stocksURL } from '../../components/shared/RoutingURL';

const InventoryPage = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* Pizza Base */}
        <div onClick={() => navigate(`${stocksURL}/pizzabase`)} className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img src={pizzaBase} alt="Pizza Base" className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold">Pizza Base</h3>
          </div>
        </div>

        {/* Sauce */}
        <div onClick={() => navigate(`${stocksURL}/sauce`)} className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img src={sauce} alt="Sauce" className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold">Sauce</h3>
          </div>
        </div>

        {/* Cheese */}
        <div onClick={() => navigate(`${stocksURL}/cheese`)} className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img src={cheese} alt="Cheese" className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold">Cheese</h3>
          </div>
        </div>

        {/* Veggies */}
        <div onClick={() => navigate(`${stocksURL}/veggies`)} className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img src={veggies} alt="Veggies" className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold">Veggies</h3>
          </div>
        </div>

        {/* Meat */}
        <div onClick={() => navigate(`${stocksURL}/meat`)} className="bg-base-100 shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer">
          <img src={meat} alt="Meat" className="w-full h-48 object-cover" />
          <div className="p-4 text-center">
            <h3 className="text-xl font-bold">Meat</h3>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InventoryPage;
