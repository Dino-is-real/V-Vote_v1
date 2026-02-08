const Vote = require('../models/Vote');
const Election = require('../models/Election');
const Candidate = require('../models/Candidate');
const User = require('../models/User');

/* CAST VOTE */
const castVote = async (req, res) => {
    try {
        const { electionId, candidateId } = req.body;
        const userId = req.user.id; // From middleware

        // 1. Check if election exists and is open
        const election = await Election.findById(electionId);
        if (!election) return res.status(404).json({ msg: "Election not found" });
        if (election.status !== 'open') return res.status(400).json({ msg: "Election is not open for voting" });

        // 2. Check if user has already voted
        const existingVote = await Vote.findOne({ voter: userId, election: electionId });
        if (existingVote) return res.status(400).json({ msg: "You have already voted in this election" });

        // 3. Verify candidate belongs to election
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) return res.status(404).json({ msg: "Candidate not found" });
        if (candidate.election.toString() !== electionId) return res.status(400).json({ msg: "Candidate does not belong to this election" });

        // 4. Create Vote and Update Candidate Count
        const newVote = new Vote({
            voter: userId,
            election: electionId,
            candidate: candidateId,
            transactionHash: "SIMULATED_HASH_" + Date.now() // Placeholder
        });

        await newVote.save();

        // Increment candidate vote count (Atomic update)
        candidate.voteCount += 1;
        await candidate.save();

        res.status(201).json({ msg: "Vote cast successfully", vote: newVote });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { castVote };
