const BookingSlot = require('../models/bookingslots');
const TimeSlot = require('../models/timeslots');

exports.bookSlot = async (req, res, next) => {
   const { timeSlotId, name, email, googleMeetId } = req.body;
    try {
        const timeSlot = await TimeSlot.findByPk(timeSlotId);
        if (!timeSlot) {
            return res.status(404).json({ message: 'Time slot not found' });
        }

        if (timeSlot.availableSlots <= 0) {
            return res.status(400).json({ message: 'No available slots' });
        }

        // Decrement the available slots
        timeSlot.availableSlots -= 1;
        await timeSlot.save();

        const newBooking = await Booking.create({ 
            timeSlotId, 
            name, 
            email, 
            googleMeetId 
        });

        res.status(201).json({ 
            message: 'Booking successful', 
            booking: newBooking, 
            updatedTimeSlot: timeSlot 
        });
    } catch (err) {
        next(err);
    }
};
exports.getAllBookings = async (req, res, next) => {
    try {
        const bookings = await BookingSlot.findAll({
            include: [{ model: TimeSlot }] // Include TimeSlot details in the query
        });
        res.json(bookings);
    } catch (err) {
        next(err);
    }
};

exports.cancelBooking = async (req, res, next) => {
    const bookingId = req.params.id;
    try {
        const booking = await BookingSlot.findByPk(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const timeSlot = await TimeSlot.findByPk(booking.timeSlotId);

        // Increase availableSlots for the canceled time slot
        timeSlot.availableSlots += 1;
        await timeSlot.save();

        // Delete the booking
        await booking.destroy();

        res.json({ message: 'Booking canceled successfully' });
    } catch (err) {
        next(err);
    }
};
function generateRandomMeetId() {
    let randomId = Math.floor(Math.random() * 1000000);
    return `https://meet.google.com/${randomId}`;
}
