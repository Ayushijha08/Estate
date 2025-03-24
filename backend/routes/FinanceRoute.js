import express, { application } from 'express';
import { createFinance, getAllFinances, getFinanceById, updateFinance, deleteFinance } from "../controllers/FinanceController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createFinance", createFinance);
router.get("/getAllFinances", getAllFinances);
router.get("/getFinanceById/:id", getFinanceById);
router.put("/updateFinance/:id",  updateFinance);
router.delete("/deleteFinance/:id",deleteFinance);
export default router;