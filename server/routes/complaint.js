import express from "express";
import { addComplaint, getComplaint,editComplaint,deleteComplaint } from "../controllers/complaint.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();


router.post("/addComplaint", addComplaint);
router.get("/getComplaint", getComplaint);
router.put("/editComplaint/:id", editComplaint);
router.delete("/deleteComplaint/:id", deleteComplaint);

export default router;
