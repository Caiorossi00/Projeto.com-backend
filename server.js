import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import projectsRoutes from "./routes/projects.js";
import usersRoutes from "./routes/users.js";
import applicationsRoutes from "./routes/applications.js";
import submissionsRoutes from "./routes/submissions.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch((err) => console.error("Erro ao conectar:", err));

app.use("/projects", projectsRoutes);
app.use("/users", usersRoutes);
app.use("/applications", applicationsRoutes);
app.use("/submissions", submissionsRoutes);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
