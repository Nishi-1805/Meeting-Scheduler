const Booking = require('../models/booking');
const TimeSlot = require('../models/Timeslot'); 
const moment = require('moment');
const sequelize = require('../util/database');

exports.bookTimeSlot = async (req, res) => {
  try {
    const { name, email, time, meetLink } = req.body;
    console.log('Received selectedTimeSlot:', req.body.time);
    const timeOnly = moment(time, 'HH:mm');
    if (!timeOnly.isValid()) {
      throw new Error('Invalid time format. Please use HH:MM format.');
    }
    const formattedTime = timeOnly.format('HH:mm:ss'); // Format the time as a string
    const booking = await Booking.create({ name, email, time: formattedTime, googleMeetLink: meetLink });
    const timeSlot = await TimeSlot.findOne({
      where: {
        time: formattedTime // Use the formatted time string
      }
    });
    if (!timeSlot) {
      throw new Error('Time slot not found');
    }
    
    if (timeSlot.availableSlots <= 0 || timeSlot.availableSlots > 4) {
      throw new Error('Time slot is fully booked');
    }
    try {
      //timeSlot.availableSlots -= 1;
      await timeSlot.save();
    } catch (error) {
      console.error('Error updating time slot:', error);
      throw new Error('Error updating time slot');
    }
    res.json({ message: 'Time slot booked successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the booking to delete
    const booking = await Booking.findByPk(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
   
    // Find the time slot associated with the booking
    const timeSlot = await TimeSlot.findOne({
      where: {
        time: booking.time
      }
    });
    if (!timeSlot) {
      throw new Error('Time slot not found');
    }
    // Increment the available slots count
    timeSlot.availableSlots += 1;
    if (timeSlot.availableSlots > 4) {
      timeSlot.availableSlots = 4; // Limit the available slots count to 4
    }
    await timeSlot.save();

    // Delete the booking
    await booking.destroy();
  
    res.json({ message: 'Booking deleted successfully',timeSlot});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
exports.getBookedTimeSlots = async (req, res) => {
  try {
    const bookedTimeSlots = await Booking.findAll({
      attributes: ['id', 'name', 'email', 'time', 'googleMeetLink'],
    });
    res.json(bookedTimeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
