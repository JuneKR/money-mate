import express from "express";
import {
    createInvestmentPortfolio,
    getAllInvestmentPortfolioByUserId,
    getInvestmentPortfolioById,
    getInvestmentPortfolioByEmergencyId,
    getInvestmentPortfolioByGoalId,
    getInvestmentPortfolioByRetirementId,
    editInvestmentPortfolio,
    deleteInvestmentPortfolio,
    getInvestmentPortfolioAllocationByPortfolioId,
    editInvestmentPortfolioAllocationByPortfolioId,
    addInvestmentTransaction, 
    getAllInvestmentTransactionsByPortfolioId,
    getInvestmentTransactionById,
    addMutualFundToInvestmentPortfolio,
    addMutualFundsToInvestmentPortfolio,
    addEmergencyInvestmentTransaction,
    addGoalInvestmentTransaction,
    addRetirementInvestmentTransaction
} from '../../controllers/portfolio management/investmentPortfolioController';

const router = express.Router();

/* Investment Portfolio */
router.post('/api/investment/portfolio', createInvestmentPortfolio);
router.get('/api/user/:id/investment/portfolios', getAllInvestmentPortfolioByUserId);
router.get('/api/investment/portfolio/:id', getInvestmentPortfolioById);
router.patch('/api/investment/portfolio/:id', editInvestmentPortfolio);
router.delete('/api/investment/portfolio/:id', deleteInvestmentPortfolio)
router.get('/api/emergency/:id/investment/portfolio', getInvestmentPortfolioByEmergencyId);
router.get('/api/goal/:id/investment/portfolio', getInvestmentPortfolioByGoalId);
router.get('/api/retirement/:id/investment/portfolio', getInvestmentPortfolioByRetirementId);

router.get('/api/investment/portfolio/:id/allocation', getInvestmentPortfolioAllocationByPortfolioId);
router.patch('/api/investment/portfolio/:id/allocation', editInvestmentPortfolioAllocationByPortfolioId);
router.post('/api/investment/portfolio/:id/transaction', addInvestmentTransaction);
router.get('/api/investment/:id/transactions', getAllInvestmentTransactionsByPortfolioId);
router.get('/api/investment/transaction/:id', getInvestmentTransactionById);
router.post('/api/emergency/investment/portfolio/:id/transaction', addEmergencyInvestmentTransaction);
router.post('/api/goal/investment/portfolio/:id/transaction', addGoalInvestmentTransaction);
router.post('/api/retirement/investment/portfolio/:id/transaction', addRetirementInvestmentTransaction);

router.post('/api/investment/portfolio/fund', addMutualFundToInvestmentPortfolio);
router.post('/api/investment/portfolio/funds', addMutualFundsToInvestmentPortfolio);

export default router;