const movieRoutes = require("./movie.routes");
const tvshowRoutes = require("./tvshow.routes");
const personRoutes = require("./person.routes");
const genreRoutes = require("./genre.routes");
const userRoutes = require("./user.routes");
const reviewRoute = require("./review.routes");
const companyRoutes = require("./company.routes");
const authRoute = require("./auth.routes");
const collectionRoutes = require("./collection.routes");

const mountRoutes = (app) => {
  app.use("/movies", movieRoutes);
  app.use("/tvshows", tvshowRoutes);
  app.use("/people", personRoutes);
  app.use("/genres", genreRoutes);
  app.use("/users", userRoutes);
  app.use("/reviews", reviewRoute);
  app.use("/company", companyRoutes);
  app.use("/auth", authRoute);
  app.use("/collections", collectionRoutes);
};

module.exports = mountRoutes;
