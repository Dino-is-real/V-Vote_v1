import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, BarChart2, Shield, LayoutDashboard, Database, Activity } from 'lucide-react';
import Button from './ui/Button';

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
        { name: 'Results', path: '/results' },
    ];

    if (user) {
        if (user.role === 'voter') navLinks.push({ name: 'Dashboard', path: '/voter' });
        if (user.role === 'admin') navLinks.push({ name: 'Admin Panel', path: '/admin' });
        if (user.role === 'candidate') navLinks.push({ name: 'Campaign', path: '/candidate' });
        if (user.role === 'auditor') navLinks.push({ name: 'Audit Logs', path: '/auditor' });
    }

    // Determine if we need dark mode text based on the route or scroll position.
    // Landing page has a dark hero, so text should be white initially.
    const isLandingPage = location.pathname === '/';
    const isDarkText = scrolled || !isLandingPage;

    // Glassmorphism classes based on background
    const glassClasses = isDarkText
        ? 'bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08)]'
        : 'bg-white/10 backdrop-blur-lg border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)]';

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-center px-4 md:px-8 pointer-events-none">
            <nav className={`pointer-events-auto relative rounded-full w-full max-w-7xl transition-all duration-500 flex justify-between items-center ${glassClasses} ${scrolled ? 'py-3 px-6' : 'py-4 px-8'}`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
                        V
                    </div>
                    <span className={`text-2xl font-black tracking-tight ${isDarkText ? 'text-slate-900' : 'text-white'}`}>
                        Vote<span className={isDarkText ? 'text-primary' : 'text-white'}>.</span>
                    </span>
                </Link>

                {/* Desktop Nav - Centered like Healthy Together */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`font-bold transition-colors duration-200 ${isActive
                                    ? (isDarkText ? 'text-primary' : 'text-white')
                                    : (isDarkText ? 'text-slate-600 hover:text-slate-900' : 'text-slate-300 hover:text-white')
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Side / CTA */}
                <div className="hidden md:flex items-center gap-4 shrink-0 justify-end">
                    {!user ? (
                        <>
                            <Link to="/login" className={`font-bold transition-colors ${isDarkText ? 'text-slate-900 hover:text-primary' : 'text-white hover:text-slate-200'}`}>
                                Sign In
                            </Link>
                            <Button onClick={() => navigate('/signup')} variant={isLandingPage && !scrolled ? "secondary" : "primary"} className="rounded-full">
                                Get Started
                            </Button>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <span className={`font-bold ${isDarkText ? 'text-slate-900' : 'text-white'}`}>{user.name}</span>
                            <Button variant="ghost" onClick={handleLogout} className={isDarkText ? 'text-slate-500 hover:text-red-500 hover:bg-red-50' : 'text-white hover:text-white hover:bg-white/10'}>
                                <LogOut size={18} />
                            </Button>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className={`md:hidden flex items-center justify-center ${isDarkText ? 'text-slate-900' : 'text-white'}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden absolute top-[calc(100%+1rem)] left-0 w-full bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-xl font-bold text-slate-900"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-slate-100 my-4"></div>
                            {!user ? (
                                <div className="space-y-4">
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-slate-900">Sign In</Link>
                                    <Button onClick={() => { setIsOpen(false); navigate('/signup'); }} className="w-full">Get Started</Button>
                                </div>
                            ) : (
                                <Button variant="outline" onClick={() => { setIsOpen(false); handleLogout(); }} className="w-full justify-center">
                                    Sign Out
                                </Button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
