const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(process.env.DB_URI, { dbName: "Movies" })
    .then((conn) => {
      console.log(`Database Connected ${conn.connection.host}`);
    });
};

module.exports = dbConnection;
