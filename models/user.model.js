const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: String,
    image: String,
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,
    role: { type: String, enum: ["user", "manager", "admin"], default: "user" },
    active: { type: Boolean, default: true },
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
