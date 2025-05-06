import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import Spinner from "../components/shared/Spinner";
import { usePizzaBaseStore } from '../store/usePizzaBaseStore';
import { useSauceStore } from '../store/useSauceStore';
import { useCheeseStore } from '../store/useCheeseStore';
import { useVeggieStore } from '../store/useVeggieStore';
import { useMeatStore } from '../store/useMeatStore';
import { usePizzaStore } from '../store/usePizzaStore';

const CreateCustomPizza = () => {
    const { pizzaBases, getPizzaBases } = usePizzaBaseStore();
    const { sauces, getSauces } = useSauceStore();
    const { cheeses, getCheeses } = useCheeseStore();
    const { veggies, getVeggies } = useVeggieStore();
    const { meats, getMeats } = useMeatStore();

    const { createPizza, isLoading, getUserCreatedPizzas } = usePizzaStore();

    useEffect(() => {
        getPizzaBases();
        getSauces();
        getCheeses();
        getVeggies();
        getMeats();
    }, [getPizzaBases, getSauces, getCheeses, getVeggies, getMeats]);

    const formik = useFormik({
        initialValues: {
            pizzaBase: '',
            sauce: '',
            cheese: '',
            veggies: [],
            meat: '',
        },
        validate: values => {
            let error = {}

            if (values.pizzaBase === "") {
                error.pizzaBase = "Pizza Base is required"
            }
            if (values.sauce === "") {
                error.sauce = "Sauce is required"
            }
            if (values.cheese === "") {
                error.cheese = "Cheese is required"
            }
            if (values.veggies.length === 0) {
                error.veggies = "Veggies is required"
            }
            return error
        },
        onSubmit: async (values) => {
            const success = await createPizza(values);
            if (success) {
                getUserCreatedPizzas();
                formik.resetForm();
            }
        },
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] max-w-3xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold text-center mb-8">🍕 Create Your Custom Pizza</h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6 bg-base-100 p-6 rounded-2xl shadow-lg">
                {/* Pizza Base */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Pizza Base</label>
                    <select
                        name="pizzaBase"
                        className="select select-bordered w-full"
                        onChange={formik.handleChange}
                        value={formik.values.pizzaBase}
                    >
                        <option value="">Select Pizza Base</option>
                        {pizzaBases.filter(p => p.stock > 0).map(base => (
                            <option key={base._id} value={base._id}>{base.name}</option>
                        ))}
                    </select>
                    {formik.touched.pizzaBase ? <p className='text-xs text-red-500 mt-1'>{formik.errors.pizzaBase}</p> : ""}
                </div>

                {/* Sauce */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Sauce</label>
                    <select
                        name="sauce"
                        className="select select-bordered w-full"
                        onChange={formik.handleChange}
                        value={formik.values.sauce}
                    >
                        <option value="">Select Sauce</option>
                        {sauces.filter(s => s.stock > 0).map(sauce => (
                            <option key={sauce._id} value={sauce._id}>{sauce.name}</option>
                        ))}
                    </select>
                    {formik.touched.sauce ? <p className='text-xs text-red-500 mt-1'>{formik.errors.sauce}</p> : ""}
                </div>

                {/* Cheese */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Cheese</label>
                    <select
                        name="cheese"
                        className="select select-bordered w-full"
                        onChange={formik.handleChange}
                        value={formik.values.cheese}
                    >
                        <option value="">Select Cheese</option>
                        {cheeses.filter(c => c.stock > 0).map(cheese => (
                            <option key={cheese._id} value={cheese._id}>{cheese.name}</option>
                        ))}
                    </select>
                    {formik.touched.cheese ? <p className='text-xs text-red-500 mt-1'>{formik.errors.cheese}</p> : ""}
                </div>

                {/* Meat */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Meat (Optional)</label>
                    <select
                        name="meat"
                        className="select select-bordered w-full"
                        onChange={formik.handleChange}
                        value={formik.values.meat}
                    >
                        <option value="">Select Meat</option>
                        {meats.filter(m => m.stock > 0).map(meat => (
                            <option key={meat._id} value={meat._id}>{meat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Veggies */}
                <div>
                    <label className='text-sm font-semibold block mb-2'>Veggies</label>
                    <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
                        {veggies
                            .filter((item) => item.stock > 0)
                            .map((item) => (
                                <label key={item._id} className='flex items-center gap-2'>
                                    <input
                                        type='checkbox'
                                        name='veggies'
                                        value={item._id}
                                        checked={formik.values.veggies.includes(item._id)}
                                        onChange={(e) => {
                                            const { checked, value } = e.target;
                                            const currentVeggies = formik.values.veggies;
                                            if (checked) {
                                                formik.setFieldValue('veggies', [...currentVeggies, value]);
                                            } else {
                                                formik.setFieldValue(
                                                    'veggies',
                                                    currentVeggies.filter((v) => v !== value)
                                                );
                                            }
                                        }}
                                        onBlur={formik.handleBlur}
                                        className='checkbox checkbox-sm checkbox-primary'
                                    />
                                    <span>{item.name}</span>
                                </label>
                            ))}
                    </div>
                    {formik.touched.veggies && formik.errors.veggies && (
                        <p className='text-xs text-red-500 mt-1'>{formik.errors.veggies}</p>
                    )}
                </div>

                <button type="submit" disabled={isLoading || !formik.isValid} className="btn btn-primary w-full hover:scale-105 transition">
                    {
                        isLoading ? <Spinner/> : "🛒 Add to Cart"
                    }
                </button>
            </form>
        </div>
    );
};

export default CreateCustomPizza;
