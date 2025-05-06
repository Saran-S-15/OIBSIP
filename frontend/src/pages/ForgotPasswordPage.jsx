import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Input from '../components/shared/Input';
import Spinner from '../components/shared/Spinner';

const ForgotPasswordPage = () => {
    const { forgotPassword, isLoading, forgotPasswordError } = useAuthStore();
    const [submitted, setSubmitted] = useState(false);

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            let error = {};

            if (values.email === '') {
                error.email = 'Please enter your email';
            } else if (!/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                error.email = 'Invalid Email Address';
            }

            return error;
        },
        onSubmit: async (values) => {
            formik.resetForm();
            const success = await forgotPassword(values);
            if (success) {
                setSubmitted(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000)
            }
        },
    });

    return (
        <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4'>
            <div className='w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8'>
                <h2 className='text-3xl font-bold text-center mb-6'>Forgot Password</h2>
                <p className='text-center text-sm text-gray-500 mb-6'>
                    {submitted
                        ? 'Check your inbox for a password reset link ✉️'
                        : "Enter your email address and we'll send you a reset link"}
                </p>

                {submitted ? (
                    <div className='flex flex-col items-center gap-4 mt-8'>
                        <CheckCircle className='text-green-500' size={64} />
                        <p className='text-center text-lg font-medium text-green-600'>
                            Password reset email sent!
                        </p>
                        <p className='text-center text-sm text-gray-500'>
                            Please check your inbox and follow the instructions to reset your password.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className='mb-5'>
                            <label htmlFor='email' className='label mb-2'>
                                <span className='label-text'>Email Address</span>
                            </label>
                            <Input
                                id='email'
                                type='email'
                                name='email'
                                required
                                placeholder='Enter your email'
                                className='input input-lg w-full pl-10'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                Icon={Mail}
                            />
                            {formik.touched.email ? formik.errors.email && (
                                <span className='block mt-1 text-sm text-red-500'>
                                    {formik.errors.email}
                                </span>
                            ) : ""}
                        </div>

                        {forgotPasswordError && <p className='text-red-600'>{forgotPasswordError}</p>}

                        <button
                            type='submit'
                            className='btn btn-primary btn-block mt-4'
                            disabled={isLoading || !formik.isValid}
                        >
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                'Send Reset Link'
                            )}
                        </button>
                    </form>
                )}

                {!submitted && (
                    <div className='mt-6 text-center text-xs text-gray-400'>
                        Remembered your password?{' '}
                        <Link
                            to='/login'
                            className='text-primary font-medium hover:underline'
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
