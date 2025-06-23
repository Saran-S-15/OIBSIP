import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import Input from '../components/shared/Input';
import { useFormik } from "formik";
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/shared/Spinner';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const { signup, isLoading, error } = useAuthStore();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: ""
    },
    validate: values => {
      let error = {}

      if (values.name === "") {
        error.name = "Please enter your name"
      }
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
      signup(values);
      navigate("/email-verification");
    }
  })

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4'>
        <div className='w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8'>
          <h2 className='text-3xl font-bold text-center mb-6'>Create Account</h2>
          <p className='text-center text-sm text-gray-500 mb-6'>Join us and start ordering your favorite pizzas 🍕</p>

          {/* Full Name */}
          <div className='mb-5'>
            <label htmlFor='name' className='label mb-2'>
              <span className='label-text'>Full Name</span>
            </label>

            <Input
              type="text"
              placeholder="Enter your Full Name"
              className="input input-lg w-full pl-10"
              id='name'
              name="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              Icon={User}
            />
            {
              formik.touched.name ? <span className='block mt-1 text-sm text-red-500'>{formik.errors.name}</span> : ""
            }

          </div>
          {/* Email */}
          <div className='mb-5'>
            <label htmlFor='email' className='label mb-2'>
              <span className='label-text'>Email Address</span>
            </label>
            <Input
              type="email"
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

          {/* Password */}
          <div className='mb-2'>
            <label htmlFor='password' className='label mb-2'>
              <span className='label-text'>Password</span>
            </label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a Password"
                className="input input-lg w-full pl-10 pr-10"
                id='password'
                name='password'
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

          <button className="btn btn-block btn-primary mt-8" type='submit' disabled={isLoading || !formik.isValid}>
            {
              isLoading ? <Spinner/> : "Sign Up"
            }
          </button>

          <div className='text-center mt-6 text-sm'>
            Already have an account?{' '}
            <Link to="/login" className='text-primary font-semibold hover:underline'>Login</Link>
          </div>

          <div className='mt-6 border-t pt-4 text-center text-xs text-gray-400'>
            By signing up, you agree to our <Link to="/terms" className='link link-hover'>Terms</Link> and <Link to="/privacy" className='link link-hover'>Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupPage;
