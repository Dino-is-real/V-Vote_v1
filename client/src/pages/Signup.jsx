import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Shield, CheckCircle, Network } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';

const AnimatedBackgroundSignup = () => {
    return (
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-slate-50 items-center justify-center order-2 border-l border-slate-100">
            {/* Soft Vibrant Background */}
            <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-accent/15 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-20 text-center max-w-lg px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-10">
                        <Shield strokeWidth={2.5} className="w-10 h-10 text-secondary" />
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-tight">Create <br />Identity.</h2>
                    <p className="text-xl text-slate-600 leading-relaxed font-medium">
                        Become part of the decentralized voting network. Create your secure identity credentials.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'voter'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

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

    const roles = [
        { id: 'voter', label: 'Voter', icon: User },
        { id: 'candidate', label: 'Candidate', icon: Shield },
        { id: 'admin', label: 'Admin', icon: Lock },
        { id: 'auditor', label: 'Auditor', icon: CheckCircle }
    ];

    return (
        <PageWrapper className="min-h-screen flex bg-white relative overflow-hidden">
            <AnimatedBackgroundSignup />

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 relative z-10 order-1">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="max-w-md w-full"
                >
                    <div className="mb-10 lg:text-left">
                        <Link to="/" className="text-2xl font-black text-slate-900 mb-8 inline-block tracking-tight">
                            V-Vote<span className="text-secondary">.</span>
                        </Link>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Sign Up</h2>
                        <p className="text-lg text-slate-500 mt-2 font-medium">Establish your secure identity.</p>
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-700 mb-3">I am registering as:</label>
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map((role) => {
                                    const isSelected = formData.role === role.id;
                                    const Icon = role.icon;
                                    return (
                                        <button
                                            type="button"
                                            key={role.id}
                                            onClick={() => setFormData({ ...formData, role: role.id })}
                                            className={`relative flex items-center justify-center gap-2 py-4 rounded-2xl border-2 text-sm font-bold transition-all overflow-hidden ${isSelected
                                                ? 'text-primary border-primary bg-primary/5'
                                                : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                                }`}
                                        >
                                            <Icon size={18} strokeWidth={2.5} className={`relative z-10 ${isSelected ? 'text-primary' : 'text-slate-400'}`} />
                                            <span className="relative z-10">{role.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="block w-full px-5 py-4 pt-7 text-slate-900 bg-slate-50 border border-slate-200 rounded-2xl appearance-none focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all peer font-medium"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="name"
                                className="absolute text-slate-500 duration-300 transform -translate-y-3 scale-75 top-5 z-10 origin-[0] left-5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-primary pointer-events-none font-bold"
                            >
                                Full Name
                            </label>
                            <User className="absolute right-5 top-5 text-slate-400 peer-focus:text-primary transition-colors" size={20} strokeWidth={2.5} />
                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
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

                        <div className="relative group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
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
                            className="w-full mt-6"
                            size="lg"
                        >
                            Generate Credentials
                        </Button>
                    </form>

                    <div className="mt-10 text-center text-slate-500 font-medium">
                        Already verified?{' '}
                        <Link to="/login" className="text-primary font-bold hover:text-primary/80 transition-colors">
                            Authenticate
                        </Link>
                    </div>
                </motion.div>
            </div>
        </PageWrapper>
    );
};

export default Signup;
