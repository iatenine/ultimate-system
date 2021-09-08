const router = require("express").Router();
const User = require("../../models/User");

// Steam API key
const key = "932AC27CD2D71E6D00C5868C5DC322F6";

// CREATE a new user
router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    console.log("helo", req.body);
    const userData = await User.create(newUser);
    res.status(200).json({});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", (req, res) => {
  console.log("hello");
  res.sendStatus(200);
});

module.exports = router;
