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
        len: [4, 15],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steamId: {
      // Need to support very large numbers
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5, 6],
      },
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
          user.password = hashPassword(user.password);
        }
      },
      beforeBulkCreate: (users) => {
        for (const user of users) {
          user.password = hashPassword(user.password);
        }
      },
      beforeBulkUpdate: (users) => {
        for (const user of users) {
          user.password = hashPassword(user.password);
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

function hashPassword(password) {
  return password && password != "" ? bcrypt.hashSync(password, 10) : "";
}
module.exports = User;
