import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Tag, ChevronRight, Activity, CheckCircle, Clock } from 'lucide-react';
import Button from './ui/Button';

const ElectionCard = ({ election, onVote }) => {
    const isOpen = election.status === 'open';
    const isUpcoming = election.status === 'upcoming' || election.status === 'created';
    const isClosed = election.status === 'completed' || election.status === 'closed' || election.status === 'published';

    const getStatusConfig = () => {
        if (isOpen) return { color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: Activity };
        if (isUpcoming) return { color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: Clock };
        return { color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: CheckCircle };
    };

    const statusConfig = getStatusConfig();
    const StatusIcon = statusConfig.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group transition-shadow hover:shadow-xl hover:shadow-slate-200/50 ${isOpen ? 'hover:border-primary/30' : ''}`}
        >
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4 gap-4">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors line-clamp-2">
                        {election.title}
                    </h3>
                    <div className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider shrink-0 ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border`}>
                        <StatusIcon size={14} className={isOpen ? "animate-pulse" : ""} />
                        {election.status}
                    </div>
                </div>

                <p className="text-slate-600 mb-6 text-sm line-clamp-3 flex-1 break-words">
                    {election.description || "No description provided for this election event."}
                </p>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="flex-1">Start: {new Date(election.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="flex-1">End: {new Date(election.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </div>
            </div>

            {/* Actions Area */}
            {onVote && isOpen && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                    <Button
                        onClick={() => onVote(election._id)}
                        className="w-full flex justify-between items-center group-hover:shadow-primary/20"
                    >
                        <span>View Candidates & Vote</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            )}

            {onVote && !isOpen && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 mt-auto">
                    <Button
                        variant="ghost"
                        className="w-full cursor-default"
                        disabled
                    >
                        {isUpcoming ? 'Voting Not Started' : 'Voting Closed'}
                    </Button>
                </div>
            )}
        </motion.div>
    );
};

export default ElectionCard;
