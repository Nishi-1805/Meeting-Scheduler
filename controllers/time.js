const BookingSlot = require('../models/bookingslots');
const TimeSlot = require('../models/timeslots');

// Controller method to book a slot
exports.bookSlot = async (req, res, next) => {
    const { timeSlotId, name, email, googleMeetId } = req.body;
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
};

// Example controller methods
exports.getAvailableTimeSlots = async (req, res, next) => {
    try {
        const timeSlots = await TimeSlot.findAll();
        res.status(200).json(timeSlots);
    } catch (err) {
        next(err);
    }
};

// Controller method to create a new time slot
exports.createTimeSlot = async (req, res, next) => {
    const { time, availableSlots } = req.body;
    try {
        const newTimeSlot = await TimeSlot.create({ time, availableSlots });
        res.status(201).json(newTimeSlot);
    } catch (err) {
        next(err);
    }
};

// Controller method to update a time slot by ID
exports.updateTimeSlot = async (req, res, next) => {
    const id = req.params.id;
    const { time, availableSlots } = req.body;
    try {
        const timeSlot = await TimeSlot.findByPk(id);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Time slot not found' });
        }

        // Update the time slot
        timeSlot.time = time;
        timeSlot.availableSlots = availableSlots;
        await timeSlot.save();

        res.json(timeSlot);
    } catch (err) {
        next(err);
    }
};

// Controller method to delete a time slot by ID
exports.deleteTimeSlot = async (req, res, next) => {
    const id = req.params.id;
    try {
        const deletedTimeSlot = await TimeSlot.destroy({ where: { id } });
        if (!deletedTimeSlot) {
            return res.status(404).json({ message: 'Time slot not found' });
        }
        res.json({ message: 'Time slot deleted successfully' });
    } catch (err) {
        next(err);
    }
};
