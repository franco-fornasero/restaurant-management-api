'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [...Array(10)].map(() => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: 'international' }),
      role: 'client',
      password: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }));

    // add admin user

    users.push({
      name: 'Admin',
      email: 'admin@admin.com',
      phone: faker.phone.number({ style: 'international' }),
      role: 'admin',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    
    await queryInterface.bulkInsert('users', users, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
