import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ status: "available" });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
