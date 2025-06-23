import express from "express";
import Application from "../models/Application.js";
import mongoose from "mongoose";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectId, userId, status } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(projectId) ||
      !mongoose.Types.ObjectId.isValid(userId)
    ) {
      return res.status(400).json({ error: "IDs inválidos" });
    }

    const application = new Application({
      projectId,
      userId,
      status: status || "pending",
      appliedAt: new Date(),
    });

    const saved = await application.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find().populate("projectId userId");
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
