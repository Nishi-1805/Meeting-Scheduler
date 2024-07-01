// models/timeslot.js
const {DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');
//const BookingSlot = require('./models/bookingslot');

const TimeSlot = sequelize.define('TimeSlot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availableSlots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0 
    }
});

module.exports = TimeSlot;
