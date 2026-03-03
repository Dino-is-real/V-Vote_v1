const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const { registerCandidate } = require('../controllers/candidateController');

const router = express.Router();

/* CANDIDATE (CANDIDATE ONLY) */
router.post('/', verifyToken, authorizeRoles('candidate'), registerCandidate);

module.exports = router;
