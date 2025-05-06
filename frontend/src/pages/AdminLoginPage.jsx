import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { useFormik } from 'formik';
import Input from '../components/shared/Input';
import { useAuthStore } from '../store/useAuthStore';
import {useNavigate} from "react-router-dom"
import Spinner from '../components/shared/Spinner';

const AdminLoginPage = () => {
    const { adminLogin, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors = {};

            if (!values.email) {
                errors.email = 'Email is required';
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Password is required';
            }

            return errors;
        },
        onSubmit: async (values) => {
            const success = await adminLogin(values);
            if(success){
                formik.resetForm();
                navigate("/admin/inventory")
            }
        },
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4">
            <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Admin Login</h2>
                <p className="text-sm text-center text-gray-500 mb-6">
                    Please enter your admin credentials to access the dashboard.
                </p>

                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="label mb-2">
                            <span className="label-text">Email Address</span>
                        </label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="admin@example.com"
                            className="input input-lg w-full pl-10"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            Icon={Mail}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="block mt-1 text-sm text-red-500">
                                {formik.errors.email}
                            </span>
                        )}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="password" className="label mb-2">
                            <span className="label-text">Password</span>
                        </label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            className="input input-lg w-full pl-10"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            Icon={Lock}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <span className="block mt-1 text-sm text-red-500">
                                {formik.errors.password}
                            </span>
                        )}
                    </div>

                    {error && <p className="text-red-600 text-sm mt-2 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="btn btn-primary btn-block mt-4"
                        disabled={isLoading || !formik.isValid}
                    >
                        {isLoading ? (
                            <Spinner/>
                        ) : (
                            'Login as Admin'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
