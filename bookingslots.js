const {DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../util/database');
const TimeSlot = require('./timeslots'); 

const BookingSlot = sequelize.define('BookingSlot', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    googleMeetId: {
        type: DataTypes.STRING,
        allowNull: false, // Ensure it's not nullable if it should always have a value
        unique: true // Ensure it's unique if that's a requirement
    },
    timeSlotId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: TimeSlot,
            key: 'id'
        }
    }
});
BookingSlot.belongsTo(TimeSlot, { foreignKey: 'timeSlotId' });

module.exports = BookingSlot;
