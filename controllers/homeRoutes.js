const User = require("../models/User");
const { getGameLibrary, getSessionUser } = require("../utils/helpers");
const routerBase = require("express").Router();
const mockSteamId = "76561197960434622";

routerBase.get("/profile", (req, res) => {
  res.render("../views/profilepage.hbs", {
    username: "The Name",
    steamUID: "75664561456475",
    email: "hello@somewhere.com",
    zipCode: "A7B2S1",
  });
});

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
    if (!req?.session?.loggedIn) res.redirect("/");
    const user = await getSessionUser(req);
    if (!user.dataValues.steamId)
      res.render("gamelibrary", {
        games: [],
      });
    else {
      const steamId = user.dataValues.steamId.toString();
      const library = await getGameLibrary(steamId, 120);
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
    }
  } catch (err) {
    console.error("Error is here: ", err);
    res.status(500).send("Server Error");
  }
});

module.exports = routerBase;
