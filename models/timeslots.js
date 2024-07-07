const {DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const TimeSlot = sequelize.define('TimeSlot', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
    dateFormat: 'HH:mm'
  },
  availableSlots: {
    type: Sequelize.INTEGER,
    defaultValue: 4
  }
});

module.exports = TimeSlot;

