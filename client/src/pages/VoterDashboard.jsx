import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ElectionCard from '../components/ElectionCard';
import PageWrapper from '../components/layout/PageWrapper';
import Button from '../components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Vote, CheckCircle2, AlertCircle, Clock, Lock, X } from 'lucide-react';
import toast from 'react-hot-toast';

const VoterDashboard = () => {
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const [isVoting, setIsVoting] = useState(false);
    const [voteSuccess, setVoteSuccess] = useState(false);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await api.get('/elections');
                setElections(res.data);
            } catch (err) {
                console.error(err);
                toast.error("Failed to load elections.");
            }
        };
        fetchElections();
    }, []);

    const handleVoteClick = (id) => {
        const election = elections.find(e => e._id === id);
        setSelectedElection(election);
        setVoteSuccess(false);
    };

    const confirmVote = async (candidateId) => {
        setIsVoting(true);
        try {
            await api.post('/votes', { electionId: selectedElection._id, candidateId });
            setVoteSuccess(true);
            toast.success("Vote securely recorded.");

            setTimeout(() => {
                setSelectedElection(null);
                setVoteSuccess(false);
            }, 2500);

        } catch (err) {
            toast.error(err.response?.data?.msg || "Voting Failed");
        } finally {
            setIsVoting(false);
        }
    };

    const activeCount = elections.filter(e => e.status === 'open').length;
    const upcomingCount = elections.filter(e => e.status === 'upcoming' || e.status === 'created').length;
    const pastCount = elections.filter(e => e.status === 'completed' || e.status === 'closed' || e.status === 'published').length;

    return (
        <PageWrapper className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">

                {/* Header Section - Huge Typography */}
                <div className="mb-16 mt-8">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-4">Voter Hub.</h1>
                    <p className="text-2xl text-slate-500 font-medium max-w-2xl">Participate in active elections securely and transparently.</p>
                </div>

                {/* Dashboard Stats - Vibrant Colors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="bg-primary/10 p-8 rounded-4xl border border-primary/20 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/30">
                            <Vote size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-5xl font-black text-primary tracking-tight">{activeCount}</h3>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mt-1">Active Now</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="bg-secondary/10 p-8 rounded-4xl border border-secondary/20 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center text-white shrink-0 shadow-lg shadow-secondary/30">
                            <Clock size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-5xl font-black text-secondary tracking-tight">{upcomingCount}</h3>
                            <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mt-1">Upcoming</p>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} delay={0.3} className="bg-slate-50 p-8 rounded-4xl border border-slate-200 flex items-center gap-6">
                        <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-lg">
                            <CheckCircle2 size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-5xl font-black text-slate-900 tracking-tight">{pastCount}</h3>
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Completed</p>
                        </div>
                    </motion.div>
                </div>

                {/* Elections Grid */}
                <div>
                    <div className="mb-10">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Available Elections</h2>
                        <div className="h-1 w-20 bg-primary mt-4 rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {elections.map((election, i) => (
                            <motion.div
                                key={election._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <ElectionCard
                                    election={election}
                                    onVote={handleVoteClick}
                                />
                            </motion.div>
                        ))}
                        {elections.length === 0 && (
                            <div className="col-span-full bg-slate-50 p-16 rounded-4xl border-2 border-dashed border-slate-200 text-center">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 shadow-sm">
                                    <AlertCircle size={40} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No Elections Found</h3>
                                <p className="text-lg text-slate-500 font-medium max-w-sm mx-auto">There are currently no active or upcoming elections available for you to interact with.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Secure Voting Modal - Redesigned to be lighter & friendlier while secure */}
                <AnimatePresence>
                    {selectedElection && (
                        <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                                onClick={() => !isVoting && !voteSuccess && setSelectedElection(null)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-white rounded-[2rem] shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col relative z-10 border border-slate-100"
                            >
                                <div className="p-8 md:p-10 border-b border-slate-100 bg-slate-50 relative">
                                    <div className="pr-12">
                                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-4">
                                            <Lock size={14} strokeWidth={3} /> Secure Terminal
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">{selectedElection.title}</h2>
                                        <p className="text-slate-500 mt-2 font-medium text-lg">Select a candidate carefully. This action is immutable.</p>
                                    </div>
                                    {!isVoting && !voteSuccess && (
                                        <button
                                            onClick={() => setSelectedElection(null)}
                                            className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-colors absolute top-8 right-8 shadow-sm border border-slate-100"
                                        >
                                            <X size={24} strokeWidth={2.5} />
                                        </button>
                                    )}
                                </div>

                                <div className="p-8 md:p-10 overflow-y-auto flex-1 bg-white">
                                    {voteSuccess ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-16 text-center"
                                        >
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 1, ease: "easeInOut" }}
                                                className="w-32 h-32 bg-primary rounded-full flex items-center justify-center mb-8 shadow-xl shadow-primary/30 text-white"
                                            >
                                                <CheckCircle2 size={64} strokeWidth={2.5} />
                                            </motion.div>
                                            <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Vote Secured</h3>
                                            <p className="text-xl text-primary font-bold bg-primary/10 px-6 py-3 rounded-2xl">Your cryptographic receipt has been generated.</p>
                                        </motion.div>
                                    ) : (
                                        <div className="space-y-4">
                                            {selectedElection.candidates.map((candidate, idx) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    key={candidate._id}
                                                    className="p-6 border-2 border-slate-100 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center hover:border-primary transition-all gap-6 group bg-white"
                                                >
                                                    <div className="flex-1">
                                                        <h3 className="font-bold text-2xl text-slate-900 group-hover:text-primary transition-colors tracking-tight leading-tight">{candidate.party}</h3>
                                                        <p className="text-slate-500 mt-2 font-medium text-lg">{candidate.manifesto}</p>
                                                        {candidate.user && <p className="text-sm text-slate-400 mt-3 font-bold bg-slate-50 inline-block px-3 py-1.5 rounded-xl border border-slate-100">Rep: {candidate.user.name}</p>}
                                                    </div>
                                                    <Button
                                                        onClick={() => confirmVote(candidate._id)}
                                                        isLoading={isVoting}
                                                        disabled={isVoting}
                                                        className="w-full md:w-auto shrink-0 shadow-sm px-8 py-4 text-lg"
                                                    >
                                                        Cast Vote
                                                    </Button>
                                                </motion.div>
                                            ))}
                                            {selectedElection.candidates.length === 0 && (
                                                <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-100">
                                                    <p className="text-xl font-bold text-slate-400 mb-2">No Candidates</p>
                                                    <p className="text-slate-500 font-medium">No one has registered for this election yet.</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </PageWrapper>
    );
};

export default VoterDashboard;
