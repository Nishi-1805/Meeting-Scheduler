const express = require('express');
const sequelize = require('./util/database');
const path = require('path');
const TimeSlot = require('./models/Timeslot');
const Booking = require('./models/booking')
const TimeRouter = require('./routes/timeslot');
const bookingRouter = require('./routes/bookingslot');
const app = express();
const seedTimeSlots = require('./timeslots');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'availableslots.html'));
});

app.use('/', TimeRouter);
app.use('/api', bookingRouter);


// Sync the models with the database
sequelize.sync()
  .then(() => {
    console.log('Database schema synchronized');
    //seedTimeSlots();
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error synchronizing database schema:', error);
  });

  
