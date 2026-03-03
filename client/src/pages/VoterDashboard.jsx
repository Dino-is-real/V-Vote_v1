import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import ElectionCard from '../components/ElectionCard';

const VoterDashboard = () => {
    const [elections, setElections] = useState([]);
    const [selectedElection, setSelectedElection] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await api.get('/elections');
                setElections(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchElections();
    }, []);

    const handleVoteClick = (id) => {
        const election = elections.find(e => e._id === id);
        setSelectedElection(election);
    };

    const confirmVote = async (candidateId) => {
        try {
            await api.post('/votes', { electionId: selectedElection._id, candidateId });
            alert("Vote Cast Successfully!");
            setSelectedElection(null);
        } catch (err) {
            alert(err.response?.data?.msg || "Voting Failed");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Voter Dashboard</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {elections.map(election => (
                    <ElectionCard
                        key={election._id}
                        election={election}
                        onVote={handleVoteClick}
                    />
                ))}
            </div>

            {/* Voting Modal (Simplified) */}
            {selectedElection && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{selectedElection.title} - Candidates</h2>
                            <button onClick={() => setSelectedElection(null)} className="text-gray-500 hover:text-gray-800">Close</button>
                        </div>

                        <div className="space-y-4">
                            {selectedElection.candidates.map(candidate => (
                                <div key={candidate._id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50">
                                    <div>
                                        <h3 className="font-bold text-lg">{candidate.party}</h3>
                                        <p className="text-sm text-gray-600">{candidate.manifesto}</p>
                                    </div>
                                    <button
                                        onClick={() => confirmVote(candidate._id)}
                                        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-emerald-600 transition"
                                    >
                                        Vote
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VoterDashboard;
