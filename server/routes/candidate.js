const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const { registerCandidate, approveCandidate } = require('../controllers/candidateController');

const router = express.Router();

/* CANDIDATE (CANDIDATE ONLY) */
router.post('/', verifyToken, authorizeRoles('candidate'), registerCandidate);

/* APPROVE CANDIDATE (ADMIN ONLY) */
router.patch('/:id/approve', verifyToken, authorizeRoles('admin'), approveCandidate);

module.exports = router;
