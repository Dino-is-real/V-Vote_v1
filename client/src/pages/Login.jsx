import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            // Redirect based on role
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.role) {
                navigate('/' + storedUser.role.toLowerCase());
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Form */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 z-10 bg-white"
            >
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center lg:text-left">
                        <Link to="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2 inline-block">
                            V-Vote
                        </Link>
                        <h2 className="text-4xl font-bold text-gray-900 mt-4">Welcome Back!</h2>
                        <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2"
                        >
                            <span>⚠️ {error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-primary font-medium hover:underline">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <p className="text-center text-gray-600">
                        Don't have an account? <Link to="/signup" className="text-primary font-bold hover:underline">Sign up for free</Link>
                    </p>
                </div>
            </motion.div>

            {/* Right Side - Decorative */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gray-900">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                {/* Decorative Circles */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>

                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-16 text-center">
                    <h2 className="text-5xl font-bold mb-6">Democracy Digitzed.</h2>
                    <p className="text-xl text-indigo-100 max-w-md">Experience the most secure, transparent, and accessible voting platform ever built.</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
