import express from "express";
import {
    createRetirementPlan,
    getRetirementPlanById,
    editRetirementPlan,
    deleteRetirementPlan
} from "../controllers/savingRetirementPlanController";

const router = express.Router();

router.get('/saving/retirement/:id', getRetirementPlanById);
router.post('/saving/retirement', createRetirementPlan);
router.patch('/saving/retirement/:id', editRetirementPlan);
router.delete('/saving/retirement/:id', deleteRetirementPlan);

export default router;