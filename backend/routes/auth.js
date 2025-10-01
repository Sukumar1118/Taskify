const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: "Exists" });
    const h = await bcrypt.hash(password, 10);
    const u = await User.create({ name, email, password: h });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: u._id, name: u.name, email: u.email },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ msg: "Invalid" });
    const ok = await bcrypt.compare(password, u.password);
    if (!ok) return res.status(400).json({ msg: "Invalid" });
    const token = jwt.sign({ id: u._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: { id: u._id, name: u.name, email: u.email },
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
