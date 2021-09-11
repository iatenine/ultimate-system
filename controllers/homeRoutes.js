const { response } = require("express");
const { getGameLibrary } = require("../utils/helpers");
const routerBase = require("express").Router();
const mockSteamId = "76561197960434622";

routerBase.get("/", (req, res) => {
  req.session.loggedIn
    ? res.render("../views/home.hbs", {
        loggedIn: true,
      })
    : res.render("../views/welcome.hbs", {
        loggedIn: false,
      });
});

routerBase.get("/gamelibrary", async function (req, res) {
  try {
    const library = await getGameLibrary(mockSteamId, 60);
    const viewLibrary = [];
    if (library.length > 0)
      library.forEach((elem) => {
        viewLibrary.push({
          gametitle: elem.name,
          appID: elem.appid,
        });
      });

    res.render("gamelibrary", {
      games: viewLibrary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = routerBase;
