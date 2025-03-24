import express, { application } from 'express';
import { createProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } from "../controllers/PropertyController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createProperty", createProperty);
router.get("/getAllProperties", getAllProperties);
router.get("/getPropertyById/:id", getPropertyById);
router.put("/updateProperty/:id",  updateProperty);
router.delete("/deleteProperty/:id",deleteProperty);
export default router;