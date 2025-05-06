import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Lock, CheckCircle } from 'lucide-react';
import Input from '../components/shared/Input';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/shared/Spinner';


const ResetPasswordPage = () => {
    const { token } = useParams();
    const { resetPassword, isLoading, error } = useAuthStore();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.password) {
                errors.password = 'Password is required';
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters';
            }

            if (!values.confirmPassword) {
                errors.confirmPassword = 'Please confirm your password';
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords do not match';
            }

            return errors;
        },
        onSubmit: async (values) => {
            await resetPassword(token, values);
            setIsSubmitted(true);
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        },
    });

    return (
        <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4'>
            <div className='w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8'>
                <h2 className='text-3xl font-bold text-center mb-6'>Reset Password</h2>
                <p className='text-center text-sm text-gray-500 mb-6'>
                    {isSubmitted
                        ? 'Your password has been successfully reset 🔒'
                        : 'Enter a new password to regain access'}
                </p>

                {isSubmitted ? (
                    <div className='flex flex-col items-center gap-4 mt-8'>
                        <CheckCircle className='text-green-500' size={64} />
                        <p className='text-center text-lg font-medium text-green-600'>
                            Password successfully reset!
                        </p>
                        <Link
                            to='/login'
                            className='mt-4 btn btn-primary btn-sm'
                        >
                            Go to Login
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        {/* Password */}
                        <div className='mb-5'>
                            <label htmlFor='password' className='label mb-2'>
                                <span className='label-text'>New Password</span>
                            </label>
                            <Input
                                id='password'
                                type='password'
                                name='password'
                                required
                                placeholder='Enter new password'
                                className='input input-lg w-full pl-10'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                Icon={Lock}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <span className='block mt-1 text-sm text-red-500'>
                                    {formik.errors.password}
                                </span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className='mb-5'>
                            <label htmlFor='confirmPassword' className='label mb-2'>
                                <span className='label-text'>Confirm Password</span>
                            </label>
                            <Input
                                id='confirmPassword'
                                type='password'
                                name='confirmPassword'
                                required
                                placeholder='Confirm your password'
                                className='input input-lg w-full pl-10'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.confirmPassword}
                                Icon={Lock}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <span className='block mt-1 text-sm text-red-500'>
                                    {formik.errors.confirmPassword}
                                </span>
                            )}
                        </div>

                        {/* Error */}
                        {error && <p className='text-red-600'>{error}</p>}

                        {/* Submit */}
                        <button
                            type='submit'
                            className='btn btn-primary btn-block mt-4'
                            disabled={isLoading || !formik.isValid}
                        >
                            {isLoading ? (
                                <Spinner />
                            ) : (
                                'Reset Password'
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
