const User = require("./User");
const Games = require("./Games");

User.hasMany(Games, {
  foreignKey: "user_id",
  name: "",
  onDelete: "CASCADE",
  hooks: true,
});

Games.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Games };
