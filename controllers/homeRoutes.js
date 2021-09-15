const {
  getSessionUser,
  getPlayersWithGame,
  updateGameDatabase,
  getGamesFromDb,
} = require("../utils/helpers");
const routerBase = require("express").Router();
const mockSteamId = "76561197960434622"; // For development purposes only
// https://steamcommunity.com/{{steamUID}}  link for getting profile pages

// Base home page route, only one accessible when not logged in
routerBase.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    const user = await getSessionUser(req);
    await updateGameDatabase(user);
    res.redirect("/gamelibrary");
  } else
    res.render("../views/welcome.hbs", {
      loggedIn: req.session.loggedIn,
    });
});

// View user's profile page
routerBase.get("/profile", async (req, res) => {
  if (!req?.session?.loggedIn) res.redirect("/");
  try {
    const user = await getSessionUser(req);

    res.render("../views/profilepage.hbs", {
      loggedIn: req.session.loggedIn,
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
    const gameList = await getGamesFromDb(req.session.userId);
    const viewLibrary = [];

    gameList.forEach((game) => {
      viewLibrary.push({
        gametitle: game.gameTitle,
        appID: game.appId,
      });
    });

    res.render("gamelibrary", {
      loggedIn: req.session.loggedIn,
      games: viewLibrary,
    });
  } catch (err) {
    console.error("Error is here: ", err);
    res.status(500).send("Server Error");
  }
});

// Find matches for a game of given id
routerBase.get("/findmatches/:id", async (req, res) => {
  if (!req?.session?.loggedIn) res.redirect("/");
  const currentUser = await getSessionUser(req);
  const players = await getPlayersWithGame(req.params.id);
  const playerData = [];
  players.forEach((elem) => {
    // Exclude user's own profile
    if (elem.dataValues.username !== currentUser.dataValues.username) {
      const newData = {
        username: elem.dataValues.username,
        steamUID: elem.dataValues.steamId,
        zipCode: elem.dataValues.zipcode,
      };
      playerData.push(newData);
    }
  });
  res.render("../views/profilelist.hbs", {
    loggedIn: true,
    profile: playerData,
  });
});

// Logout user and end session
routerBase.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = routerBase;
