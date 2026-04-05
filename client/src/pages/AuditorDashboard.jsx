import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FileSearch, ShieldCheck, Download, AlertTriangle, Fingerprint, Database, CheckCircle2, History, Loader2, Shield } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

const AuditorDashboard = () => {
    const [logs, setLogs] = useState([]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [verifiedState, setVerifiedState] = useState(false);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/audit');
                setLogs(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch audit logs.");
            }
        };
        fetchLogs();
    }, []);

    const handleGenerateReport = async () => {
        setIsVerifying(true);
        setVerifiedState(false);
        const toastId = toast.loading("Verifying cryptographic signatures and generating report...");

        try {
            const res = await api.post('/audit/report');

            setTimeout(() => {
                toast.success(res.data.msg || "System Integrity Verified Successfully", { id: toastId, duration: 4000 });
                setIsVerifying(false);
                setVerifiedState(true);
            }, 2500);

        } catch (err) {
            toast.error("Integrity Verification Failed", { id: toastId });
            setIsVerifying(false);
        }
    };

    const getActionIcon = (action) => {
        if (action.includes('VOTE')) return <Fingerprint className="text-secondary" size={24} strokeWidth={2.5} />;
        if (action.includes('ELECTION')) return <Database className="text-primary" size={24} strokeWidth={2.5} />;
        if (action.includes('USER') || action.includes('REGISTER')) return <FileSearch className="text-accent" size={24} strokeWidth={2.5} />;
        return <AlertTriangle className="text-amber-500" size={24} strokeWidth={2.5} />;
    };

    // Determine color class based on action text for matching tags
    const getActionColorClass = (action) => {
        if (action.includes('VOTE')) return 'bg-secondary/10 text-secondary';
        if (action.includes('ELECTION')) return 'bg-primary/10 text-primary';
        if (action.includes('USER') || action.includes('REGISTER')) return 'bg-accent/10 text-accent';
        return 'bg-amber-100 text-amber-700';
    };

    return (
        <PageWrapper className="bg-slate-50 min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 mt-8 gap-6">
                    <div>
                        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">Verification.</h1>
                        <p className="text-2xl text-slate-500 font-medium max-w-2xl">Cryptographic logs of all system activities.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
                        <AnimatePresence>
                            {verifiedState && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex items-center gap-2 text-emerald-700 bg-emerald-100 px-4 py-3 rounded-2xl border border-emerald-200 text-sm font-bold tracking-widest uppercase"
                                >
                                    <CheckCircle2 size={20} strokeWidth={3} /> System Verified
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            onClick={handleGenerateReport}
                            disabled={isVerifying}
                            size="lg"
                            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white shadow-sm px-8 py-4 text-lg"
                        >
                            {isVerifying ? <Loader2 className="animate-spin mr-2" size={24} /> : <><ShieldCheck size={24} strokeWidth={2.5} className="mr-2" /> Integrity Check</>}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-10">

                    {/* Log Timeline (Left Col, 3/4) */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col h-[75vh]">

                            <div className="p-8 border-b border-slate-100 bg-slate-50 flex justify-between items-center z-20">
                                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 tracking-tight">
                                    <div className="bg-slate-200 p-2 rounded-xl text-slate-600">
                                        <History size={24} strokeWidth={2.5} />
                                    </div>
                                    Activity Ledger
                                </h2>
                                <span className="text-xs font-bold text-slate-500 bg-slate-200 px-4 py-2 rounded-full uppercase tracking-widest">
                                    {logs.length} Records
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-8 md:p-10 scroll-smooth relative bg-white">
                                {/* Connecting timeline line */}
                                <div className="absolute top-0 bottom-0 left-12 md:left-14 w-1 bg-slate-100 z-0 rounded-full"></div>

                                <div className="space-y-8 relative z-10">
                                    {logs.map((log, index) => (
                                        <motion.div
                                            key={log._id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: Math.min(index * 0.05, 1) }}
                                            className="flex gap-6 md:gap-8 group"
                                        >
                                            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-50 border-4 border-white shadow-sm flex items-center justify-center shrink-0 z-10 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                                                {getActionIcon(log.action)}
                                            </div>

                                            <div className="flex-1 bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm group-hover:shadow-md group-hover:border-slate-100 transition-all">
                                                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                                                    <div className="flex flex-wrap items-center gap-3">
                                                        <span className={`text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl ${getActionColorClass(log.action)}`}>
                                                            {log.action}
                                                        </span>
                                                        <span className="text-xs font-bold font-mono bg-slate-800 text-white px-3 py-1.5 rounded-xl uppercase tracking-widest">
                                                            {log.performedBy ? log.performedBy.role : 'SYSTEM'}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-slate-400 font-bold whitespace-nowrap bg-slate-50 px-3 py-1.5 rounded-xl">
                                                        {new Date(log.createdAt).toLocaleString(undefined, {
                                                            month: 'short', day: 'numeric',
                                                            hour: '2-digit', minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>

                                                <div className="text-base text-slate-500 font-medium mb-4">
                                                    Actor: <span className="font-bold text-slate-900 ml-1">{log.performedBy ? log.performedBy.name : 'Automated Process'}</span>
                                                </div>

                                                <div className="bg-slate-50 rounded-2xl p-4 text-xs font-mono text-slate-500 overflow-x-auto border border-slate-100 font-medium leading-relaxed">
                                                    {log.details ? JSON.stringify(log.details) : 'No additional cryptographic details available.'}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}

                                    {logs.length === 0 && (
                                        <div className="text-center py-24">
                                            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-slate-300 border border-slate-100 shadow-sm">
                                                <History size={40} strokeWidth={2.5} />
                                            </div>
                                            <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Ledger Empty</h3>
                                            <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto">System activities will be securely logged and verifiable here.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Report Summary (Right Col, 1/4) */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0b0e14] rounded-[2.5rem] p-8 shadow-xl text-white relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/20 rounded-full blur-[60px] pointer-events-none"></div>

                            <h2 className="text-2xl font-black mb-10 flex items-center gap-3 relative z-10 tracking-tight">
                                <div className="bg-white/10 p-2.5 rounded-xl"><Shield className="text-emerald-400" size={24} strokeWidth={2.5} /></div>
                                Node Status
                            </h2>

                            <div className="space-y-8 relative z-10">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                                    <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">State Root Hash</div>
                                    <div className="font-mono text-xs text-emerald-400 bg-emerald-500/10 p-3 rounded-xl truncate font-bold">
                                        0x8f2d...c4b9
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-sm font-bold text-slate-400">Transactions</span>
                                        <span className="font-black text-xl">{logs.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                                        <span className="text-sm font-bold text-slate-400">Node Uptime</span>
                                        <span className="font-black text-xl text-emerald-400">99.99%</span>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-slate-800">
                                    <div className="flex items-start gap-4 text-sm font-medium text-slate-400 leading-relaxed bg-slate-900 p-5 rounded-2xl border border-slate-800">
                                        <Database className="text-slate-500 shrink-0 mt-1" size={20} />
                                        <p>The system utilizes a verifiable append-only structure. Previous records are completely immutable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageWrapper>
    );
};

export default AuditorDashboard;
