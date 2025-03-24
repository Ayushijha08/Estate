import express, { application } from 'express';
import { createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking } from "../controllers/BookingController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createBooking", createBooking);
router.get("/getAllBookings", getAllBookings);
router.get("/getBookingById/:id", getBookingById);
router.put("/updateBooking/:id",  updateBooking);
router.delete("/deleteBooking/:id",deleteBooking);
export default router;