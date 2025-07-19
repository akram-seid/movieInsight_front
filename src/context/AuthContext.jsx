import React, {createContext, useContext, useEffect, useState} from 'react';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode library

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        try {
            const storedAuth = sessionStorage.getItem('auth');
            return storedAuth ? JSON.parse(storedAuth) : null;
        } catch (error) {
            console.error("Failed to parse auth data from sessionStorage:", error);
            return null;
        }
    });
    const [isLoading, setIsLoading] = useState(true); // To handle initial auth check

    useEffect(() => {
        const checkAuthStatus = async () => {
            if (user) {
                try {
                    const decodedToken = jwtDecode(user.token);
                    const currentTime = Date.now() / 1000;

                    if (decodedToken.exp < currentTime) {
                        console.log("Token expired. Logging out user.");
                        logout();
                    } else {
                        console.log("Token is still valid.");
                    }
                } catch (error) {
                    console.error("Error decoding token or token is invalid:", error);
                    logout(); // Log out if token is malformed or invalid
                }
            }
            setIsLoading(false); // Auth check is complete
        };
        checkAuthStatus();
    }, [user]);

    const login = (userData) => { // Accept token as well
        setUser(userData);
        sessionStorage.setItem('auth', JSON.stringify(userData)); // Store combined auth data
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('auth'); // Remove combined auth data
    };

    return (
        <AuthContext.Provider value={{user, isLoading, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};