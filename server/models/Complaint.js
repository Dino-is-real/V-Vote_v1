const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    filedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'resolved', 'dismissed'],
        default: 'pending',
    },
    resolution: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', ComplaintSchema);
