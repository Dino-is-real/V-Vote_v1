import React from 'react';
import { motion } from 'framer-motion';

const ElectionCard = ({ election, onVote }) => {
    const isOpen = election.status === 'open';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition"
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{election.title}</h3>
                    <span className={`px-3 py-1 text-xs font-bold uppercase rounded-full ${isOpen ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                        {election.status}
                    </span>
                </div>
                <p className="text-gray-600 mb-4 text-sm">{election.description}</p>

                <div className="text-sm text-gray-500 mb-6 space-y-1">
                    <p>Start: {new Date(election.startDate).toLocaleDateString()}</p>
                    <p>End: {new Date(election.endDate).toLocaleDateString()}</p>
                </div>

                {onVote && isOpen && (
                    <button
                        onClick={() => onVote(election._id)}
                        className="w-full bg-primary text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
                    >
                        View Candidates & Vote
                    </button>
                )}
            </div>
        </motion.div>
    );
};

export default ElectionCard;
