'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      txType: {
        type: Sequelize.ENUM(
          'income',
          'outcome',
          'transfer'
        ),
        allowNull: false
      },
      details: {
        type: Sequelize.JSONB
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      indexes: [
        {
          name: 'userId_idx',
          fields: ['userId']
        },
        {
          name: 'txType_idx',
          fields: ['txType']
        }
      ]
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Transactions');
  }
};
