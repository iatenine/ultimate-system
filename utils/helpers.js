const axios = require("axios");
const User = require("../models/User");
const Games = require("../models/Games");
const bcrypt = require("bcrypt");

async function getGameLibrary(steamId, limit) {
  try {
    if (!steamId) {
      console.error("No steam Id provided");
      return [];
    }
    const apiKey = "932AC27CD2D71E6D00C5868C5DC322F6";
    const apiUrl = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&include_appinfo=true&steamid=${steamId}`;
    const res = await axios({
      method: "get",
      url: apiUrl,
    });

    const gameLibrary = res.data.response.games;
    const sortedGames = gameLibrary.sort(
      (a, b) => b.playtime_forever - a.playtime_forever
    );

    if (limit) return sortedGames.slice(0, limit);
    return sortedGames;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getPlayersWithGame(appId) {
  const users = await User.findAll({
    include: {
      model: Games,
      where: {
        app_id: appId,
      },
      attributes: ["gameTitle", "totalPlayTime"],
    },
    attributes: ["username", "steamId", "zipcode"],
  });
  return users;
}

async function getGamesFromDb(userId) {
  const result = await User.findByPk(userId, {
    include: {
      model: Games,
    },
    limit: 120,
  });
  return result.dataValues.games;
}

async function getUserbyUsername(query) {
  try {
    const result = await User.findOne({
      where: { username: query },
    });
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateGameDatabase(user) {
  const steamId = user.dataValues.steamId;
  const rawLib = await getGameLibrary(steamId);
  const library = rawLib.slice(0, 120);
  if (library.length > 0)
    library.forEach(async (elem) => {
      try {
        const findGame = await Games.findOne({
          where: {
            appId: elem.appid,
            userId: user.dataValues.id,
          },
        });
        if (!findGame)
          try {
            Games.create({
              userId: user.dataValues.id,
              steamId: elem.steamId,
              appId: elem.appid,
              gameTitle: elem.name,
              totalPlayTime: elem.playtime_forever,
            });
          } catch (err) {
            console.error(err);
          }
        else
          try {
            Games.update({
              totalPlayTime: elem.playtime_forever,
            });
          } catch (err) {
            console.error(err);
          }
      } catch (err) {
        console.error(err);
      }
    });
}

async function getUserById(id) {
  try {
    const result = await User.findByPk(id);
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

const getSessionUser = async (req) => {
  if (!isSessionActive(req)) return null;
  return await User.findByPk(req.session.userId);
};

function isSessionActive(req) {
  return req.session.loggedIn && req.session.userId;
}

function checkPassword(password, hashedPassword) {
  return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {
  getUserById,
  getPlayersWithGame,
  getGameLibrary,
  getUserbyUsername,
  getSessionUser,
  checkPassword,
  updateGameDatabase,
  getGamesFromDb,
};
