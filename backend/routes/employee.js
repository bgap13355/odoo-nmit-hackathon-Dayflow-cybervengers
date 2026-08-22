const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const auth = require('../middleware/auth');

router.get('/me', auth, async (req, res) => {
    try {
        const employee = await Employee.findOne({ userId: req.user.id }).populate('userId', 'name email');
        if (!employee) return res.status(404).json({ error: 'Employee record not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/me', auth, async (req, res) => {
    try {
        const { department, designation, phone, address } = req.body;
        const employee = await Employee.findOneAndUpdate(
            { userId: req.user.id },
            { department, designation, phone, address },
            { new: true, upsert: true }
        );
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find().populate('userId', 'name email');
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;