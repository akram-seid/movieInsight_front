import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import HeaderNav from "../Header.jsx";

const ResetPassword = () => {

    const [oldPassword, setOldPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !email || !password) {
            setError('All fields are required.');
            return;
        }

        // In real app: call API or auth function
        console.log('Registering:', {username, email, password});

        // Clear error
        setError('');
    };

    return (
        <div className="min-h-screen bg-gray-900 px-4">
            <HeaderNav></HeaderNav>
            <div className="max-w-7xl mx-auto  flex items-center justify-center ">


                <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md ">
                    <h3 className="text-lg font-bold text-center mb-6">Change Password</h3>
                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        {/* Username Field */}
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                                Old Password
                            </label>
                            <input
                                id="oldPassword"
                                type="password"
                                placeholder="••••••••"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password Field */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Password Field */}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="passwordConfirm"
                                type="password"
                                placeholder="••••••••"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!oldPassword || !password || !passwordConfirm || (password !== passwordConfirm)}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                oldPassword && password && passwordConfirm
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Change Password
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default ResetPassword;