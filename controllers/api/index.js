const router = require("express").Router();

const userRoutes = require("./userRoutes");

router.use("/users", userRoutes);

router.get("/", (req, res) => {
  console.log("from the other side");
  res.sendStatus(201);
});

module.exports = router;
