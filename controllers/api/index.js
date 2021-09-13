const router = require("express").Router();

const gamerRoutes = require("./gamesRoutes");
const userRoutes = require("./userRoutes");

router.use("/games", gamerRoutes);
router.use("/users", userRoutes);

module.exports = router;
