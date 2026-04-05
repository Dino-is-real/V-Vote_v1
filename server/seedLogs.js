require('dotenv').config();
const mongoose = require('mongoose');
const AuditLog = require('./models/AuditLog');
const User = require('./models/User');

const seedLogs = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB...");

        // Try to find an admin and a voter
        const admin = await User.findOne({ role: 'admin' });
        const voter = await User.findOne({ role: 'voter' });

        const adminId = admin ? admin._id : null;
        const voterId = voter ? voter._id : null;

        const fakeLogs = [
            {
                action: 'USER_REGISTERED',
                performedBy: voterId,
                details: { ip: '192.168.1.105', method: 'web_form', userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
            },
            {
                action: 'ELECTION_CREATED',
                performedBy: adminId,
                details: { electionName: 'Student Council 2026', type: 'plurality', requiredRole: 'voter' },
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
            },
            {
                action: 'CANDIDATE_APPROVED',
                performedBy: adminId,
                details: { candidateName: 'Alice Smith', electionId: 'eth_sc2026' },
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
            },
            {
                action: 'ELECTION_PUBLISHED',
                performedBy: adminId,
                details: { electionName: 'Student Council 2026', publishedTxHash: '0xabc123def456' },
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
            },
            {
                action: 'VOTE_CAST',
                performedBy: voterId,
                details: { electionId: 'eth_sc2026', txHash: '0x8f2dc5a0b7e4f9...', signature: '0x99dd83...' },
                createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
            }
        ];

        await AuditLog.insertMany(fakeLogs);
        console.log("Fake audit logs inserted successfully!");
        process.exit(0);

    } catch (err) {
        console.error("Error during seeding:", err);
        process.exit(1);
    }
};

seedLogs();
