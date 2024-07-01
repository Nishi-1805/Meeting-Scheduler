const express = require('express');
const router = express.Router();
const path = require('path');
const BookingSlot = require('../models/bookingslots'); // Adjust the path to your BookingSlot model
const TimeSlot = require('../models/timeslots'); // Adjust the path to your TimeSlot model

router.get('/bookingslots', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/bookingslots.html'));
});

// POST route to book a time slot
router.post('/bookSlot', async (req, res) => {  // Ensure the path is '/api/bookSlot'
    const { name, email, timeSlotId, googleMeetId } = req.body;
    console.log('Received booking request:', { name, email, timeSlotId, googleMeetId });
    try {
        console.log('Received booking request:', { timeSlotId, name, email, googleMeetId });

        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        if (!timeSlot) {
            console.error('Time slot not found for ID:', timeSlotId);
            return res.status(404).json({ message: 'Time slot not found' });
        }

        if (timeSlot.availableSlots <= 0) {
            console.error('No available slots for time slot:', timeSlotId);
            return res.status(400).json({ message: 'No available slots' });
        }

        // Decrement the available slots
        timeSlot.availableSlots -= 1;
        await timeSlot.save();

        // Save the booking details
        const newBooking = await BookingSlot.create({ 
            timeSlotId, 
            name, 
            email, 
            googleMeetId 
        });

        console.log('Booking successful:', { newBooking, updatedTimeSlot: timeSlot });
        res.status(201).json({ 
            message: 'Booking successful', 
            booking: newBooking, 
            updatedTimeSlot: timeSlot 
        });
    } catch (err) {
        console.error('Error booking slot:', err.message);
        res.status(500).json({ message: 'Failed to book slot' });
    }
});
// GET route to fetch all booking slots
router.get('/bookings', async (req, res) => {
    try {
        const bookingSlots = await BookingSlot.findAll();
        res.status(200).json(bookingSlots);
    } catch (error) {
        console.error('Error fetching booking slots:', error.message);
        res.status(500).json({ message: 'Failed to fetch booking slots' });
    }
});

// DELETE route to cancel a booking by ID
router.delete('/bookings/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCount = await BookingSlot.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Booking slot not found' });
        }
        res.status(200).json({ message: 'Booking slot cancelled successfully' });
    } catch (error) {
        console.error('Error deleting booking slot:', error.message);
        res.status(500).json({ message: 'Failed to cancel booking slot' });
    }
});

module.exports = router;
