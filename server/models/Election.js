const mongoose = require('mongoose');

const ElectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['created', 'open', 'closed', 'published'],
        default: 'created',
    },
    candidates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    winner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        default: null,
    }
}, { timestamps: true });

module.exports = mongoose.model('Election', ElectionSchema);
