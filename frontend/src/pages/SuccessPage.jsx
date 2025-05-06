import React from 'react';

const SuccessPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
                <div className="text-6xl text-green-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="h-16 w-16 mx-auto"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                </div>
                <h2 className="text-4xl font-semibold text-green-700 mt-4">Payment Successful!</h2>
                <p className="text-xl text-gray-500 mt-2">
                    Your payment has been processed successfully. Thank you for your order!
                </p>
                <div className="mt-6">
                    <button className="btn btn-success w-full text-white">
                        Continue Shopping
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;
