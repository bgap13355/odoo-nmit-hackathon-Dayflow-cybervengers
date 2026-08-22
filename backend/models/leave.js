const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    leaveType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String },
    status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Leave', leaveSchema);