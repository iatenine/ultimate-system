const { response } = require("express");
const { getGameLibrary } = require("../utils/helpers");
const routerBase = require("express").Router();
const mockSteamId = "76561197960434622";

routerBase.get("/", (req, res) => {
  if (req.session.loggedIn) {
    console.log("logged in");
    res.render("../views/home.hbs", {});
  } else {
    res.render("../views/welcome.hbs", {});
    console.log("Nope");
  }
});

routerBase.get("/gamelibrary", async function (req, res) {
  // res.status(200).send("ok confirmed")
  const library = await getGameLibrary(mockSteamId, 60);
  const viewLibrary = [];
  library.forEach((elem) => {
    viewLibrary.push({
      gametitle: elem.name,
      appID: elem.appid,
    });
  });

  res.render("gamelibrary", {
    games: viewLibrary,
  });
});

module.exports = routerBase;
