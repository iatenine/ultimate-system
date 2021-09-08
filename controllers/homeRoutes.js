const routerBase = require("express").Router();

routerBase.get("/", (req, res) => {
  console.log("I must have called a thousand times");
  res.render("index");
});

module.exports = routerBase;
