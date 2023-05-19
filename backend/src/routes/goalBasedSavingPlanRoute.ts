import express from "express";
import {
    createGoalBasedPlan,
    getGoalBasedPlanById,
    getAllGoalBasedPlanByUserId,
    editGoalBasedPlan,
    deleteGoalBasedPlan,
    addTransactionToGoalBasedPlan,
    getFirstGoalBasedPlanByUserId,
    getAllGoalBasedTransactionsByGoalId,
    getGoalBasedTransactionById
} from "../controllers/goalBasedSavingPlanController";

const router = express.Router();

router.get('/api/user/:id/saving/goal',getFirstGoalBasedPlanByUserId);
router.get('/api/user/:id/saving/goals',getAllGoalBasedPlanByUserId);
router.get('/api/saving/goal/:id', getGoalBasedPlanById);
router.post('/api/saving/goal', createGoalBasedPlan);
router.patch('/api/saving/goal/:id', editGoalBasedPlan);
router.delete('/api/saving/goal/:id', deleteGoalBasedPlan);

/* Transaction */
router.post('/api/saving/goal/:id/transaction', addTransactionToGoalBasedPlan);
router.get('/api/saving/goal/:id/transactions', getAllGoalBasedTransactionsByGoalId);
router.get('/api/saving/goal/transaction/:id', getGoalBasedTransactionById);

export default router;
