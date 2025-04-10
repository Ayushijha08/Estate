import express, { application } from 'express';
import { createSiteVisits, getAllSiteVisits, getSiteVisitsById, updateSiteVisits, deleteSiteVisits } from "../controllers/SiteVisitsController.js";
const router = express.Router();
// import auth, { authorizeRole } from '../config/auth.js';

router.post("/createSiteVisits", createSiteVisits);
router.get("/getAllSiteVisits", getAllSiteVisits);
router.get("/getSiteVisitsById/:id", getSiteVisitsById);
router.put("/updateSiteVisits/:id",  updateSiteVisits);
router.delete("/deleteSiteVisits/:id",deleteSiteVisits);
export default router;