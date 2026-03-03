import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [elections, setElections] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', startDate: '', endDate: ''
    });

    const fetchElections = async () => {
        try {
            const res = await api.get('/elections');
            setElections(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchElections(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/elections', formData);
            alert("Election Created");
            fetchElections();
            setFormData({ title: '', description: '', startDate: '', endDate: '' });
        } catch (err) { alert("Failed to create election"); }
    };

    const handleAction = async (id, action) => {
        try {
            if (action === 'open') await api.patch(`/elections/${id}/open`);
            if (action === 'publish') await api.patch(`/elections/${id}/publish`);
            if (action === 'close') await api.patch(`/elections/${id}/close`);
            fetchElections();
        } catch (err) { alert("Action failed"); }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Create Election Form */}
            <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                <h2 className="text-xl font-bold mb-4">Create New Election</h2>
                <form onSubmit={handleCreate} className="grid md:grid-cols-2 gap-4">
                    <input className="border p-2 rounded" placeholder="Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />
                    <input className="border p-2 rounded" type="datetime-local" value={formData.startDate} onChange={e => setFormData({ ...formData, startDate: e.target.value })} required />
                    <input className="border p-2 rounded" type="datetime-local" value={formData.endDate} onChange={e => setFormData({ ...formData, endDate: e.target.value })} required />
                    <textarea className="border p-2 rounded md:col-span-2" placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <button type="submit" className="bg-primary text-white py-2 rounded md:col-span-2 hover:bg-blue-600">Create Election</button>
                </form>
            </div>

            {/* Manage Elections */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold mb-4">Manage Elections</h2>
                {elections.map(election => (
                    <div key={election._id} className="bg-white p-4 rounded-xl shadow border flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{election.title}</h3>
                            <span className="text-sm text-gray-500 uppercase">{election.status}</span>
                        </div>
                        <div className="flex gap-2">
                            {election.status === 'created' && (
                                <button onClick={() => handleAction(election._id, 'open')} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Open For Voting</button>
                            )}
                            {election.status === 'open' && (
                                <button onClick={() => handleAction(election._id, 'close')} className="bg-red-500 text-white px-3 py-1 rounded text-sm">Close</button>
                            )}
                            {election.status === 'closed' && (
                                <button onClick={() => handleAction(election._id, 'publish')} className="bg-green-500 text-white px-3 py-1 rounded text-sm">Publish Results</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
