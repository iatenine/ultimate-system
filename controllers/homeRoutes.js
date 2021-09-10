const routerBase = require("express").Router();

routerBase.get("/", (req, res) => {
  if (req.session.loggedIn) {
    console.log("logged in");
    res.render("../views/layouts/main.handlebars", {});
  } else {
    console.log("Nope");
  }
  res.status(200).end();
});


routerBase.get('/gamelibrary', function (req, res) {
  // res.status(200).send("ok confirmed")   
   
   res.render('gamelibrary', {
         games: [
             {
                 gametitle: `${gametitle}`,
                 appID: 10,
                 image: 'https://picsum.photos/500/500',
              
             },
             {
                 gametitle: "GTA",
                 appID: 20,
                 image: 'https://picsum.photos/500/500?2',
                
             }
         ]
     });
   });

module.exports = routerBase;
