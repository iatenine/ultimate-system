const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const router = require("./routes");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "MySecret",
};

app.use(cookieParser());
app.use(session(sess));

const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
