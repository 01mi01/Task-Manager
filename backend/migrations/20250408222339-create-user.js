'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true, 
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      theme: {
        type: Sequelize.STRING,
        allowNull: true, 
        defaultValue: 'light', 
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
