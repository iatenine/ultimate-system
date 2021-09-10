const router = require("express").Router();
const games = require("../../models/User");
var axios = require("axios");

router.get("/", async (req, res) => {
  console.log("Got it!");
  const gamer = await getGamer();
  res.status(200).json(gamer);
});

// SLICE FUNCTION

const apiUrl =
  "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=932AC27CD2D71E6D00C5868C5DC322F6&include_appinfo=true&steamid=76561197960434622";

async function getGamer() {
  const res = await axios({
    method: "get",
    url: apiUrl,
  });

  // console.log(res.data.response.games);

  const gameLibrary = res.data.response.games;
  const sortedGames = gameLibrary.sort(
    (a, b) => b.playtime_forever - a.playtime_forever
  );

  console.log(sortedGames.slice(0, 4));

  return sortedGames.slice(0, 4);
}

module.exports = router;
