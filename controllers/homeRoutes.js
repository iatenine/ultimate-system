const { getGameLibrary, getSessionUser } = require("../utils/helpers");
const routerBase = require("express").Router();
const mockSteamId = "76561197960434622"; // For development purposes only
// https://steamcommunity.com/{steamId}  link for getting profile pages

// Base home page route, only one accessible when not logged in
routerBase.get("/", (req, res) => {
  req.session.loggedIn
    ? res.redirect("/gamelibrary")
    : res.render("../views/welcome.hbs", {
        loggedIn: false,
      });
});

// View user's profile page
routerBase.get("/profile", async (req, res) => {
  if (!req?.session?.loggedIn) res.redirect("/");
  try {
    const user = await getSessionUser(req);

    res.render("../views/profilepage.hbs", {
      username: user.dataValues.username,
      steamUID: user.dataValues.steamId,
      email: user.dataValues.email,
      zipCode: user.dataValues.zipcode,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// View user's library
routerBase.get("/gamelibrary", async function (req, res) {
  if (!req?.session?.loggedIn) res.redirect("/");
  try {
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

// Find matches for a game of given id
routerBase.get("/findmatches/:id", (req, res) => {
  if (!req?.session?.loggedIn) res.redirect("/");
  res.render("../views/profilelist.hbs", {
    profile: [
      {
        username: "Mock username",
        steamUID: mockSteamId,
        zipCode: 90210,
      },
    ],
  });
});

module.exports = routerBase;
