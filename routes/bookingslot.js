const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookings');

router.post('/book-time-slot', bookingController.bookTimeSlot);
router.delete('/cancel-booking/:id', bookingController.deleteBooking);
router.get('/get-booked-time-slots', bookingController.getBookedTimeSlots); 

module.exports = router;
