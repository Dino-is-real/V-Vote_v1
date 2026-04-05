import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ShieldCheck, Database, Key } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

const AnimatedBackground = () => {
    return (
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-white items-center justify-center border-r border-slate-100">
            {/* Colorful Soft Gradients instead of dark theme */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

            <div className="relative z-20 text-center max-w-lg px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                        <Lock strokeWidth={2.5} className="w-10 h-10 text-primary" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">Welcome <br />Back.</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        Log in to verify your identity and access your dashboard.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
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
        <PageWrapper className="min-h-screen flex bg-slate-50 relative overflow-hidden">
            <AnimatedBackground />

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10 bg-white">

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-md w-full"
                >
                    <div className="mb-12">
                        <Link to="/" className="text-2xl font-black text-slate-900 mb-8 inline-block tracking-tight">
                            V-Vote<span className="text-primary">.</span>
                        </Link>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sign In</h2>
                        <p className="text-lg text-slate-500 mt-2 font-medium">Enter your credentials to continue.</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center justify-center gap-3 mb-8 font-bold"
                        >
                            <span>{error}</span>
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Floating Label Input: Email */}
                        <div className="relative group">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="block w-full px-5 py-4 pt-7 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all peer font-medium"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary pointer-events-none font-bold"
                            >
                                Email Address
                            </label>
                            <Mail className="absolute right-5 top-5 text-slate-400 peer-focus:text-primary transition-colors" size={20} strokeWidth={2.5} />
                        </div>

                        {/* Floating Label Input: Password */}
                        <div className="relative group">
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="block w-full px-5 py-4 pt-7 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all peer font-medium"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary pointer-events-none font-bold"
                            >
                                Password
                            </label>
                            <Lock className="absolute right-5 top-5 text-slate-400 peer-focus:text-primary transition-colors" size={20} strokeWidth={2.5} />
                        </div>

                        <Button
                            type="submit"
                            isLoading={loading}
                            className="w-full mt-4"
                            size="lg"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-10 text-center text-slate-500 font-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary font-bold hover:text-primary/80 transition-colors">
                            Request Access
                        </Link>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default Login;
