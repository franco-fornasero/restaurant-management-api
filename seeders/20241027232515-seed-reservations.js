'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Get 25 users
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM users LIMIT 25',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Make 25 reservations
    const reservations = users.map(user => ({
      userId: user.id,
      dayId: 1, // First day on the database
      reservationTime: '20:00:00',
      numberOfPeople: Math.floor(Math.random() * 7) + 1,// 
      status: 'confirmed',
      createdAt: new Date(),
      updatedAt: new Date()
    }));
        
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
