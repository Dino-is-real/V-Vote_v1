const mongoose = require('mongoose');

const CandidateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election',
        required: true,
    },
    party: {
        type: String,
        required: true,
    },
    manifesto: {
        type: String,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    voteCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

module.exports = mongoose.model('Candidate', CandidateSchema);
