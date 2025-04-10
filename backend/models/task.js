"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {}
  }

  Task.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
        validate: {
          isIn: ["pending", "in progress", "completed"],
        },
      },
      color: {
        type: DataTypes.STRING,
        defaultValue: "default",
        validate: {
          isIn: [[
            "default",
            "red",
            "orange",
            "yellow",
            "green",
            "mint",
            "teal",
            "cyan",
            "blue",
            "indigo",
            "purple",
            "pink",
            "brown"
          ]],
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );

  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Task;
};
