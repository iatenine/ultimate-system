const User = require("./User");
const Games = require("./Games");

User.hasMany(Games, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
  hooks: true,
});

Games.belongsTo(User, {
  foreignKey: "id",
});

module.exports = { User, Games };
