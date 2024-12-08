const movieRoutes = require("./movie.routes");
const tvshowRoutes = require("./tvshow.routes");
const personRoutes = require("./person.routes");
const genreRoutes = require("./genre.routes");
const userRoutes = require("./user.routes");

// Define the routes
const mountRoutes = (app) => {
  app.use("/movies", movieRoutes);
  app.use("/tvshows", tvshowRoutes);
  app.use("/people", personRoutes);
  app.use("/genres", genreRoutes);
  app.use("/users", userRoutes);
};

module.exports = mountRoutes;
