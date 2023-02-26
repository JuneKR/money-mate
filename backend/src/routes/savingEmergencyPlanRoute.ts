import express from "express";
import {
    createEmergencyPlan,
    getEmergencyPlanById,
    editEmergencyPlan,
    deleteEmergencyPlan
} from "../controllers/savingEmergencyPlanController";

const router = express.Router();

router.get('/saving/emergency/:id', getEmergencyPlanById);
router.post('/saving/emergency', createEmergencyPlan);
router.patch('/saving/emergency/:id', editEmergencyPlan);
router.delete('/saving/emergency/:id', deleteEmergencyPlan);

export default router;