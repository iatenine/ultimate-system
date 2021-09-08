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
          user.password = hashPassword(user.password);
        }
      },
      beforeBulkCreate: (users) => {
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
