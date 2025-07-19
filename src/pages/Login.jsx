import React, {useState} from "react";
import {MovieService} from "../ApiService.js";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const {login} = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        // Basic validation
        if (!email || !password) {
            setError("Please enter both username and password.");
            return;
        }

        const loginDto = {
            username: email,
            password: password,
        };

        try {
            const data = await MovieService.login(loginDto);

            // Assuming data.ob contains { user: {...}, token: "your-jwt-token" }
            if (data.status === true) {

                const user = data.ob
                login(user);

                navigate("/");
            } else {
                setError(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setError(error.message || "An unexpected error occurred during login.");
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-6 py-4 md:py-6 flex items-center justify-center">

                <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
                    <h1 className="text-3xl font-bold text-center mb-6">MovieInsight</h1>
                    <p className="text-gray-400 text-center mb-6">
                        Sign in to your account
                    </p>

                    {/* Error Message */}
                    {error && (
                        <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Username
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-300 mb-2"
                            >
                                Password
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

                        <button
                            type="submit"
                            disabled={!email || !password}
                            className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                                email && password
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                            }`}
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate('/reset')}
                            className="text-blue-400 hover:underline"
                        >
                            Forgot your password?
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-400">
                            Don't have an account?{" "}
                            <button
                                onClick={() => navigate('/register')}
                                className="text-blue-400 hover:underline"
                            >
                                Sign UP
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;