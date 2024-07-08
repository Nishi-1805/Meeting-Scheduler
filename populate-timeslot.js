const fs = require('fs');
const path = require('path');
const TimeSlot = require('./models/Timeslot');
const htmlFilePath = path.resolve(__dirname, 'views', 'availableslots.html');

console.log(`File path: ${htmlFilePath}`);

const html = fs.readFileSync(htmlFilePath, 'utf8');

const timeslotsData = [];

const timeSlotsHtml = html.split('<div class="time-slot">');
for (let i = 1; i < timeSlotsHtml.length; i++) {
  const timeSlotHtml = timeSlotsHtml[i];
  const time = timeSlotHtml.split('<h2>')[1].split('</h2>')[0];
  const availableSlots = timeSlotHtml.split('Available Slots: ')[1].split('<')[0];
  timeslotsData.push({ time, availableSlots: parseInt(availableSlots) });
}

TimeSlot.bulkCreate(timeslotsData)
  .then(() => {
    console.log('Time slots data inserted successfully!');
  })
  .catch((error) => {
    console.error('Error inserting time slots data:', error);
  });
