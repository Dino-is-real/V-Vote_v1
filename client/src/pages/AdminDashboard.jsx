import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { LayoutDashboard, Users, PlusCircle, CheckCircle2, Clock, Archive, Settings2, ShieldCheck, Power, Activity } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const mockVoteTrend = [
    { time: '08:00', votes: 120 }, { time: '10:00', votes: 450 }, { time: '12:00', votes: 890 },
    { time: '14:00', votes: 1200 }, { time: '16:00', votes: 1850 }, { time: '18:00', votes: 2400 }
];

const mockVoterDemographics = [
    { name: '18-24', value: 400 }, { name: '25-34', value: 800 },
    { name: '35-44', value: 600 }, { name: '45+', value: 500 }
];
const COLORS = ['#3d47ff', '#f472b6', '#60a5fa', '#0ea5e9']; // Updated to match new palette

const AdminDashboard = () => {
    const [elections, setElections] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', startDate: '', endDate: ''
    });
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchElections = async () => {
        try {
            const res = await api.get('/elections');
            setElections(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch elections context.");
        }
    };

    useEffect(() => { fetchElections(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/elections', formData);
            toast.success("Election Successfully Created");
            fetchElections();
            setFormData({ title: '', description: '', startDate: '', endDate: '' });
            setIsCreating(false);
        } catch (err) {
            toast.error(err.response?.data?.msg || "Failed to create election");
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action) => {
        const toastId = toast.loading(`Initiating ${action} action...`);
        try {
            if (action === 'open') await api.patch(`/elections/${id}/open`);
            if (action === 'publish') await api.patch(`/elections/${id}/publish`);
            if (action === 'close') await api.patch(`/elections/${id}/close`);

            toast.success(`Election ${action}ed successfully`, { id: toastId });
            fetchElections();
        } catch (err) {
            toast.error(`Action failed: ${err.message}`, { id: toastId });
        }
    };

    return (
        <PageWrapper className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header Section - Huge Typography */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 mt-8 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">Admin Hub.</h1>
                        <p className="text-2xl text-slate-500 font-medium max-w-2xl">Manage elections, monitor participation, and oversee platform integrity.</p>
                    </div>
                    <Button onClick={() => setIsCreating(!isCreating)} size="lg" className="shrink-0 text-lg px-8 py-4 shadow-sm">
                        {isCreating ? 'Cancel Creation' : <><PlusCircle size={24} strokeWidth={2.5} className="mr-2" /> New Election</>}
                    </Button>
                </div>

                {isCreating && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mb-16 overflow-hidden"
                    >
                        <h2 className="text-3xl font-black mb-8 flex items-center gap-3 text-slate-900 tracking-tight">
                            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                                <LayoutDashboard size={24} strokeWidth={2.5} />
                            </div>
                            Setup New Election Configuration
                        </h2>
                        <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700">Election Title</label>
                                <input
                                    className="w-full border-2 border-slate-100 bg-white p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                                    placeholder="e.g. 2026 Board of Directors"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-6 md:row-span-2">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">Start Date & Time</label>
                                    <input
                                        className="w-full border-2 border-slate-100 bg-white p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                                        type="datetime-local"
                                        value={formData.startDate}
                                        onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-700">End Date & Time</label>
                                    <input
                                        className="w-full border-2 border-slate-100 bg-white p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-slate-900"
                                        type="datetime-local"
                                        value={formData.endDate}
                                        onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700">Description</label>
                                <textarea
                                    className="w-full border-2 border-slate-100 bg-white p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all resize-none font-medium text-slate-900 leading-relaxed"
                                    placeholder="Brief background about this election..."
                                    rows="4"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div className="md:col-span-2 pt-4">
                                <Button type="submit" isLoading={loading} size="lg" className="w-full md:w-auto px-12 py-4 text-lg">
                                    Initialize Election
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                )}

                <div className="grid lg:grid-cols-3 gap-10">
                    {/* Active Grid (Elections) */}
                    <div className="lg:col-span-2 space-y-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Management Panel</h2>
                        <div className="h-1 w-20 bg-primary mb-8 rounded-full"></div>

                        <div className="space-y-6">
                            {elections.map((election, idx) => (
                                <motion.div
                                    key={election._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border-2 border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-primary/20 transition-all group"
                                >
                                    <div>
                                        <h3 className="font-bold text-2xl text-slate-900 leading-tight group-hover:text-primary transition-colors tracking-tight">{election.title}</h3>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-xl flex items-center gap-2 w-fit
                                                ${election.status === 'open' ? 'bg-emerald-100 text-emerald-700' :
                                                    election.status === 'created' ? 'bg-primary/10 text-primary' :
                                                        election.status === 'closed' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-700'}`}
                                            >
                                                {election.status === 'open' && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse border border-emerald-400"></span>}
                                                {election.status}
                                            </span>
                                            <span className="text-sm text-slate-500 font-bold">{new Date(election.startDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 w-full sm:w-auto shrink-0">
                                        {election.status === 'created' && (
                                            <Button size="md" onClick={() => handleAction(election._id, 'open')} className="w-full sm:w-auto px-6">
                                                <Power size={18} strokeWidth={2.5} className="mr-2" /> Open
                                            </Button>
                                        )}
                                        {election.status === 'open' && (
                                            <Button size="md" onClick={() => handleAction(election._id, 'close')} variant="secondary" className="w-full sm:w-auto border-2 border-amber-200 text-amber-700 hover:bg-amber-50 hover:border-amber-300 px-6">
                                                <Clock size={18} strokeWidth={2.5} className="mr-2" /> Close
                                            </Button>
                                        )}
                                        {election.status === 'closed' && (
                                            <Button size="md" onClick={() => handleAction(election._id, 'publish')} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white px-6">
                                                <Archive size={18} strokeWidth={2.5} className="mr-2" /> Publish
                                            </Button>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                            {elections.length === 0 && (
                                <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">No elections</h3>
                                    <p className="text-slate-500 font-medium mt-2">Create a new election to get started.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Analytics */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Analytics</h2>
                        <div className="h-1 w-20 bg-secondary mb-8 rounded-full"></div>

                        {/* Trend Line Chart */}
                        <div className="bg-[#0b0e14] p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-[-10%] w-48 h-48 bg-primary/20 rounded-full blur-[60px]"></div>
                            <h3 className="font-bold text-white mb-6 text-sm uppercase tracking-widest flex items-center gap-2 relative z-10">
                                <Activity size={16} className="text-primary" /> Vote Velocity Today
                            </h3>
                            <div className="h-48 relative z-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockVoteTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', backgroundColor: '#ffffff', color: '#0f172a', fontWeight: 'bold' }} itemStyle={{ color: '#0f172a' }} />
                                        <Line type="monotone" dataKey="votes" stroke="#3d47ff" strokeWidth={4} dot={{ r: 5, fill: '#3d47ff', strokeWidth: 3, stroke: '#fff' }} activeDot={{ r: 8 }} animationDuration={2000} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Demographics Pie Chart */}
                        <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-[-10%] right-[-10%] w-48 h-48 bg-secondary/10 rounded-full blur-[60px]"></div>
                            <h3 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-widest relative z-10">Voter Demographics</h3>
                            <div className="h-56 relative z-10 mt-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={mockVoterDemographics}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={85}
                                            paddingAngle={8}
                                            cornerRadius={8}
                                            dataKey="value"
                                            animationDuration={1500}
                                        >
                                            {mockVoterDemographics.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', padding: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} itemStyle={{ fontWeight: 'bold', color: '#0f172a' }} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex flex-wrap justify-center gap-4 mt-6 relative z-10">
                                {mockVoterDemographics.map((entry, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        {entry.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </PageWrapper>
    );
};

export default AdminDashboard;
