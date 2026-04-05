import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { UserCheck, Activity, Target, ShieldAlert, Award, CheckCircle2 } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const mockCampaignData = [
    { name: 'Week 1', votes: 120 },
    { name: 'Week 2', votes: 250 },
    { name: 'Week 3', votes: 480 },
    { name: 'Week 4', votes: 890 },
];

const CandidateDashboard = () => {
    const [elections, setElections] = useState([]);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ party: '', manifesto: '', electionId: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const elecRes = await api.get('/elections');
                setElections(elecRes.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load elections.");
            }
        };
        fetchData();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/candidates', formData);
            toast.success("Registered Successfully! Your candidacy is pending approval.");
            setFormData({ party: '', manifesto: '', electionId: '' });
        } catch (err) {
            toast.error(err.response?.data?.msg || "Registration Failed");
        } finally {
            setLoading(false);
        }
    };

    const eligibleElections = elections.filter(e => e.status === 'created' || e.status === 'open');

    return (
        <PageWrapper className="bg-slate-50 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="mb-16 mt-8">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">Candidate Portal.</h1>
                    <p className="text-2xl text-slate-500 font-medium max-w-2xl">Manage your campaigns and track election progress.</p>
                </div>

                {/* Top Quick Stats - Massive and Colorful */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Active Campaigns', value: '1', icon: Target, color: 'text-primary', bg: 'bg-primary/10' },
                        { label: 'Approval Status', value: 'Pending', icon: ShieldAlert, color: 'text-amber-500', bg: 'bg-amber-100' },
                        { label: 'Total Endorsements', value: '892', icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-100' },
                        { label: 'Current Rank', value: '2nd', icon: Award, color: 'text-secondary', bg: 'bg-secondary/10' }
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={`${stat.bg} p-8 rounded-[2rem] border-2 border-transparent hover:border-white transition-all shadow-sm flex flex-col justify-between h-48`}
                        >
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-sm ${stat.color}`}>
                                <stat.icon size={28} strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className={`text-4xl font-black ${stat.color} tracking-tight`}>{stat.value}</h3>
                                <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-1">{stat.label}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left Col: Registration Form - Friendly Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-1"
                    >
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 sticky top-28">
                            <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mb-6">
                                <Award size={32} strokeWidth={2.5} />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                                Register Candidacy
                            </h2>
                            <form onSubmit={handleRegister} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Select Election</label>
                                    <select
                                        className="w-full border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all appearance-none font-medium text-slate-900 cursor-pointer"
                                        value={formData.electionId}
                                        onChange={e => setFormData({ ...formData, electionId: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Choose an active election</option>
                                        {eligibleElections.map(e => (
                                            <option key={e._id} value={e._id}>{e.title}</option>
                                        ))}
                                    </select>
                                    {eligibleElections.length === 0 && (
                                        <p className="text-sm font-bold text-amber-500 mt-2 bg-amber-50 p-3 rounded-xl">No eligible elections available.</p>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Party / Slogan</label>
                                    <input
                                        className="w-full border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all font-medium text-slate-900"
                                        placeholder="e.g. The Forward Party"
                                        value={formData.party}
                                        onChange={e => setFormData({ ...formData, party: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Campaign Manifesto</label>
                                    <textarea
                                        className="w-full border-2 border-slate-100 bg-slate-50 p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary focus:bg-white outline-none transition-all resize-none font-medium text-slate-900 leading-relaxed"
                                        rows="4"
                                        placeholder="Outline your key policies and promises..."
                                        value={formData.manifesto}
                                        onChange={e => setFormData({ ...formData, manifesto: e.target.value })}
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    isLoading={loading}
                                    className="w-full mt-4 text-lg py-4"
                                    size="lg"
                                    disabled={eligibleElections.length === 0}
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </div>
                    </motion.div>

                    {/* Right Col: Campaign Overview & Charts */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        delay={0.2}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Interactive Result Chart - Light Theme */}
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Campaign Momentum</h2>
                                    <p className="text-slate-500 text-lg font-medium mt-1">Estimated polling visualization</p>
                                </div>
                                <div className="flex items-center gap-3 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                                    <span className="flex h-3 w-3 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                                    </span>
                                    <span className="text-sm font-bold text-emerald-700 uppercase tracking-widest">Live</span>
                                </div>
                            </div>

                            <div className="h-80 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={mockCampaignData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 'bold' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 14, fontWeight: 'bold' }} />
                                        <Tooltip
                                            cursor={{ fill: '#f8fafc' }}
                                            contentStyle={{ borderRadius: '16px', border: 'none', padding: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#0f172a', fontWeight: 'bold' }}
                                        />
                                        <Bar
                                            dataKey="votes"
                                            radius={[12, 12, 0, 0]}
                                            animationDuration={1500}
                                        >
                                            {
                                                mockCampaignData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === mockCampaignData.length - 1 ? '#3d47ff' : '#cbd5e1'} />
                                                ))
                                            }
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Recent Activity / Status Panel - Vibrant High Contrast */}
                        <div className="bg-[#0b0e14] rounded-[2.5rem] p-8 md:p-10 shadow-xl text-white relative overflow-hidden">
                            <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-primary/30 rounded-full blur-[100px] pointer-events-none"></div>
                            <div className="absolute bottom-[-20%] left-[-10%] w-64 h-64 bg-secondary/20 rounded-full blur-[80px] pointer-events-none"></div>

                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-10 flex items-center gap-4 tracking-tight">
                                    <div className="bg-white/10 p-3 rounded-2xl"><Activity className="text-secondary" size={28} /></div>
                                    Application Status
                                </h2>

                                <div className="space-y-0">
                                    {/* Simulated Timeline Steps */}
                                    {[
                                        { title: 'Application Submitted', date: 'Oct 24, 2026', status: 'completed' },
                                        { title: 'Identity Verification', date: 'Oct 25, 2026', status: 'completed' },
                                        { title: 'Admin Approval', date: 'Pending', status: 'current' },
                                    ].map((step, idx, arr) => (
                                        <div key={idx} className="flex gap-6">
                                            <div className="flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 z-10 ${step.status === 'completed' ? 'bg-secondary border-secondary text-white' :
                                                    step.status === 'current' ? 'bg-[#0b0e14] border-primary animate-pulse' :
                                                        'bg-[#0b0e14] border-slate-700'
                                                    }`}>
                                                    {step.status === 'completed' && <CheckCircle2 size={18} strokeWidth={3} />}
                                                    {step.status === 'current' && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                                                </div>
                                                {idx !== arr.length - 1 && <div className="w-1 h-16 bg-slate-800 my-0 -mt-2 -mb-2 z-0"></div>}
                                            </div>
                                            <div className="pb-8 pt-1">
                                                <h4 className={`text-xl font-bold ${step.status === 'current' ? 'text-white' : 'text-slate-300'} tracking-tight`}>{step.title}</h4>
                                                <p className="text-base font-medium text-slate-500 mt-1">{step.date}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>
        </PageWrapper>
    );
};

export default CandidateDashboard;
