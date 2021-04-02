"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Tasks", {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV1,
      },
      message: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      done: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Tasks");
  },
};
