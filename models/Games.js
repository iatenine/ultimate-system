const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Games extends Model {}

Games.init(
  {
    appId: {
      type: DataTypes.INTEGER,
      unique: false,
    },
    gameTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    totalPlayTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "games",
  }
);

module.exports = Games;
