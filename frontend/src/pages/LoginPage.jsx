import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, } from 'lucide-react';
import Input from '../components/shared/Input';
import { useAuthStore } from '../store/useAuthStore';
import { useFormik } from 'formik';
import Spinner from '../components/shared/Spinner';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user')) || null;
    if (savedUser) {
      formik.setValues(savedUser);
    }
  }, [])

  const { login, isLoading } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validate: values => {
      let error = {}

      if (values.email === "") {
        error.email = "Please enter your email"
      } else if (!/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(values.email)) {
        error.email = "Invalid Email Address"
      }
      if (values.password === "") {
        error.password = "Please enter your password"
      } else if (values.password.length < 6) {
        error.password = "Password must be atleast 6 Characters"
      }

      return error

    },
    onSubmit: values => {
      formik.resetForm();
      login(values);
      if (checked) {
        localStorage.setItem('user', JSON.stringify(values));
      }
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4'>
        <div className='w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8'>
          <h2 className='text-3xl font-bold text-center mb-6'>Welcome Back!</h2>
          <p className='text-center text-sm text-gray-500 mb-6'>Login to order your favorite pizzas 🍕</p>

          <div className='mb-5'>
            <label htmlFor='email' className='label mb-2'>
              <span className='label-text'>Email Address</span>
            </label>

            <Input
              type="text"
              placeholder="Enter your Email"
              className="input input-lg w-full pl-10"
              id='email'
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              Icon={Mail}
            />
            {
              formik.touched.email ? <span className='block mt-1 text-sm text-red-500'>{formik.errors.email}</span> : ""
            }
          </div>

          <div className='mb-2'>
            <label htmlFor='password' className='label mb-2'>
              <span className='label-text'>Password</span>
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your Password"
                className="input input-lg w-full pl-10 pr-10"
                id='password'
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <Lock className='absolute left-3 top-3.5 text-gray-400' size={20} />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className='absolute right-3 top-3.5 text-gray-400'
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {
              formik.touched.password ? <span className='block mt-1 text-sm text-red-500'>{formik.errors.password}</span> : ""
            }
          </div>

          <div className='mt-3 flex justify-between items-center text-sm'>
            <label className='flex items-center cursor-pointer'>
              <input type="checkbox" className="checkbox checkbox-sm mr-2" id='check' onClick={() => setChecked(true)}/>
              Remember Me
            </label>
            <Link to="/forgot-password" className='hover:underline hover:underline-offset-4 text-sm'>Forgot Password?</Link>
          </div>

          <button className="btn btn-block btn-primary mt-8" type='submit' disabled={isLoading || !formik.isValid}>
            {
              isLoading ? <Spinner/> : "Login"
            }
          </button>

          <div className='text-center mt-6 text-sm'>
            New here?{' '}
            <Link to="/signup" className='text-primary font-semibold hover:underline'>Create an account</Link>
          </div>

          <div className='mt-6 border-t pt-4 text-center text-xs text-gray-400'>
            By logging in, you agree to our <Link to="/terms" className='link link-hover'>Terms</Link> and <Link to="/privacy" className='link link-hover'>Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;