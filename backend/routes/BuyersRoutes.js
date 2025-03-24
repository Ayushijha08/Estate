import express, { application } from 'express';
import { createBuyer, getAllBuyers, getBuyerById, updateBuyer, deleteBuyer } from "../controllers/BuyersController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createBuyer", createBuyer);
router.get("/getAllBuyers", getAllBuyers);
router.get("/getBuyerById/:id", getBuyerById);
router.put("/updateBuyer/:id",  updateBuyer);
router.delete("/deleteBuyer/:id",deleteBuyer);
export default router;