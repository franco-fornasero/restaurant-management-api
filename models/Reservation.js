const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');
import User from './User';
import Day from './Day';


const Reservation = sequelize.define('reservation', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    dayId: {
        type: DataTypes.INTEGER,
        references: {
            model: Day,
            key: 'id'
        },
        allowNull: false
    },
    reservationTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    numberOfPeople: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
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
    tableName: 'reservations'
});


Reservation.belongsTo(User, { foreignKey: 'userId' });
Reservation.belongsTo(Day, { foreignKey: 'dayId' });

// Relation with reservation_table 
Reservation.belongsToMany(Table, { 
    through: 'reservation_table', 
    foreignKey: 'reservationId',
    otherKey: 'tableId'
});

module.exports = Reservation;
