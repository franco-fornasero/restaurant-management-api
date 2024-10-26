'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    //create 50 tables

    const tables = Array.from({ length: 50 }).map((_, index) => ({
      number: (index + 1).toString(),
      //random number between 2 and 6
      capacity: Math.floor(Math.random() * 5) + 2,
      combinable: Math.random() > 0.5,
      status: 'available',
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    await queryInterface.bulkInsert('tables', tables, {});


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('tables', null, {});
  }
};
