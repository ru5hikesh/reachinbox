const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

// Register (Email & Password)
router.post("/register", async (req, res) => {
  try {
    const token = await registerUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login (Email & Password)
router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
