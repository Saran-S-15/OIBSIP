import React, { useEffect, useState } from 'react';
import { usePizzaStore } from '../store/usePizzaStore';
import Input from "../components/shared/Input";
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/shared/Spinner';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = () => {
  const {
    adminCreatedPizzas,
    getPizzas,
    isLoading,
    getPizzasById,
    getCartPizzas,
    cartPizzas,
  } = usePizzaStore();

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPizzas();
    getCartPizzas();
  }, [getPizzas, getCartPizzas]);

  const handleAddToCart = async (id) => {
    await getPizzasById(id); 
    await getCartPizzas();  
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-6">


        <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
          <button
            onClick={() => navigate("/createCustomPizza")}
            className="btn btn-primary text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
          >
            🍕 Create Custom Pizza
          </button>
          <Input
            type="text"
            placeholder="Search Pizza..."
            className="input input-bordered w-full sm:max-w-xs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Pizza List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCreatedPizzas?.length > 0 ? (
            adminCreatedPizzas
              .filter(pizza =>
                pizza.user?.role === "admin" &&
                pizza.isCustom === false &&
                pizza.pizzaBase?.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((pizza, index) => {
                const isPizzaInCart = cartPizzas.some(cart =>
                  cart.items.some(item => item._id === pizza._id)
                );

                return (
                  <div
                    key={pizza._id}
                    className="bg-base-100 flex flex-col justify-between h-full rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition"
                  >
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">🍕 Pizza {index + 1}</h3>
                      <div className="text-sm space-y-1">
                        <p><strong>Base:</strong> {pizza.pizzaBase?.name}</p>
                        <p><strong>Sauce:</strong> {pizza.sauce?.name}</p>
                        <p><strong>Cheese:</strong> {pizza.cheese?.name}</p>
                        {pizza.veggies?.length > 0 && (
                          <p><strong>Veggies:</strong> {pizza.veggies.map(v => v.name).join(', ')}</p>
                        )}
                        {pizza.meat && <p><strong>Meat:</strong> {pizza.meat.name}</p>}
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                      <div className="text-lg font-semibold text-primary">
                        ₹{pizza.totalPrice}
                      </div>
                      <button
                        onClick={() => handleAddToCart(pizza._id)}
                        disabled={isLoading || isPizzaInCart}
                        className="btn btn-sm btn-outline btn-primary hover:scale-105 transition-transform"
                      >
                        {isLoading ? <Spinner /> : isPizzaInCart ? "✔️ In Cart" : "🛒 Add to Cart"}
                      </button>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>No Pizzas Available</div>
          )}
        </div>

      </div>
    </div>
  );
};

export default HomePage;
