import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, AlertCircle, BarChart2, CheckCircle2, Users, Crown, Medal } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';

const Results = () => {
    const [elections, setElections] = useState([]);
    const [selectedElectionId, setSelectedElectionId] = useState('');
    const [chartData, setChartData] = useState([]);
    const [totalVotes, setTotalVotes] = useState(0);

    // Using the vibrant 'Healthy Together' palette for charts
    const COLORS = ['#3d47ff', '#f472b6', '#60a5fa', '#0ea5e9', '#a855f7', '#14b8a6'];

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await api.get('/elections');
                const published = res.data.filter(e => e.status === 'published');
                setElections(published);
                if (published.length > 0) setSelectedElectionId(published[0]._id);
            } catch (err) {
                console.error(err);
            }
        };
        fetchElections();
    }, []);

    useEffect(() => {
        if (!selectedElectionId) return;
        const election = elections.find(e => e._id === selectedElectionId);
        if (election) {
            // Sort candidates by voteCount descending
            const sortedCandidates = [...election.candidates].sort((a, b) => b.voteCount - a.voteCount);
            const data = sortedCandidates.map(c => ({
                name: c.user?.name || c.party || 'Unknown',
                votes: c.voteCount,
                party: c.party
            }));
            setChartData(data);

            const total = sortedCandidates.reduce((sum, c) => sum + c.voteCount, 0);
            setTotalVotes(total);
        }
    }, [selectedElectionId, elections]);

    const winner = chartData.length > 0 && chartData[0].votes > 0 ? chartData[0] : null;

    return (
        <PageWrapper className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">

                <div className="text-center mb-16 pt-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center justify-center w-20 h-20 rounded-[1.5rem] bg-gradient-to-tr from-primary to-[#f472b6] text-white mb-8 shadow-2xl shadow-primary/30"
                    >
                        <Trophy size={40} strokeWidth={2.5} />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-6 leading-none"
                    >
                        Official Results.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl text-slate-500 font-medium max-w-3xl mx-auto"
                    >
                        Transparent and cryptographically verified election outcomes.
                    </motion.p>
                </div>

                {elections.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-50 rounded-[3rem] p-16 text-center shadow-sm max-w-3xl mx-auto mt-12 border-2 border-dashed border-slate-200"
                    >
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300 shadow-sm border border-slate-100">
                            <AlertCircle size={48} strokeWidth={2.5} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">No Published Results</h2>
                        <p className="text-xl text-slate-500 font-medium">There are currently no published elections. Check back later once an election concludes.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        {/* Huge Selector */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-slate-50 p-6 rounded-[2rem] shadow-sm flex flex-col sm:flex-row items-center justify-center gap-6 max-w-3xl mx-auto border border-slate-100"
                        >
                            <label className="font-bold text-slate-500 text-sm uppercase tracking-widest shrink-0 whitespace-nowrap">View Election</label>
                            <select
                                className="w-full border-2 border-slate-200 bg-white p-4 rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none font-bold text-slate-900 text-lg transition-all appearance-none cursor-pointer"
                                value={selectedElectionId}
                                onChange={e => setSelectedElectionId(e.target.value)}
                            >
                                {elections.map(e => (
                                    <option key={e._id} value={e._id}>{e.title}</option>
                                ))}
                            </select>
                        </motion.div>

                        <div className="grid lg:grid-cols-12 gap-10 items-start mt-16 mt-8">

                            {/* Summary Cards */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="lg:col-span-5 space-y-8"
                            >
                                <div className="bg-[#0b0e14] rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col">
                                    <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-primary/40 rounded-full blur-[80px] pointer-events-none"></div>
                                    <div className="absolute bottom-[-10%] left-[-20%] w-48 h-48 bg-[#f472b6]/30 rounded-full blur-[60px] pointer-events-none"></div>

                                    <div className="relative z-10 flex items-center justify-between mb-8">
                                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold tracking-widest uppercase text-white/90 backdrop-blur-md">
                                            <Crown size={18} className="text-amber-400" /> Winner
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex-1 flex flex-col justify-center py-6">
                                        {winner ? (
                                            <>
                                                <div className="text-5xl md:text-6xl font-black mb-3 leading-none tracking-tighter drop-shadow-md">{winner.name}</div>
                                                <div className="text-xl text-slate-300 font-bold mb-8">{winner.party}</div>
                                                <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-6 py-3 rounded-2xl text-lg font-black text-emerald-400 w-fit">
                                                    <CheckCircle2 size={24} strokeWidth={2.5} />
                                                    {winner.votes.toLocaleString()} Verified Votes
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-2xl font-bold text-slate-500 text-center py-10">
                                                Awaiting secure ballot tally...
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 shadow-sm flex items-center gap-8 group hover:border-slate-200 transition-colors">
                                    <div className="w-20 h-20 rounded-3xl bg-white border-4 border-slate-100 flex items-center justify-center text-primary shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                                        <Users size={40} strokeWidth={2.5} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total Turnout</div>
                                        <div className="text-5xl font-black text-slate-900 tracking-tighter">{totalVotes.toLocaleString()}</div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Chart Data visualization */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="lg:col-span-7 bg-white rounded-[3rem] p-8 md:p-12 border-2 border-slate-50 shadow-sm"
                            >
                                <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4 tracking-tight">
                                    <div className="bg-primary/10 p-3 rounded-2xl text-primary"><BarChart2 size={28} strokeWidth={2.5} /></div>
                                    Vote Distribution
                                </h3>

                                <div className="h-[400px] w-full relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} layout="vertical">
                                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 'bold' }} />
                                            <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#0f172a', fontSize: 16, fontWeight: 'bold' }} width={120} />
                                            <Tooltip
                                                cursor={{ fill: '#f8fafc' }}
                                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '16px 20px' }}
                                                itemStyle={{ fontWeight: 'bold', color: '#0f172a', fontSize: '18px' }}
                                                formatter={(value) => [value, 'Votes']}
                                            />
                                            <Bar dataKey="votes" radius={[0, 16, 16, 0]} animationDuration={1500} barSize={50}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                {/* Custom Legend / List aligned with bars - Reimagined as large graphic tags */}
                                <div className="mt-12 space-y-4">
                                    {chartData.map((row, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors hover:shadow-sm">
                                            <div className="flex items-center gap-5">
                                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md font-black text-xl" style={{ backgroundColor: COLORS[idx % COLORS.length] }}>
                                                    {idx + 1}
                                                </div>
                                                <div>
                                                    <div className="font-black text-xl text-slate-900 tracking-tight">{row.name}</div>
                                                    <div className="text-sm font-bold text-slate-500 mt-1">{row.party}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-black text-3xl" style={{ color: COLORS[idx % COLORS.length] }}>
                                                    {row.votes}
                                                </div>
                                                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">votes</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </div>
        </PageWrapper>
    );
};

export default Results;
