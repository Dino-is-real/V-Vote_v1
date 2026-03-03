import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            // In a real app, you might want to validate the token with the backend here
            // For now, we'll try to decode it or just assume it's valid if it exists
            // A better approach is to have a /me endpoint to fetch user details
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        const data = await loginUser(email, password);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
    };

    const register = async (userData) => {
        await registerUser(userData);
        // Auto login after register? Or redirect to login.
        // For simplicity, let's just return true/success
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
