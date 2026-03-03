const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const { castVote } = require('../controllers/voteController');

const router = express.Router();

/* VOTE (VOTER ONLY) */
router.post('/', verifyToken, authorizeRoles('voter'), castVote);

module.exports = router;
