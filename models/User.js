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
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steamId: {
      type: DataTypes.BIGINT,
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
              ? bcrypt.hashSync(user.password, 10)
              : "";
        }
      },
      beforeUpdate: (user) => {
        user.password =
          user.password && user.password != ""
            ? bcrypt.hashSync(user.password, 10)
            : "";
      },
    },
  }
);

module.exports = User;
