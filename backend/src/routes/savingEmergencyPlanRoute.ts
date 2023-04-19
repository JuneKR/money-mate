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

router.get('/user/:id/saving/emergency/', getEmergencyPlanByUserId);
router.get('/saving/emergency/:id', getEmergencyPlanById);
router.post('/saving/emergency', createEmergencyPlan);
router.patch('/saving/emergency/:id', editEmergencyPlan);
router.delete('/saving/emergency/:id', deleteEmergencyPlan);

/* Transaction */
router.post('/saving/emergency/:id/transaction', addTransactionToEmergencyPlan);
router.get('/saving/emergency/:id/transactions', getAllEmergencyTransactionsByEmergencyId);
router.get('/saving/emergency/transaction/:id', getEmergencyTransactionById);

export default router;
