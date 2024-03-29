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

router.get('/user/:id/saving/goal',getFirstGoalBasedPlanByUserId);
router.get('/user/:id/saving/goals',getAllGoalBasedPlanByUserId);
router.get('/saving/goal/:id', getGoalBasedPlanById);
router.post('/saving/goal', createGoalBasedPlan);
router.patch('/saving/goal/:id', editGoalBasedPlan);
router.delete('/saving/goal/:id', deleteGoalBasedPlan);

/* Transaction */
router.post('/saving/goal/:id/transaction', addTransactionToGoalBasedPlan);
router.get('/saving/goal/:id/transactions', getAllGoalBasedTransactionsByGoalId);
router.get('/saving/goal/transaction/:id', getGoalBasedTransactionById);

export default router;
