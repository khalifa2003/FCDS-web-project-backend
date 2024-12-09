const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "First name required"],
    },
    lname: {
      type: String,
      required: [true, "Second name required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
      unique: true,
      lowercase: true,
    },
    phone: String,
    password: { type: String, required: true },
    image: { type: String },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    password: {
      type: String,
      required: [true, "Password Required"],
      minlength: [6, "Too Short Password"],
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: { type: String, enum: ["user", "manager", "admin"], default: "user" },
    active: { type: Boolean, default: true },
    wishlist: [{ type: mongoose.Schema.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hashing User Password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
