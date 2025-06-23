import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: Number, min: 1, max: 5, required: true },
  category: { type: String, required: true },
  technologies: [String],
  submissions: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["available", "completed"],
    default: "available",
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
