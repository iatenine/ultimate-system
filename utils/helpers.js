const axios = require("axios");

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

module.exports = { getGameLibrary };
