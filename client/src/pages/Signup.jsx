import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, ArrowRight, Loader2 } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'voter'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register(formData);
            navigate('/login');
        } catch (err) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white">
            {/* Left Side - Decorative */}
            <div className="hidden lg:block w-1/2 relative overflow-hidden bg-gray-900 order-2">
                <div className="absolute inset-0 bg-gradient-to-bl from-secondary to-primary opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white p-16 text-center">
                    <h2 className="text-5xl font-bold mb-6">Join the Revolution.</h2>
                    <p className="text-xl text-pink-100 max-w-md">Create an account today and participate in secure, transparent elections.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 z-10 bg-white order-1"
            >
                <div className="max-w-md w-full space-y-6">
                    <div className="text-center lg:text-left">
                        <Link to="/" className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2 inline-block">
                            V-Vote
                        </Link>
                        <h2 className="text-4xl font-bold text-gray-900 mt-4">Create Account</h2>
                        <p className="text-gray-500 mt-2">Get started with your free account.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-2">
                            <span>⚠️ {error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="john@example.com"
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
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">I am a...</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['voter', 'candidate', 'admin', 'auditor'].map((r) => (
                                    <button
                                        type="button"
                                        key={r}
                                        onClick={() => setFormData({ ...formData, role: r })}
                                        className={`py-3 rounded-xl border text-sm font-semibold capitalize transition-all flex items-center justify-center gap-2 ${formData.role === r
                                                ? 'bg-primary text-white border-primary shadow-lg shadow-indigo-500/20'
                                                : 'bg-white text-gray-600 border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                                            }`}
                                    >
                                        {formData.role === r && <Shield size={16} />}
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Create Account <ArrowRight size={20} /></>}
                        </button>
                    </form>

                    <p className="text-center text-gray-600">
                        Already have an account? <Link to="/login" className="text-primary font-bold hover:underline">Login</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
