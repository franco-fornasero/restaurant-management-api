// Modelo Table
const { DataTypes } = require('sequelize');
const sequelize = require('../src/config/database');

const Table = sequelize.define('Table', {
    number: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    combinable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    status: {
        type: DataTypes.ENUM('available', 'reserved', 'out_of_service'),
        allowNull: false,
        defaultValue: 'available'
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
    tableName: 'tables'
});

Table.belongsToMany(Reservation, {
    through: 'reservation_table',
    foreignKey: 'tableId',
    otherKey: 'reservationId'
});


module.exports = Table;
