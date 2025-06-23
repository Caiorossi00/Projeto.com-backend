import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String, required: true },
  status: {
    type: String,
    enum: ["waiting", "grouped", "completed"],
    default: "waiting",
  },
  deliverDate: Date,
  deployUrl: String,
  githubUrl: String,
});

const Submission = mongoose.model("Submission", submissionSchema);
export default Submission;
