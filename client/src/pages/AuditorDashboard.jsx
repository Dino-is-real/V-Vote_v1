import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AuditorDashboard = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await api.get('/audit');
                setLogs(res.data);
            } catch (err) { console.error(err); }
        };
        fetchLogs();
    }, []);

    const handleGenerateReport = async () => {
        try {
            const res = await api.post('/audit/report');
            alert(res.data.msg);
        } catch (err) { alert("Report Generation Failed"); }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Auditor Dashboard</h1>
                <button
                    onClick={handleGenerateReport}
                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black transition"
                >
                    Generate Report
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performed By</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {logs.map(log => (
                            <tr key={log._id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(log.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {log.action}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {log.performedBy ? `${log.performedBy.name} (${log.performedBy.role})` : 'System'}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                                    {JSON.stringify(log.details)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {logs.length === 0 && <p className="p-6 text-center text-gray-500">No logs found.</p>}
            </div>
        </div>
    );
};

export default AuditorDashboard;
