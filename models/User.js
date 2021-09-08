const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class User extends Model {}

User.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steamId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
    hooks: {
      beforeCreate: (user) => {
        {
          user.password =
            user.password && user.password != ""
              ? bcrypt.hashSync(user.password, 32)
              : "";
        }
      },
      beforeUpdate: (user) => {
        user.password =
          user.password && user.password != ""
            ? bcrypt.hashSync(user.password, 32)
            : "";
      },
    },
  }
);

module.exports = User;
