import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, animate } from 'framer-motion';
import { Shield, Smartphone, Lock, Users, UserCheck, Settings, FileText } from 'lucide-react';
import Button from '../components/ui/Button';
import PageWrapper from '../components/layout/PageWrapper';

// Animated Counter Component
const Counter = ({ from, to, duration = 2 }) => {
    const nodeRef = useRef();

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    animate(from, to, {
                        duration,
                        onUpdate(value) {
                            node.textContent = Math.round(value).toLocaleString();
                        },
                    });
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [from, to, duration]);

    return <span ref={nodeRef} />;
};

const Landing = () => {
    const { scrollYProgress } = useScroll();
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);

    const fadeIn = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <PageWrapper className="font-sans overflow-x-hidden bg-white">

            {/* 1. Hero Section - Deep Dark Blue per Healthy Together */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-dark pt-20 pb-10">

                {/* Massive Vibrant Gradient Blob/Wave Effect Backdrop */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/40 via-primary/20 to-transparent blur-[100px] opacity-80 mix-blend-screen -skew-y-12 animate-float"></div>
                    <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/30 via-primary/20 to-transparent blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto mt-12 md:mt-24"
                    >
                        <h1 className="text-huge md:text-mega font-black text-white mb-8 leading-none tracking-tight">
                            Systems that deliver outcomes for <span className="vibrant-gradient-text">elections.</span>
                        </h1>
                        <p className="text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                            Empower your organization with V-Vote. The highly secure, verifiable voting infrastructure built for trust.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link to="/signup">
                                <Button size="lg" className="w-full sm:w-auto px-12 py-5 text-xl">
                                    Schedule a Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. Interactive Statistics Section - Light Theme */}
            <section className="py-24 relative z-10 bg-white border-b border-slate-100">
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100"
                    >
                        {[
                            { label: 'Votes Cast', value: 1250000, suffix: '+' },
                            { label: 'Active Elections', value: 843, suffix: '' },
                            { label: 'Organizations', value: 120, suffix: '+' },
                            { label: 'Audit Logs', value: 5400000, suffix: '+' },
                        ].map((stat, i) => (
                            <motion.div key={i} variants={fadeIn} className="p-6">
                                <div className="text-5xl md:text-6xl font-black mb-3 text-slate-900 tracking-tighter">
                                    <Counter from={0} to={stat.value} duration={2.5} />{stat.suffix}
                                </div>
                                <div className="text-slate-500 font-bold uppercase tracking-widest text-sm">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* 3. Storytelling: How It Works - Clean, Large Type Blocks */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="mb-24 max-w-4xl"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">Built for <br />Absolute Trust.</h2>
                        <p className="text-2xl text-slate-600 font-medium">Our architecture guarantees that once a vote is cast, it cannot be altered, deleted, or compromised by anyone.</p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                        {[
                            {
                                title: "Verified Identity",
                                desc: "Strict Role-Based Access Control and secure tokens ensure only eligible participants can cast a ballot.",
                                icon: <Shield strokeWidth={2.5} className="w-10 h-10 text-primary" />,
                                color: "bg-primary/10 text-primary"
                            },
                            {
                                title: "Encrypted Voting",
                                desc: "Votes are encrypted client-side and sent through secure channels to our tamper-evident datastore.",
                                icon: <Smartphone strokeWidth={2.5} className="w-10 h-10 text-secondary" />,
                                color: "bg-secondary/10 text-secondary"
                            },
                            {
                                title: "Immutable Record",
                                desc: "Every single transaction generates an immutable audit log accessible in real-time by verified Auditors.",
                                icon: <Lock strokeWidth={2.5} className="w-10 h-10 text-accent" />,
                                color: "bg-accent/10 text-accent"
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-white p-10 rounded-4xl shadow-sm border border-slate-100 flex flex-col"
                            >
                                <div className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                                <p className="text-slate-600 text-lg leading-relaxed font-medium">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Role-Based Features Grid - Colorful & Illustrative */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="text-center mb-20 max-w-4xl mx-auto"
                    >
                        <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">Tailored for every <span className="vibrant-gradient-text">stakeholder.</span></h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <RoleCard
                            icon={<Users className="w-8 h-8 text-white" />}
                            title="Voters"
                            desc="A frictionless, accessible interface to cast your vote securely from any device in seconds."
                            delay={0}
                            bgColor="bg-primary"
                            textColor="text-slate-900"
                        />
                        <RoleCard
                            icon={<UserCheck className="w-8 h-8 text-white" />}
                            title="Candidates"
                            desc="Real-time campaign analytics, registration status, and transparent outcome tracking."
                            delay={0.1}
                            bgColor="bg-secondary"
                            textColor="text-slate-900"
                        />
                        <RoleCard
                            icon={<Settings className="w-8 h-8 text-white" />}
                            title="Admins"
                            desc="Complete control over election lifecycle, voter management, and live reporting dashboards."
                            delay={0.2}
                            bgColor="bg-accent"
                            textColor="text-slate-900"
                        />
                        <RoleCard
                            icon={<FileText className="w-8 h-8 text-white" />}
                            title="Auditors"
                            desc="Unrestricted access to cryptographic audit logs and verification tools to ensure integrity."
                            delay={0.3}
                            bgColor="bg-slate-900"
                            textColor="text-white"
                        />
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-32 relative overflow-hidden bg-primary text-white">
                {/* Abstract overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/30 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-none">Ready to run a secure election?</h2>
                        <p className="text-2xl text-primary-100 font-medium mb-12 max-w-2xl mx-auto drop-shadow-sm opacity-90">Join thousands of organizations that trust V-Vote for their mission-critical processes.</p>
                        <Link to="/signup">
                            <Button variant="secondary" size="lg" className="px-12 py-5 text-xl text-primary hover:text-primary hover:bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                                Create Free Account
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-dark text-slate-400 py-16 border-t border-slate-800">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-white font-black text-xl">V</span>
                        </div>
                        <span className="text-3xl font-black text-white tracking-tight">
                            V-Vote.
                        </span>
                    </div>
                    <div className="flex gap-10 text-base font-bold text-slate-300">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition">Terms of Service</a>
                        <a href="#" className="hover:text-white transition">Security</a>
                    </div>
                </div>
            </footer>
        </PageWrapper>
    );
};

const RoleCard = ({ icon, title, desc, delay, bgColor, textColor }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ y: -8, transition: { duration: 0.2 } }}
        className={`bg-slate-50 p-10 rounded-4xl border border-slate-100 transition-all group`}
    >
        <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-8 shadow-lg`}>
            {icon}
        </div>
        <h3 className={`text-3xl font-bold ${textColor === 'text-white' ? 'text-slate-900' : 'text-slate-900'} mb-4 tracking-tight`}>{title}</h3>
        <p className="text-slate-600 text-lg leading-relaxed font-medium">{desc}</p>
    </motion.div>
);

export default Landing;
