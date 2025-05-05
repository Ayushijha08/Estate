import express from 'express';
import { deleteuser, getAlluser, getuserById, updateuser, login } from "../controllers/UserController.js";
const router = express.Router();

router.post("/login", login);
router.get("/getAlluser", getAlluser);
router.get("/getuserById/:id", getuserById);
router.put("/updateuser/:id",  updateuser);
router.delete("/deleteuser/:id", deleteuser);
export default router; 