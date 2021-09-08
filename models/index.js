const User = require("./User");
const Games = require("./Games");

Games.hsaone(User, {
  foreignKey: "user.id",
  onDelete: "MIT",
});

module.exports = { User, Games };
