const TimeSlot = require('./models/Timeslot');
const moment = require('moment');

const timeSlots = [
  { time: moment('09:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
  { time: moment('10:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
  { time: moment('12:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
  { time: moment('14:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
  { time: moment('16:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
  { time: moment('17:00:00', 'HH:mm:ss').format('HH:mm:ss'), availableSlots: 4 },
];
module.exports = async () => {
  try {
    await TimeSlot.bulkCreate(timeSlots);
    console.log('Time slots seeded successfully');
  } catch (error) {
    console.error('Error seeding time slots:', error);
  }
};
