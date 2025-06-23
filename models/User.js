import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
  github: String,
  linkedin: String,
  whatsapp: String,
  avatar: String,
  projectsDelivered: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

const User = mongoose.model("User", userSchema);
export default User;
