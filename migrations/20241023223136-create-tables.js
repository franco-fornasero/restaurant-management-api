'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('tables', {
      number: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
      },
      capacity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      combinable: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      status: {
        type: Sequelize.ENUM('available', 'reserved', 'out_of_service'),
        allowNull: false,
        defaultValue: 'available'
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tables');
  }
};
