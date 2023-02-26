import express from "express";
import {
    createGoalBasedPlan,
    getGoalBasedPlanById,
    editGoalBasedPlan,
    deleteGoalBasedPlan
} from "../controllers/goalBasedSavingPlanController";

const router = express.Router();

router.get('/saving/emergency/:id', getGoalBasedPlanById);
router.post('/saving/emergency', createGoalBasedPlan);
router.patch('/saving/emergency/:id', editGoalBasedPlan);
router.delete('/saving/emergency/:id', deleteGoalBasedPlan);

export default router;