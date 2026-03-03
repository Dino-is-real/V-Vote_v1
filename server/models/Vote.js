const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
    voter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true,
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true,
    },
    transactionHash: {
        type: String, // Placeholder for blockchain/audit hash
    }
}, { timestamps: true });

// Prevent multiple votes per user per election
VoteSchema.index({ voter: 1, election: 1 }, { unique: true });

module.exports = mongoose.model('Vote', VoteSchema);
