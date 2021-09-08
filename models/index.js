const User = require("./User");
const Games = require("./Games");

User.hasone(Games, {
  foreignKey: "User.id",
  onDelete: "MIT",
});

Games.belongsTo(User, {
  foreignKey: "Games.userid",
});

module.exports = { User, Games };