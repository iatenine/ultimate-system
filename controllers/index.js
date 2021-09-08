const topRouter = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");

topRouter.use("/api", apiRoutes);
topRouter.use("/", homeRoutes);

module.exports = topRouter;
