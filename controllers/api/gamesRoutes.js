const router = require("express").Router();
const games = require("../../models/User");
const { getGameLibrary, getPlayersWithGame } = require("../../utils/helpers");
var axios = require("axios");

const mockSteamId = "76561197960434622";

router.get("/", async (req, res) => {
  console.log("Got it!");
  const gamer = await getGameLibrary(mockSteamId);
  res.status(200).json(gamer);
});

router.get("/players/:id", async (req, res) => {
  try {
    const users = await getPlayersWithGame(req.params.id);
    // console.log("hello", users[0].dataValues);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;
