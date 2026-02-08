import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
// import { motion } from 'framer-motion'; 

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    🗳️ V-Vote
                </Link>

                <div className="flex gap-4 items-center">
                    {!user ? (
                        <>
                            <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-primary transition">Login</Link>
                            <Link to="/signup" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition shadow-lg shadow-blue-500/30">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <Link to="/results" className="text-gray-600 hover:text-primary transition font-medium">Results</Link>
                            <span className="font-medium">Hello, {user.name}</span>
                            <button onClick={handleLogout} className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
