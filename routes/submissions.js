import express from "express";
import mongoose from "mongoose";
import Submission from "../models/Submission.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { projectId, name, email, whatsapp } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "ID do projeto inválido" });
    }

    if (!name || !email || !whatsapp) {
      return res
        .status(400)
        .json({ error: "Nome, email e whatsapp são obrigatórios" });
    }

    const submission = new Submission({
      project: projectId,
      name,
      email,
      whatsapp,
      status: "waiting",
      deliverDate: new Date(),
    });

    const saved = await submission.save();

    await mongoose.model("Project").findByIdAndUpdate(projectId, {
      $inc: { submissions: 1 },
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
