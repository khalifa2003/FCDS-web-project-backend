const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./utils/swagger");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");

dotenv.config({ path: ".env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
const dbConnection = require("./config/database");

// Connect with db
dbConnection();

// Routes
const mountRoutes = require("./routes/routes");

// express app
const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
    method: ["GET", "POST", "DELETE", "PUT"],
  })
);
app.use(bodyParser.json());

// Middleware to serve favicon
app.use(favicon(path.join(__dirname, "./favicon.ico")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

// Enable other domains to access your application
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
mountRoutes(app);
app.get("/", (req, res) => {
  res.json({ msg: "Hello World!" });
});

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
