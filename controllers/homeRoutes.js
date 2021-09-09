const routerBase = require("express").Router();

routerBase.get("/", (req, res) => {
  if (req.session.loggedIn) {
    console.log("logged in");
    res.render("../views/layouts/main.handlebars", {});
  } else {
    console.log("Nope");
  }
  res.status(200).end();
});

module.exports = routerBase;
