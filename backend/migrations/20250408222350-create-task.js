'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, 
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true, 
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false, 
        defaultValue: 'pending', 
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true, 
        defaultValue: 'default', 
      },
      dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true, 
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE', 
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
    await queryInterface.dropTable('Tasks');
  }
};
