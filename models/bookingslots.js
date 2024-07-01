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
        allowNull: false, 
        unique: true 
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
