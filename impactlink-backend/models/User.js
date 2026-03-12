const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    bio: { type: String, default: "", maxlength: 500 },
    phone: { type: String, default: "" },
    avatar: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    settings: {
      emailNotifications: { type: Boolean, default: true },
      darkMode: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

// Hash password before saving (if modified)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
