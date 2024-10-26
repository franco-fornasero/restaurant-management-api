'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      
      await queryInterface.createTable('days', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false,
          unique: true
        },
        isOpen: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        openingTime: {
          type: Sequelize.TIME,
          allowNull: true
        },
        closingTime: {
          type: Sequelize.TIME,
          allowNull: true
        },
        description: {
          type: Sequelize.STRING,
          allowNull: true
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

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('days');
  }
};
