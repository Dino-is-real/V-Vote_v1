import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const Results = () => {
    const [elections, setElections] = useState([]);
    const [selectedElectionId, setSelectedElectionId] = useState('');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await api.get('/elections');
                const published = res.data.filter(e => e.status === 'published');
                setElections(published);
                if (published.length > 0) setSelectedElectionId(published[0]._id);
            } catch (err) { console.error(err); }
        };
        fetchElections();
    }, []);

    useEffect(() => {
        if (!selectedElectionId) return;
        const election = elections.find(e => e._id === selectedElectionId);
        if (election) {
            const data = election.candidates.map(c => ({
                name: c.user?.name || c.party || 'Unknown',
                votes: c.voteCount,
                party: c.party
            }));
            setChartData(data);
        }
    }, [selectedElectionId, elections]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Election Results</h1>

            {elections.length === 0 ? (
                <div className="text-center text-gray-500 text-xl">No results published yet.</div>
            ) : (
                <>
                    {/* Filter Section */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-white p-4 rounded-xl shadow-md flex items-center gap-4">
                            <label className="font-semibold text-gray-700">Select Election:</label>
                            <select
                                className="border p-2 rounded-lg outline-none focus:ring-2 focus:ring-primary"
                                value={selectedElectionId}
                                onChange={e => setSelectedElectionId(e.target.value)}
                            >
                                {elections.map(e => (
                                    <option key={e._id} value={e._id}>{e.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Chart Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto h-[500px]">
                        <h2 className="text-2xl font-bold text-center mb-6">Vote Distribution</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis allowDecimals={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} />
                                <Legend />
                                <Bar dataKey="votes" name="Votes" radius={[10, 10, 0, 0]}>
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Stats Table */}
                    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-xl shadow border overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Party</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Votes</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {chartData.map((row, idx) => (
                                    <tr key={idx}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.party}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary">{row.votes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default Results;
