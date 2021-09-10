const path = require("path");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const controllers = require("./controllers");
const User = require("./models/User");
const Games = require("./models/Games");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
  expires: new Date(Date.now() + 30 * 86400 * 1000 * 365),
};

app.use(session(sess));

app.use(cookieParser());
const hbs = exphbs.create({});


app.engine('hbs', exphbs({
  defaultLayout: 'index',
  extname: '.hbs',
  helpers: {
    getShortComment(comment) {
        if (comment.length < 64) {
            return comment;
        }

        return comment.substring(0, 61) + '...';
    }
}
}));

app.set("view engine", "hbs");

app.get('/', function (req, res) {
  res.render('home', {
     
  });
});

  app.get('/profilepage', function (req, res) {
    res.render('profilepage', {
        profiledetails: [
            {
                username: "Peter",
                steamUID: 'COD',
                image : 'https://picsum.photos/500/500?2',
                zipCode: "80016",
                comments:
                [
                ]
            }
        ]
    });
  });

  //route to test variable access by main layout
  app.get('/test/auth', function(req,res)  {
    res.render("")
  })


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// app.use(controllers);
app.use(controllers);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port: ", PORT));
});
