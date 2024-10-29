'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    //create 50 tables
    const tables = Array.from({ length: 50 }).map((_, index) => ({
      id: (index + 1).toString(),
      capacity: Math.floor(Math.random() * 5) + 2,
      combinable: Math.random() > 0.5,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('tables', tables, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tables', null, {});
  }
};
