import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { usePizzaBaseStore } from '../../store/usePizzaBaseStore';
import { useSauceStore } from '../../store/useSauceStore';
import { useCheeseStore } from '../../store/useCheeseStore';
import { useVeggieStore } from '../../store/useVeggieStore';
import { useMeatStore } from '../../store/useMeatStore';
import { Plus } from 'lucide-react';
import { usePizzaStore } from "../../store/usePizzaStore";
import Spinner from '../../components/shared/Spinner';

const PizzaCreationPage = () => {
  const { pizzaBases, getPizzaBases } = usePizzaBaseStore();
  const { sauces, getSauces } = useSauceStore();
  const { cheeses, getCheeses } = useCheeseStore();
  const { veggies, getVeggies } = useVeggieStore();
  const { meats, getMeats } = useMeatStore();

  useEffect(() => {
    getPizzaBases();
    getSauces();
    getCheeses();
    getVeggies();
    getMeats();
  }, [getPizzaBases, getSauces, getCheeses, getVeggies, getMeats]);

  const { isLoading, error, createPizza } = usePizzaStore();

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
        formik.resetForm();
      }
    },
  });

  const filterOptions = (items) => items.filter((item) => item.stock > 0);

  return (
    <div className='min-h-[calc(100vh-4rem)] px-4 py-10'>
      <div className='max-w-4xl mx-auto bg-base-100 p-8 rounded-3xl shadow-xl dark:shadow-none'>
        <h2 className='text-4xl font-bold mb-8 text-center'>🍕 Pizza Creation Center</h2>

        <form onSubmit={formik.handleSubmit} className='space-y-6'>
          {/* Pizza Base */}
          <div>
            <label className='block font-semibold mb-2'>Pizza Base</label>
            <select
              name='pizzaBase'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.pizzaBase}
              className='select select-bordered w-full'
            >
              <option value=''>Select a pizza base</option>
              {filterOptions(pizzaBases).map((base) => (
                <option key={base._id} value={base._id}>{base.name}</option>
              ))}
            </select>
            {formik.touched.pizzaBase ? <p className='text-xs text-red-500 mt-1'>{formik.errors.pizzaBase}</p> : ""}
          </div>

          {/* Sauce */}
          <div>
            <label className='block font-semibold mb-2'>Sauce</label>
            <select
              name='sauce'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.sauce}
              className='select select-bordered w-full'
            >
              <option value=''>Select a sauce</option>
              {filterOptions(sauces).map((sauce) => (
                <option key={sauce._id} value={sauce._id}>{sauce.name}</option>
              ))}
            </select>
            {formik.touched.sauce ? <p className='text-xs text-red-500 mt-1'>{formik.errors.sauce}</p> : ""}
          </div>

          {/* Cheese */}
          <div>
            <label className='block font-semibold mb-2'>Cheese</label>
            <select
              name='cheese'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cheese}
              className='select select-bordered w-full'
            >
              <option value=''>Select a cheese</option>
              {filterOptions(cheeses).map((cheese) => (
                <option key={cheese._id} value={cheese._id}>{cheese.name}</option>
              ))}
            </select>
            {formik.touched.cheese ? <p className='text-xs text-red-500 mt-1'>{formik.errors.cheese}</p> : ""}
          </div>

          {/* Meat */}
          <div>
            <label className='block font-semibold mb-2'>Meat</label>
            <select
              name='meat'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.meat}
              className='select select-bordered w-full'
            >
              <option value=''>Select a meat (Optional)</option>
              {filterOptions(meats).map((meat) => (
                <option key={meat._id} value={meat._id}>{meat.name}</option>
              ))}
            </select>
          </div>

          {/* Veggies (Multiselect) */}
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


          {error && <p className='text-red-600'>{error}</p>}

          <button
            type='submit'
            disabled={isLoading || !formik.isValid}
            className='btn btn-primary w-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200'
          >
            <Plus size={18} /> {isLoading ? <Spinner /> : "Create Pizza"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PizzaCreationPage;
