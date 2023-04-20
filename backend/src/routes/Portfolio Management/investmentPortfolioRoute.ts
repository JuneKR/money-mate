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
router.post('/investment/portfolio', createInvestmentPortfolio);
router.get('/user/:id/investment/portfolios', getAllInvestmentPortfolioByUserId);
router.get('/investment/portfolio/:id', getInvestmentPortfolioById);
router.patch('/investment/portfolio/:id', editInvestmentPortfolio);
router.delete('/investment/portfolio/:id', deleteInvestmentPortfolio)
router.get('/emergency/:id/investment/portfolio', getInvestmentPortfolioByEmergencyId);
router.get('/goal/:id/investment/portfolio', getInvestmentPortfolioByGoalId);
router.get('/retirement/:id/investment/portfolio', getInvestmentPortfolioByRetirementId);

router.get('/investment/portfolio/:id/allocation', getInvestmentPortfolioAllocationByPortfolioId);
router.patch('/investment/portfolio/:id/allocation', editInvestmentPortfolioAllocationByPortfolioId);
router.post('/investment/portfolio/:id/transaction', addInvestmentTransaction);
router.get('/investment/:id/transactions', getAllInvestmentTransactionsByPortfolioId);
router.get('/investment/transaction/:id', getInvestmentTransactionById);
router.post('/emergency/investment/portfolio/:id/transaction', addEmergencyInvestmentTransaction);
router.post('/goal/investment/portfolio/:id/transaction', addGoalInvestmentTransaction);
router.post('/retirement/investment/portfolio/:id/transaction', addGoalInvestmentTransaction);

router.post('/investment/portfolio/fund', addMutualFundToInvestmentPortfolio);
router.post('/investment/portfolio/funds', addMutualFundsToInvestmentPortfolio);

export default router;