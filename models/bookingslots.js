const {DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');
const TimeSlot = require('./Timeslot');

const Booking = sequelize.define('Booking', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.TIME
  },
  googleMeetLink: {
    type: Sequelize.STRING
  }
});
module.exports = Booking;
