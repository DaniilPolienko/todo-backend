const { Task } = require("../models");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Tasks", "message", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      unique: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Tasks", "message", {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    });
  },
};
