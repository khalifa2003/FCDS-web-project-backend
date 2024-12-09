const mongoose = require("mongoose");
const Movie = require("./movie.model");

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: [true, "review ratings required"],
  },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  tvShow: { type: mongoose.Schema.Types.ObjectId, ref: "TVShow" },
  createdAt: { type: Date, default: Date.now },
});

ReviewSchema.pre(/^find/, function (next) {
  this.populate({ path: "user", select: ["fname", "lname"] });
  next();
});

// reviewSchema.post("save", async function () {
//   await this.constructor.calcAverageRatingsAndQuantity(this.product);
// });

// reviewSchema.post("remove", async function () {
//   await this.constructor.calcAverageRatingsAndQuantity(this.product);
// });

// reviewSchema.statics.calcAverageRatingsAndQuantity = async function (movieId) {
//   const result = await this.aggregate([
//     // Stage 1 : get all reviews in specific movie
//     {
//       $match: { movie: movieId },
//     },
//     // Stage 2: Grouping reviews based on movieID and calc avgRatings, ratingsQuantity
//     {
//       $group: {
//         _id: "movie",
//         avgRatings: { $avg: "$ratings" },
//         ratingsQuantity: { $sum: 1 },
//       },
//     },
//   ]);
//   if (result.length > 0) {
//     await Movie.findByIdAndUpdate(movieId, {
//       ratingsAverage: result[0].avgRatings,
//       ratingsQuantity: result[0].ratingsQuantity,
//     });
//   } else {
//     await Movie.findByIdAndUpdate(movieId, {
//       ratingsAverage: 0,
//       ratingsQuantity: 0,
//     });
//   }
// };

module.exports = mongoose.model("Review", ReviewSchema);
