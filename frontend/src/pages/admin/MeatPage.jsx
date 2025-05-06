import React, { useEffect, useState } from 'react'
import { useMeatStore } from '../../store/useMeatStore';
import {useFormik} from "formik";
import InputAdmin from "../../components/shared/InputAdmin";
import Spinner from "../../components/shared/Spinner";
import { Pencil, Trash2 } from 'lucide-react';

const MeatPage = () => {
  const [edit, setEdit] = useState(false);
  const [meatId, setMeatId] = useState(null);

  const { isLoading, error, meats, createMeat, getMeats, deleteMeat, updateMeat } = useMeatStore();

  useEffect(() => {
    getMeats();
  }, [getMeats]);

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      stock: '',
    },
    validate: (values) => {
      let errors = {};

      if (values.name === "") {
        errors.name = 'Name is required';
      }

      if (values.price === "") {
        errors.price = 'Price is required';
      } else if (!/^\d+(\.\d+)?$/.test(values.price)) {
        errors.price = "Price must be a positive number";
      } else if (parseFloat(values.price) < 0) {
        errors.price = "Price cannot be less than 0";
      }

      if (values.stock === "") {
        errors.stock = 'Stock is required';
      } else if (!/^\d+$/.test(values.stock)) {
        errors.stock = "Stock must be a positive whole number";
      } else if (parseInt(values.stock) < 0) {
        errors.stock = "Stock cannot be less than 0";
      }

      return errors;
    },
    onSubmit: (values) => {
      if (edit) {
        const success = updateMeat(meatId, values);
        if (success) {
          setEdit(false);
          setMeatId(null);
          formik.resetForm();
        }
      } else {
        const success = createMeat(values);
        if (success) {
          formik.resetForm();
        }
      }
    },
  });

  const handleDelete = async (id) => {
    await deleteMeat(id);
  }

  const handleEdit = async (item) => {
    setEdit(true);
    setMeatId(item._id);
    formik.setValues(item);
  }

  return (
    <div className='min-h-[calc(100vh-4rem)] py-10 px-4'>
      <div className='max-w-7xl mx-auto grid lg:grid-cols-2 gap-10'>

        {/* Left Form */}
        <div className='bg-base-100 p-8 rounded-3xl shadow-xl h-fit'>
          <h2 className='text-3xl font-bold mb-6'>🥩 Add Meat</h2>
          <form onSubmit={formik.handleSubmit} className='space-y-5'>

            <div>
              <label className='text-sm font-semibold block mb-1'>Name</label>
              <InputAdmin
                type='text'
                name='name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name ? <p className='text-xs text-red-500 mt-1'>{formik.errors.name}</p> : ""}
            </div>

            <div>
              <label className='text-sm font-semibold block mb-1'>Price</label>
              <InputAdmin
                type='number'
                name='price'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price ? <p className='text-xs text-red-500 mt-1'>{formik.errors.price}</p> : ""}
            </div>

            <div>
              <label className='text-sm font-semibold block mb-1'>Stock</label>
              <InputAdmin
                type='number'
                name='stock'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.stock}
              />
              {formik.touched.stock ? <p className='text-xs text-red-500 mt-1'>{formik.errors.stock}</p> : ""}
            </div>

            {error && <p className='text-red-600'>{error}</p>}

            <button
              type='submit'
              disabled={isLoading || !formik.isValid}
              className='btn btn-primary btn-block mt-2 hover:scale-105 transition-transform duration-200'
            >
              {
                isLoading ? <Spinner /> : edit ? "Update Meat" : "Add Meat"
              }
            </button>
          </form>
        </div>

        {/* Right Table */}
        <div className='bg-base-100 p-8 rounded-3xl shadow-xl overflow-auto max-h-[calc(100vh-8rem)]'>
          <h2 className='text-3xl font-bold mb-6'>📋 Meat List</h2>
          <div className='overflow-x-auto'>
            <table className='table table-zebra w-full'>
              <thead className='text-sm text-gray-600'>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th className='text-center'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meats.length > 0 ? (
                  meats.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}.</td>
                      <td>{item.name}</td>
                      <td>₹{item.price}</td>
                      <td>{item.stock}</td>
                      <td className='flex justify-center gap-2'>
                        <button onClick={() => handleEdit(item)} className='btn btn-sm btn-outline btn-warning hover:scale-110'>
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(item._id)} className='btn btn-sm btn-outline btn-error hover:scale-110'>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='5' className='text-center text-gray-400 py-6'>
                      No meats added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MeatPage