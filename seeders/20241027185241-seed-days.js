'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    //add 365 days to the database from today
    const days = Array.from({ length: 365 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      dayOfWeek = date.getDay();
      return {
        date: date.toISOString().split('T')[0],
        isOpen: dayOfWeek !== 1 || dayOfWeek !== 2, //monday and tuesday closed 
        openingTime: '18:30:00',
        closingTime: '01:00:00',
        description: 'Normal day',
        createdAt: new Date(),
        updatedAt: new Date()
      };
    });

    await queryInterface.bulkInsert('days', days, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('days', null, {});
  }
};
