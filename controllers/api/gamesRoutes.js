const router = require("express").Router();
const games = require("../../models/User");
const { getGameLibrary } = require("../../utils/helpers");
var axios = require("axios");

const mockSteamId = "76561197960434622";

router.get("/", async (req, res) => {
  console.log("Got it!");
  const gamer = await getGameLibrary(mockSteamId);
  res.status(200).json(gamer);
});

module.exports = router;
