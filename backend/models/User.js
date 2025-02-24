const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  mainEmail: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  linkedEmails: { type: [String], default: [] },
  authMethod: { type: String, enum: ["password", "google"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
