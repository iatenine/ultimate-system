const axios = require("axios");
const User = require("../models/User");
const bcrypt = require("bcrypt");

async function getGameLibrary(steamId, limit) {
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
  getGameLibrary,
  getUserbyUsername,
  getSessionUser,
  checkPassword,
};
