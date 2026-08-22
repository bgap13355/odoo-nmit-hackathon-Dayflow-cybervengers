const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    department: { type: String, default: 'Engineering' },
    designation: { type: String, default: 'Employee' },
    phone: String,
    address: String
});

module.exports = mongoose.model('Employee', employeeSchema);