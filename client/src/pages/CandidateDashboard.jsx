import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const CandidateDashboard = () => {
    const [elections, setElections] = useState([]);
    const [myCandidacy, setMyCandidacy] = useState([]);
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({ party: '', manifesto: '', electionId: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const elecRes = await api.get('/elections');
                setElections(elecRes.data);
                // In a real app, fetching "my candidacies" would be a separate endpoint
                // For now, we assume the user tracks this locally or we filter on frontend if needed
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/candidates', formData);
            alert("Registered Successfully!");
            setFormData({ party: '', manifesto: '', electionId: '' });
        } catch (err) {
            alert(err.response?.data?.msg || "Registration Failed");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Candidate Dashboard</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Registration Form */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold mb-4">Register for an Election</h2>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Select Election</label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.electionId}
                                onChange={e => setFormData({ ...formData, electionId: e.target.value })}
                                required
                            >
                                <option value="">-- Select --</option>
                                {elections.filter(e => e.status === 'created' || e.status === 'open').map(e => (
                                    <option key={e._id} value={e._id}>{e.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Party / Slogan</label>
                            <input
                                className="w-full border p-2 rounded"
                                value={formData.party}
                                onChange={e => setFormData({ ...formData, party: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Manifesto</label>
                            <textarea
                                className="w-full border p-2 rounded"
                                rows="3"
                                value={formData.manifesto}
                                onChange={e => setFormData({ ...formData, manifesto: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-blue-600">
                            Register
                        </button>
                    </form>
                </div>

                {/* Status Panel (Placeholder) */}
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h2 className="text-xl font-bold mb-4 text-blue-800">My Campaigns</h2>
                    <p className="text-gray-600">
                        Once registered, your campaign details will appear here.
                        You can track your vote counts once results are published.
                    </p>
                    {/* List can be implemented here */}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
