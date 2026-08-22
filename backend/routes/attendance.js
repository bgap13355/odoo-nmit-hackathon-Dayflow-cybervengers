const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance');

// Mark check-in
router.post('/checkin', async (req, res) => {
  try {
    const { userId, date } = req.body;
    const record = new Attendance({ userId, date, checkIn: Date.now() });
    await record.save();
    res.status(201).json({ message: "Checked in successfully", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark check-out
router.put('/checkout/:id', async (req, res) => {
  try {
    const record = await Attendance.findByIdAndUpdate(
      req.params.id,
      { checkOut: Date.now() },
      { new: true }
    );
    res.status(200).json({ message: "Checked out successfully", record });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all attendance for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const records = await Attendance.find({ userId: req.params.userId });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;