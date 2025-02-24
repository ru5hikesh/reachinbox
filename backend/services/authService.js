const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const registerUser = async (email, password) => {
  const userExists = await User.findOne({ mainEmail: email });

  if (userExists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    mainEmail: email,
    passwordHash: hashedPassword,
    authMethod: "password",
  });

  return generateToken(user);
};

const loginUser = async (email, password) => {
  const user = await User.findOne({
    $or: [{ mainEmail: email }, { linkedEmails: email }],
  });

  if (!user || user.authMethod !== "password") throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) throw new Error("Invalid credentials");

  console.log(`🔑 User logged in: ${email}`);
  
  return generateToken(user);
};

module.exports = { registerUser, loginUser };
