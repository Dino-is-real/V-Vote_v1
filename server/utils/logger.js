const AuditLog = require('../models/AuditLog');

const logAction = async (action, performedBy, details = {}, req = {}) => {
    try {
        const newLog = new AuditLog({
            action,
            performedBy,
            details,
            ipAddress: req.ip || '',
            userAgent: req.get ? req.get('User-Agent') : '',
        });
        await newLog.save();
    } catch (err) {
        console.error("Failed to create audit log:", err);
    }
};

module.exports = { logAction };
