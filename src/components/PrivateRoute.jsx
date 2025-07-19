// src/components/PrivateRoute.jsx
import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const PrivateRoute = () => {
    const {user, isLoading} = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-3xl">
                Loading authentication...
            </div>
        );
    }
    return user ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;