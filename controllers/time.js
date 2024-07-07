const TimeSlot = require('../models/Timeslot');
const Booking = require('../models/booking');

exports.getTimeSlots = async (req, res) => {
  console.log('getTimeSlots function called');
  try {
    const timeSlots = await TimeSlot.findAll();
    console.log('Time slots:', timeSlots); 
    res.json(timeSlots);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching time slots' });
  }
};

exports.createTimeSlot = async (req, res) => {
  try {
    const { time, availableSlots } = req.body;
    const timeSlot = await TimeSlot.create({ time, availableSlots });
    res.status(201).json({ message: 'Time slot created successfully', timeSlot });
  } catch (error) {
    console.error('Function not being called',error);
    res.status(500).json({ message: 'Error creating time slot' });
  }
};

exports.updateAvailableSlots = async (req, res) => {
  try {
    const time = req.params.time;
    const increment = req.body.increment;
    const timeSlot = await TimeSlot.findOne({ where: { time } });
    if (!timeSlot) {
      return res.status(404).json({ message: `Time slot not found for time ${time}` });
    }
    const newAvailableSlots = timeSlot.availableSlots + increment;
    if (newAvailableSlots <= 0) {
      await timeSlot.destroy();
    } else if (newAvailableSlots > 4) {
      timeSlot.availableSlots = 4;
      await timeSlot.save();
    } else {
      timeSlot.availableSlots = newAvailableSlots;
      await timeSlot.save();
    }
    res.json({ message: 'Time slot updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating time slot' });
  }
};
