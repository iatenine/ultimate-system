const router = require("express").Router();
const User = require("../../models/User");
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
    const userData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    res.status(201).json(userData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.delete("/", async (req, res) => {
  try {
    if (!req.session.loggedIn || !req.session.userId) res.status(403).end();
    const user = await User.findByPk(req.session.userId);
    // Confirm password
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
req.body should have the following form:
password: <current_password>
new_password: <new_password>
*/
router.put("/", async (req, res) => {
  try {
    const user = await getSessionUser(req);
    if (!user) res.status(400).end();
    if (!checkPassword(req.body.password, user.password)) res.status(400).end();
    const result = await user.update({
      password: req.body.new_password,
    });
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// Logout user and end session
router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.status(200).end();
  });
});

router.get("/", async (req, res) => {
  const sessionUser = await getSessionUser(req);
  if (!sessionUser) res.status(403).end();
  res.status(200).json(sessionUser);
});

module.exports = router;
