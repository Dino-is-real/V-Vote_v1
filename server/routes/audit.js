const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const { getAuditLogs, generateReport } = require('../controllers/auditController');

const router = express.Router();

/* AUDITOR (AUDITOR ONLY) */
router.get('/', verifyToken, authorizeRoles('auditor'), getAuditLogs);
router.post('/report', verifyToken, authorizeRoles('auditor'), generateReport);

module.exports = router;
