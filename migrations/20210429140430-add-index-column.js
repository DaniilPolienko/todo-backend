"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Tasks", "index", {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      validate: {
        notEmpty: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Tasks", "index");
  },
};
