const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  console.log("hello");
  res.sendStatus(200);
});

module.exports = router;
