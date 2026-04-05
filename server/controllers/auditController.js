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

/* GENERATE REPORT */
const generateReport = async (req, res) => {
    try {
        const logs = await AuditLog.find().populate('performedBy', 'name email role').sort({ createdAt: -1 });
        
        let csv = 'Timestamp,Action,Performed By (Name),Performed By (Role),Details\n';
        
        logs.forEach(log => {
            const time = new Date(log.createdAt).toISOString();
            const action = log.action;
            const name = log.performedBy ? log.performedBy.name : 'SYSTEM';
            const role = log.performedBy ? log.performedBy.role : 'system';
            // Escape quotes for CSV
            const details = log.details ? JSON.stringify(log.details).replace(/"/g, '""') : '';
            
            csv += `"${time}","${action}","${name}","${role}","${details}"\n`;
        });
        
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=audit_report.csv');
        return res.status(200).send(csv);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAuditLogs, generateReport };
