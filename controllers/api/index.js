const router = require("express").Router();

const gamerRoutes = require("./gamesRoutes");
const userRoutes = require("./userRoutes");

router.use("/games", gamerRoutes);
router.use("/users", userRoutes);

router.get("/", (req, res) => {
  console.log("from the other side");
  res.sendStatus(201);
});

module.exports = router;
