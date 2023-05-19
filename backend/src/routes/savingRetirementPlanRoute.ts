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

router.get('/api/user/:id/saving/retirement/', getRetirementPlanByUserId);
router.get('/api/saving/retirement/:id', getRetirementPlanById);
router.post('/api/saving/retirement', createRetirementPlan);
router.patch('/api/saving/retirement/:id', editRetirementPlan);
router.delete('/api/saving/retirement/:id', deleteRetirementPlan);

/* Transaction */
router.post('/api/saving/retirement/:id/transaction', addTransactionToRetirementPlan);
router.get('/api/saving/retirement/:id/transactions', getAllRetirementTransactionsByRetirementId);
router.get('/api/saving/retirement/transaction/:id', getRetirementTransactionById);

export default router;