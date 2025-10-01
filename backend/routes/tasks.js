const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const t = await Task.create({ ...req.body, createdBy: req.user });
    req.app.get("io").emit("task:created", t);
    res.status(201).json({ data: t });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const { status, priority } = req.query;
    let query = { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const t = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    req.app.get("io").emit("task:updated", t);
    res.json({ data: t });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    req.app.get("io").emit("task:deleted", { id: req.params.id });
    res.json({ msg: "deleted" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
