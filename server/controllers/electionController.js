const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const Vote = require('../models/Vote');

/* CREATE ELECTION */
const createElection = async (req, res) => {
    try {
        const { title, description, startDate, endDate } = req.body;
        const newElection = new Election({
            title,
            description,
            startDate,
            endDate,
            createdBy: req.user.id,
        });
        const savedElection = await newElection.save();
        res.status(201).json(savedElection);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* GET ALL ELECTIONS */
const getElections = async (req, res) => {
    try {
        const elections = await Election.find().populate('candidates').lean(); // Use lean() to modify results

        // Redact vote counts if election is not published to prevent early results leaking
        const processedElections = elections.map(election => {
            if (election.status !== 'published') {
                election.candidates = election.candidates.map(c => {
                    const candidateObj = { ...c };
                    delete candidateObj.voteCount; // Hide vote count
                    return candidateObj;
                });
            }
            return election;
        });

        res.status(200).json(processedElections);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* GET ELECTION BY ID */
const getElection = async (req, res) => {
    try {
        const { id } = req.params;
        const election = await Election.findById(id).populate({
            path: 'candidates',
            populate: { path: 'user', select: 'name profileImage' }
        }).lean(); // Use lean to modify the object

        if (!election) return res.status(404).json({ msg: "Election not found" });

        // Redact vote counts if election is not published
        if (election.status !== 'published') {
            election.candidates = election.candidates.map(c => {
                const candidateObj = { ...c };
                delete candidateObj.voteCount;
                return candidateObj;
            });
        }

        res.status(200).json(election);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* OPEN ELECTION (ADMIN) */
const openElection = async (req, res) => {
    try {
        const { id } = req.params;
        const election = await Election.findById(id);
        if (!election) return res.status(404).json({ msg: "Election not found" });

        election.status = 'open';
        await election.save();
        res.status(200).json(election);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* CLOSE ELECTION (ADMIN) */
const closeElection = async (req, res) => {
    try {
        const { id } = req.params;
        const election = await Election.findById(id);
        if (!election) return res.status(404).json({ msg: "Election not found" });

        election.status = 'closed';
        await election.save();
        res.status(200).json(election);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* PUBLISH RESULTS (ADMIN) */
const publishResults = async (req, res) => {
    try {
        const { id } = req.params;
        const election = await Election.findById(id).populate('candidates');
        if (!election) return res.status(404).json({ msg: "Election not found" });

        // Simple winner calculation
        let winner = null;
        let maxVotes = -1;

        // Ensure candidates are populated and have voteCount
        // In a real scenario, we might recount from Vote collection to be sure

        for (let candidate of election.candidates) {
            // Re-fetch candidate to get latest vote count if needed, 
            // but assuming candidate.voteCount is kept in sync
            if (candidate.voteCount > maxVotes) {
                maxVotes = candidate.voteCount;
                winner = candidate;
            }
        }

        election.status = 'published';
        election.winner = winner ? winner._id : null;
        await election.save();

        res.status(200).json(election);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createElection, getElections, getElection, openElection, closeElection, publishResults };
