const User = require("./User");
const Games = require("./Games");

User.hasOne(Games, {
  foreignKey: "User.id",
});

Games.belongsTo(User, {
  foreignKey: "Games.userid",
});

module.exports = { User, Games };
