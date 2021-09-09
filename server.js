const path = require("path");
const express = require("express");
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const router = require("./routes");
const User = require("./models/User");
const Games = require("./models/Games");

const app = express();
const PORT = process.env.PORT || 3001;

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
      games: [
          {
              username: "Peter",
              games: 'COD',
              image: 'https://picsum.photos/500/500',
              comments: [
                  'This is the first comment',
                  'This is the second comment',
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
              ]
          },
          {
              username: 'John Doe',
              games: "GTA",
              image: 'https://picsum.photos/500/500?2',
              comments: [
              ]
          }
      ]
  });
});

app.get('/details', function (req, res) {
    res.render('details', {
        games: [
            {
                username: "Peter",
                games: 'COD',
                image: 'https://picsum.photos/500/500',
                comments: [
                    'This is the first comment',
                    'This is the second comment',
                    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec fermentum ligula. Sed vitae erat lectus.'
                ]
            },
            {
                username: 'John Doe',
                games: "GTA",
                image: 'https://picsum.photos/500/500?2',
                comments: [
                ]
            }
        ]
    });
  });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(router);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log("Now listening on port: ", PORT));
});
