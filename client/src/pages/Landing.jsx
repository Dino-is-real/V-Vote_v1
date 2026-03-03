import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, BarChart2, Globe, CheckCircle, Smartphone, Lock } from 'lucide-react';

const Landing = () => {
    return (
        <div className="font-sans overflow-x-hidden pt-16">

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center justify-center bg-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                {/* Abstract Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 animate-float"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 text-indigo-600 text-sm font-semibold mb-6 border border-indigo-100">
                            🚀 The Future of Democracy is Here
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Secure. Transparent. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Verifiable Elections.</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Empower your community with V-Vote. The most advanced blockchain-inspired voting platform designed for security, integrity, and ease of use.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/signup" className="btn-primary text-lg px-8 py-4 shadow-xl shadow-indigo-500/30">
                                Get Started Now
                            </Link>
                            <Link to="/results" className="btn-secondary text-lg px-8 py-4">
                                View Live Demo
                            </Link>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="mt-20 mx-auto max-w-5xl rounded-2xl border-4 border-gray-100 shadow-2xl overflow-hidden glass-card"
                    >
                        {/* Placeholder for a dashboard screenshot - using a gradient block for now to simulate */}
                        <DashboardMockup />
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose V-Vote?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">We combine cutting-edge security with user-centric design to perform elections of any scale.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<Shield className="text-primary" size={32} />}
                            title="Ironclad Security"
                            desc="Built with industry-standard encryption and Role-Based Access Control (RBAC) to ensure every vote is immutable."
                        />
                        <FeatureCard
                            icon={<Smartphone className="text-secondary" size={32} />}
                            title="Mobile First"
                            desc="Vote from anywhere, anytime. Our responsive design ensures a seamless experience on any device."
                        />
                        <FeatureCard
                            icon={<BarChart2 className="text-accent" size={32} />}
                            title="Instant Results"
                            desc="Watch the election unfold in real-time with dynamic charts and transparent audit logs."
                        />
                        <FeatureCard
                            icon={<Lock className="text-orange-500" size={32} />}
                            title="Verifiable Integrity"
                            desc="Every action is logged. Auditors can verify the integrity of the election process at any stage."
                        />
                        <FeatureCard
                            icon={<Globe className="text-blue-500" size={32} />}
                            title="Scalable Architecture"
                            desc="Powered by Docker and MongoDB to handle thousands of concurrent voters with ease."
                        />
                        <FeatureCard
                            icon={<CheckCircle className="text-green-500" size={32} />}
                            title="Easy Setup"
                            desc="Admins can set up an election in minutes with our intuitive wizard interface."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-white py-12 border-t border-gray-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            V-Vote
                        </span>
                        <p className="text-gray-400 mt-2 text-sm">© 2026 V-Vote System. All rights reserved.</p>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="text-gray-400 hover:text-primary transition">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-primary transition">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-primary transition">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, desc }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
    >
        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{desc}</p>
    </motion.div>
);

const DashboardMockup = () => {
    return (
        <div className="bg-slate-50 w-full aspect-video flex text-left font-sans">
            {/* Sidebar Mockup */}
            <div className="w-64 bg-slate-900 text-slate-300 p-6 hidden md:flex flex-col gap-6">
                <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                    <div className="w-8 h-8 bg-primary rounded-lg"></div> V-Vote
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-lg">
                        <div className="w-5 h-5 bg-primary rounded"></div> Dashboard
                    </div>
                    {['Elections', 'Candidates', 'Results', 'Settings'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 rounded-lg transition">
                            <div className="w-5 h-5 bg-slate-700 rounded"></div> {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 p-8 flex flex-col gap-8 overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800">Election Overview</h3>
                        <p className="text-slate-500 text-sm">Real-time updates</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6">
                    {[
                        { label: 'Total Voters', val: '2,543', color: 'bg-indigo-500' },
                        { label: 'Votes Cast', val: '1,892', color: 'bg-pink-500' },
                        { label: 'Participation', val: '74%', color: 'bg-emerald-500' },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100"
                        >
                            <div className={`w-10 h-10 ${stat.color} rounded-lg mb-4 opacity-20`}></div>
                            <div className="text-2xl font-bold text-slate-800">{stat.val}</div>
                            <div className="text-sm text-slate-500">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Chart Mockup */}
                <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex items-end gap-4 justify-between">
                    {[40, 70, 50, 90, 60, 80, 45].map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            whileInView={{ height: `${h}%` }}
                            transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                            className="w-full bg-indigo-100 rounded-t-lg relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-primary to-indigo-300 opacity-80"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Landing;
