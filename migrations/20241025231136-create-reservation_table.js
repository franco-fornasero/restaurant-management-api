'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reservation_table', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      reservationId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'reservations',
          key: 'id'
        },
        allowNull: false
      },
      tableId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tables',
          key: 'id'
        },
        allowNull: true
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reservation_table');
  }
};
