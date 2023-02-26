import express from "express";
import {
    createGoalBasedPlan,
    getGoalBasedPlanById,
    editGoalBasedPlan,
    deleteGoalBasedPlan
} from "../controllers/goalBasedSavingPlanController";

const router = express.Router();

router.get('/saving/goal/:id', getGoalBasedPlanById);
router.post('/saving/goal', createGoalBasedPlan);
router.patch('/saving/goal/:id', editGoalBasedPlan);
router.delete('/saving/goal/:id', deleteGoalBasedPlan);

export default router;