import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User, LogOut, BarChart2 } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsOpen(false);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Results', path: '/results', icon: <BarChart2 size={18} /> },
    ];

    if (user) {
        if (user.role === 'voter') navLinks.push({ name: 'Dashboard', path: '/voter' });
        if (user.role === 'admin') navLinks.push({ name: 'Admin Panel', path: '/admin' });
        if (user.role === 'candidate') navLinks.push({ name: 'My Campaign', path: '/candidate' });
        if (user.role === 'auditor') navLinks.push({ name: 'Audit Logs', path: '/auditor' });
    }

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                        V
                    </div>
                    <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 ${scrolled ? '' : 'text-gray-800'}`}>
                        Vote
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`flex items-center gap-1 nav-link ${location.pathname === link.path ? 'text-primary font-bold' : ''}`}
                        >
                            {link.icon} {link.name}
                        </Link>
                    ))}

                    {!user ? (
                        <div className="flex gap-4">
                            <Link to="/login" className="px-5 py-2 text-gray-600 font-medium hover:text-primary transition">
                                Login
                            </Link>
                            <Link to="/signup" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 pl-4 border-l border-gray-300">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-secondary to-pink-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-medium text-gray-700 hidden lg:block">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b absolute w-full left-0 top-full shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-gray-700 hover:text-primary"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <hr />
                            {!user ? (
                                <div className="flex flex-col gap-3">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full btn-secondary text-center">Login</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full btn-primary text-center">Sign Up</Link>
                                </div>
                            ) : (
                                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-medium">
                                    <LogOut size={18} /> Logout
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
