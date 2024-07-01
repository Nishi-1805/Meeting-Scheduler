// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const timeSlotRoutes = require('./routes/timeslot');
const bookingRoutes = require('./routes/bookingslot');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'availableslots.html'));
});

// Routes
app.use('/', timeSlotRoutes);
app.use('/api', bookingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server and database connection
sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(3000, () => {
            console.log(`Server running on port 3000`);
        });
    })
    .catch(err => console.error('Error syncing database:', err));
