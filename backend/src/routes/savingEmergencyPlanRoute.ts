import express from "express";
import {
    createEmergencyPlan,
    getEmergencyPlanByUserId,
    getEmergencyPlanById,
    editEmergencyPlan,
    deleteEmergencyPlan,
    addTransactionToEmergencyPlan,
    getAllEmergencyTransactionsByEmergencyId,
    getEmergencyTransactionById
} from "../controllers/savingEmergencyPlanController";

const router = express.Router();

router.get('/api/user/:id/saving/emergency/', getEmergencyPlanByUserId);
router.get('/api/saving/emergency/:id', getEmergencyPlanById);
router.post('/api/saving/emergency', createEmergencyPlan);
router.patch('/api/saving/emergency/:id', editEmergencyPlan);
router.delete('/api/saving/emergency/:id', deleteEmergencyPlan);

/* Transaction */
router.post('/api/saving/emergency/:id/transaction', addTransactionToEmergencyPlan);
router.get('/api/saving/emergency/:id/transactions', getAllEmergencyTransactionsByEmergencyId);
router.get('/api/saving/emergency/transaction/:id', getEmergencyTransactionById);

export default router;
