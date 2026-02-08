const AuditLog = require('../models/AuditLog');

/* GET AUDIT LOGS */
const getAuditLogs = async (req, res) => {
    try {
        const logs = await AuditLog.find()
            .populate('performedBy', 'name email role')
            .sort({ createdAt: -1 });
        res.status(200).json(logs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* GENERATE REPORT (Placeholder) */
const generateReport = async (req, res) => {
    try {
        // In a real app, this would generate a PDF or CSV
        res.status(200).json({ msg: "Report generation started..." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAuditLogs, generateReport };
