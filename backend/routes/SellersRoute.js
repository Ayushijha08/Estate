import express, { application } from 'express';
import { createSeller, getAllSellers, getSellerById, updateSeller, deleteSeller } from "../controllers/SellersController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSeller", createSeller);
router.get("/getAllSellers", getAllSellers);
router.get("/getSellerById/:id", getSellerById);
router.put("/updateSeller/:id",  updateSeller);
router.delete("/deleteSeller/:id",deleteSeller);
export default router;