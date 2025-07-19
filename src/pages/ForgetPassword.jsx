import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email) {
            setError('All fields are required.');
            return;
        }

        // In real app: call API or auth function

        // Clear error
        setError('');
        // Optionally redirect or show success message
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Movie Insight</h1>
                <h3 className="text-lg font-bold text-center mb-6">Reset Password</h3>
                <p className="text-gray-400 text-center mb-6">You will receive a temporary password at the indicated
                    email, if you
                    have an account.</p>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>


                    <button
                        type="submit"
                        disabled={!email}
                        className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                            email
                                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                    >
                        Reset Password
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400">
                        Do you reset your password?{' '}
                        <button
                            onClick={() => navigate('/login')}
                            className="text-blue-400 hover:underline"
                        >
                            Sign in
                        </button>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ForgotPassword;