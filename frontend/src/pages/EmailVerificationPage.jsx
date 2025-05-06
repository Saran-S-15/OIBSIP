import React, { useRef } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import Spinner from '../components/shared/Spinner';

const EmailVerificationPage = () => {
    const { verifyEmail, isLoading, error } = useAuthStore();

    const inputsRef = useRef([]);

    const getVerificationCode = () => {
        const values = inputsRef.current.map(input => input?.value?.trim());
        const isValid = values.every(val => /^\d$/.test(val)); // Each should be a single digit

        return isValid ? values.join('') : '';
    };

    const handleChange = (e, index) => {
        const value = e.target.value;

        // Only allow numeric input
        if (!/^\d?$/.test(value)) {
            e.target.value = '';
            return;
        }

        if (value && index < 5) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        const pasted = e.clipboardData.getData('text').trim();

        // Only allow exactly 6 numeric digits
        if (/^\d{6}$/.test(pasted)) {
            pasted.split('').forEach((char, i) => {
                if (inputsRef.current[i]) {
                    inputsRef.current[i].value = char;
                }
            });
            inputsRef.current[5]?.focus();
            e.preventDefault();
        }
    };

    const handleKeyDown = (e, index) => {
        const key = e.key;

        if (key === 'Backspace' && !e.target.value && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }

        // Prevent non-numeric key input (except backspace/arrow keys)
        if (
            key.length === 1 &&
            !/[0-9]/.test(key) &&
            !['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(key)
        ) {
            e.preventDefault();
        }
    };

    const handleSubmit = () => {
        const code = getVerificationCode();
        if (!code || code.length !== 6) {
            alert("Please enter a valid 6-digit code.");
            return;
        }
        verifyEmail({ code });
    }

    return (
        <div className='min-h-[calc(100vh-4rem)] flex justify-center items-center bg-base-200 px-4'>
            <div className='w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8'>
                <h2 className='text-3xl font-bold text-center mb-6'>Verify Code</h2>
                <p className='text-center text-sm text-gray-500 mb-6'>
                    Enter the 6-digit code sent to your email 📩
                </p>

                {/* Verification Code Inputs */}
                <div className='flex justify-center gap-3 mb-3' onPaste={handlePaste}>
                    {[...Array(6)].map((_, index) => (
                        <input
                            key={index}
                            type='text'
                            maxLength={1}
                            inputMode='numeric'
                            pattern='[0-9]*'
                            className='input input-bordered w-12 h-12 text-center text-xl font-semibold'
                            ref={(el) => (inputsRef.current[index] = el)}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onPaste={handlePaste} // ✅ paste handled on every input now
                        />
                    ))}

                </div>

                <div className='mb-5 flex justify-center'>
                    {error && <p className='text-red-600'>{error}</p>}
                </div>

                <button className='btn btn-block btn-primary' onClick={handleSubmit}>
                    {
                        isLoading ? <Spinner/> : "Verify"
                    }
                </button>

            </div>
        </div>
    );
};

export default EmailVerificationPage;
