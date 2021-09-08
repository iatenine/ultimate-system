const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Games extends Model {}

Games.init(
  {
    gametitle: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    totalplaytime: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = Games;
