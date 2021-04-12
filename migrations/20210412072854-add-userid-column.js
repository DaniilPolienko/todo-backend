"use strict";

//const { DataTypes } = require("sequelize/types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "uuid", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "uuid");
  },
};
