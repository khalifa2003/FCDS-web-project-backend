const movieRoutes = require("./movie.routes");
const tvshowRoutes = require("./tvshow.routes");
const personRoutes = require("./person.routes");
const genreRoutes = require("./genre.routes");
const userRoutes = require("./user.routes");
const reviewRoute = require("./review.routes");

const mountRoutes = (app) => {
  app.use("/movies", movieRoutes);
  app.use("/tvshows", tvshowRoutes);
  app.use("/people", personRoutes);
  app.use("/genres", genreRoutes);
  app.use("/users", userRoutes);
  app.use("/reviews", reviewRoute);
};

module.exports = mountRoutes;
