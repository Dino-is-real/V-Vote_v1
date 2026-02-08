import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="flex-grow flex flex-col items-center justify-center text-center p-10 bg-gradient-to-br from-blue-50 to-indigo-100">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold text-gray-900 mb-6"
                >
                    Secure. Transparent. <span className="text-primary">Elections.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl text-gray-600 mb-8 max-w-2xl"
                >
                    V-Vote is the modern solution for online voting. Empower your community with a tamper-proof, accessible, and verified election system.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex gap-4"
                >
                    <Link to="/signup" className="px-8 py-3 bg-primary text-white text-lg font-semibold rounded-full hover:bg-blue-600 transition shadow-lg shadow-blue-500/30 transform hover:scale-105">
                        Get Started
                    </Link>
                    <Link to="/login" className="px-8 py-3 bg-white text-primary text-lg font-semibold rounded-full border border-primary hover:bg-gray-50 transition transform hover:scale-105">
                        Login
                    </Link>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Choose V-Vote?</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            { title: "🔒 Secure", desc: "Built with industry-standard encryption and RBAC for maximum security." },
                            { title: "⚡ Fast", desc: "Real-time vote counting and instant results publishing." },
                            { title: "🌍 Accessible", desc: "Vote from anywhere, anytime, on any device." }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="p-8 bg-gray-50 rounded-2xl shadow-sm text-center border border-gray-100"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
