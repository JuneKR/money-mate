import express from "express";
import {
    createRetirementPlan,
    getRetirementPlanByUserId,
    getRetirementPlanById,
    editRetirementPlan,
    deleteRetirementPlan,
    addTransactionToRetirementPlan,
    getAllRetirementTransactionsByRetirementId,
    getRetirementTransactionById
} from "../controllers/savingRetirementPlanController";

const router = express.Router();

router.get('/user/:id/saving/retirement/', getRetirementPlanByUserId);
router.get('/saving/retirement/:id', getRetirementPlanById);
router.post('/saving/retirement', createRetirementPlan);
router.patch('/saving/retirement/:id', editRetirementPlan);
router.delete('/saving/retirement/:id', deleteRetirementPlan);

/* Transaction */
router.post('/saving/retirement/:id/transaction', addTransactionToRetirementPlan);
router.get('/saving/retirement/:id/transactions', getAllRetirementTransactionsByRetirementId);
router.get('/saving/retirement/transaction/:id', getRetirementTransactionById);

export default router;