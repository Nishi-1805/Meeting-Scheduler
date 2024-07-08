const express = require('express');
const router = express.Router();
const path = require('path');
const timeSlotController = require('../controllers/timeSlotController');

router.get('/time-slots', timeSlotController.getTimeSlots);
router.post('/time-slots', timeSlotController.createTimeSlot);
router.put('/time-slots/:time', timeSlotController.updateAvailableSlots);
router.get('/get-available-slots/:time', timeSlotController.getAvailableSlots);
module.exports = router;
