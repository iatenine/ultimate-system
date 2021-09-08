const sequelize = require("../config/connection");
const { Games, User } = require("../models");

const userSeedData = require("./userSeedData.json");
const gameSeedData = require("./gameSeedData.json");

gameSeedData.forEach((elem) => {
  elem["userId"] = 1;
});

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  const users = await User.bulkCreate(userSeedData);
  const games = await Games.bulkCreate(gameSeedData);

  process.exit(0);
};

seedDatabase();
