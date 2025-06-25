import express from "express";
import Project from "../models/Project.js";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.aggregate([
      { $match: { status: "available" } },
      {
        $lookup: {
          from: "submissions",
          localField: "_id",
          foreignField: "project",
          as: "submissions",
        },
      },
      {
        $addFields: {
          waitingCount: {
            $size: {
              $filter: {
                input: "$submissions",
                as: "submission",
                cond: { $eq: ["$$submission.status", "waiting"] },
              },
            },
          },
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          category: 1,
          technologies: 1,
          difficulty: 1,
          waitingCount: 1,
          status: 1,
        },
      },
    ]);
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body);
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const updated = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const deleted = await Project.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    res.json({ message: "Projeto deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
