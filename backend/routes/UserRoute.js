import express, { application } from 'express';
import { createUser, getAllUsers,updateUser ,deleteUser} from "../controllers/UserController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createUser", createUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:id",  updateUser);
router.delete("/deleteUser/:id",deleteUser);


export default router;