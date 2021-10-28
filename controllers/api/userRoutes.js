const router = require("express").Router();
const { Games } = require("../../models");
const User = require("../../models/User");
const { createUser, updateUser } = require("../../utils/userHelpers");
const {
  getUserbyUsername,
  checkPassword,
  getSessionUser,
} = require("../../utils/helpers");

// Steam API key
const key = "932AC27CD2D71E6D00C5868C5DC322F6";

// Login
router.post("/login", async (req, res) => {
  try {
    const result = await getUserbyUsername(req.body.username);
    if (!result) res.status(400).end();
    const success = checkPassword(req.body.password, result.password);
    if (!success) res.status(403).end();
    // Update session store
    else
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = result.id;
        res.status(200).json(result);
      });
  } catch (err) {
    console.log("This is an error: ", err);
    res.status(500).send(err);
  }
});

// CREATE a new user
router.post("/", async (req, res) => {
  try {
    const userData = await createUser(req.body);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = userData.id;
      res.status(201).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Must provide users password to delete account
    // if (!req.session.loggedIn || !req.session.userId) res.status(403).end();
    const user = await User.findByPk(req.params.id);
    const confirm = checkPassword(req.body.password, user.password);
    if (!confirm) res.status(403).end();
    const result = await user.destroy({ truncate: { cascade: true } });
    res.status(204).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/*
Update user password
should have the following form:

password: <current_password>
new_password: <new_password>

All requests must include current password
*/
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    // Prevent database manipulation
    req.body["username"] = user.username;
    req.body["id"] = req.params.id;
    if (!user) res.status(400).end();
    if (!checkPassword(req.body.password, user.password)) res.status(400).end();
    const result = await updateUser(user, req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Protected put route to update user profile
router.put("/updateProfile", async (req, res) => {
  if (req?.session?.loggedIn) res.status(403).end();
  try {
    const user = await User.findByPk(req.session.userId);
    // strip all items except steamid and zipcode from req.body
    const sanitizedBody = {
      steamid: req.body?.steamid ? req.body.steamid : user.steamid,
      zipcode: req.body?.zipcode ? req.body.zipcode : user.zipcode,
    };
    const result = await user.update(sanitizedBody);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/library/:id", async (req, res) => {
  try {
    const library = await User.findOne({
      where: { id: req.params.id },
      attributes: ["username", "steamId"],
      include: [
        {
          model: Games,
          attributes: ["appId", "gameTitle", "totalPlayTime"],
        },
      ],
    });
    if (library) res.status(200).json(library);
    res.status(404).end();
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get("/", async (req, res) => {
  const sessionUser = await getSessionUser(req);
  if (!sessionUser) res.status(403).end();
  res.status(200).json(sessionUser);
});

module.exports = router;
