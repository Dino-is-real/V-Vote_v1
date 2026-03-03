const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Election = require('./models/Election');
const Candidate = require('./models/Candidate');
const Vote = require('./models/Vote');
const AuditLog = require('./models/AuditLog');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch((err) => console.log(err));

const seedDB = async () => {
    try {
        // Clear DB
        await User.deleteMany({});
        await Election.deleteMany({});
        await Candidate.deleteMany({});
        await Vote.deleteMany({});
        await AuditLog.deleteMany({});

        console.log("DB Cleared");

        // Create Users
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash("password123", salt);

        const admin = new User({
            name: "Admin User",
            email: "admin@vvote.com",
            password: passwordHash,
            role: "admin",
            isVerified: true
        });

        const auditor = new User({
            name: "Auditor User",
            email: "auditor@vvote.com",
            password: passwordHash,
            role: "auditor",
            isVerified: true
        });

        const voter1 = new User({
            name: "Voter One",
            email: "voter1@vvote.com",
            password: passwordHash,
            role: "voter",
            isVerified: true
        });

        const candidateUser1 = new User({
            name: "Alice Candidate",
            email: "alice@vvote.com",
            password: passwordHash,
            role: "candidate",
            isVerified: true
        });

        const candidateUser2 = new User({
            name: "Bob Candidate",
            email: "bob@vvote.com",
            password: passwordHash,
            role: "candidate",
            isVerified: true
        });

        await User.insertMany([admin, auditor, voter1, candidateUser1, candidateUser2]);
        console.log("Users Created");

        // Create Election
        const election = new Election({
            title: "Student Council Election 2026",
            description: "Election for the student council president.",
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 7)), // 7 days from now
            status: 'open',
            createdBy: admin._id
        });

        await election.save();
        console.log("Election Created");

        // Create Candidates
        const cand1 = new Candidate({
            user: candidateUser1._id,
            election: election._id,
            party: "Tech Innovators",
            manifesto: "Innovation for everyone.",
            isApproved: true
        });

        const cand2 = new Candidate({
            user: candidateUser2._id,
            election: election._id,
            party: "Green Campus",
            manifesto: "Sustainability first.",
            isApproved: true
        });

        await Candidate.insertMany([cand1, cand2]);

        election.candidates.push(cand1._id, cand2._id);
        await election.save();

        console.log("Candidates Created & Linked");

        console.log("Seeding Complete. Press Ctrl+C to exit.");
        process.exit();

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDB();
