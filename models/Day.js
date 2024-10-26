// Modelo Day
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

const Day = sequelize.define('Day', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true
    },
    isOpen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    openingTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    closingTime: {
        type: DataTypes.TIME,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'days'
});

module.exports = Day;


Day.hasMany(Reservation, { foreignKey: 'dayId' });
