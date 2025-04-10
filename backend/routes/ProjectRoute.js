import express, { application } from 'express';
import { createProject, getAllProjects, getProjectById, updateProject, deleteProject } from "../controllers/ProjectController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createProject", createProject);
router.get("/getAllProjects", getAllProjects);
router.get("/getProjectById/:id", getProjectById);
router.put("/updateProject/:id",  updateProject);
router.delete("/deleteProject/:id",deleteProject);
export default router;