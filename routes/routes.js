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
  app.use("/api/v1/movies", movieRoutes);
  app.use("/api/v1/tvshows", tvshowRoutes);
  app.use("/api/v1/people", personRoutes);
  app.use("/api/v1/genres", genreRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/reviews", reviewRoute);
  app.use("/api/v1/company", companyRoutes);
  app.use("/api/v1/auth", authRoute);
  app.use("/api/v1/collections", collectionRoutes);
};

module.exports = mountRoutes;
