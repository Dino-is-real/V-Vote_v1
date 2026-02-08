const Candidate = require('../models/Candidate');
const Election = require('../models/Election');

/* REGISTER AS CANDIDATE */
const registerCandidate = async (req, res) => {
    try {
        const { electionId, party, manifesto } = req.body;
        const userId = req.user.id;

        const election = await Election.findById(electionId);
        if (!election) return res.status(404).json({ msg: "Election not found" });

        // Check if already registered
        const existingCandidate = await Candidate.findOne({ user: userId, election: electionId });
        if (existingCandidate) return res.status(400).json({ msg: "You are already a candidate for this election" });

        const newCandidate = new Candidate({
            user: userId,
            election: electionId,
            party,
            manifesto,
        });

        const savedCandidate = await newCandidate.save();

        // Add candidate to election
        election.candidates.push(savedCandidate._id);
        await election.save();

        res.status(201).json(savedCandidate);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { registerCandidate };
