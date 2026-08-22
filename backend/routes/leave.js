const express = require('express');
const router = express.Router();
const Leave = require('../models/leave');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    try {
        const { leaveType, startDate, endDate, reason } = req.body;
        const leave = new Leave({
            userId: req.user.id,
            leaveType, startDate, endDate, reason
        });
        await leave.save();
        res.status(201).json(leave);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/my', auth, async (req, res) => {
    try {
        const leaves = await Leave.find({ userId: req.user.id }).sort({ startDate: -1 });
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const leaves = await Leave.find().populate('userId', 'name email');
        res.json(leaves);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch('/:id/status', auth, async (req, res) => {
    try {
        const { status } = req.body;
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!leave) return res.status(404).json({ error: 'Leave request not found' });
        res.json(leave);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;