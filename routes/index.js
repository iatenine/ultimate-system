const router = require("express").Router();

const apiRoutes = require("./api");

router.use("/api", apiRoutes);

router.get("/", (req, res) => {
  console.log("I must have called a thousand times");
  res.sendStatus(201);
});

module.exports = router;
