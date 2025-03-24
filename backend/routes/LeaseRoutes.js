import express, { application } from 'express';
import { createLease, getAllLeases, getLeaseById, updateLease, deleteLease } from "../controllers/LeaseController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createLease", createLease);
router.get("/getAllLeases", getAllLeases);
router.get("/getLeaseById/:id", getLeaseById);
router.put("/updateLease/:id",  updateLease);
router.delete("/deleteLease/:id",deleteLease);
export default router;