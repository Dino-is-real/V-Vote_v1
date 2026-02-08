const express = require('express');
const { verifyToken, authorizeRoles } = require('../middleware/auth');
const {
    createElection,
    getElections,
    getElection,
    openElection,
    closeElection,
    publishResults
} = require('../controllers/electionController');

const router = express.Router();

/* READ */
router.get('/', verifyToken, getElections);
router.get('/:id', verifyToken, getElection);

/* WRITE (ADMIN ONLY) */
router.post('/', verifyToken, authorizeRoles('admin'), createElection);
router.patch('/:id/open', verifyToken, authorizeRoles('admin'), openElection);
router.patch('/:id/close', verifyToken, authorizeRoles('admin'), closeElection);
router.patch('/:id/publish', verifyToken, authorizeRoles('admin'), publishResults);

module.exports = router;
