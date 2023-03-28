import express from "express";
import {
    createInvestmentPortfolio,
    getAllInvestmentPortfolioByUserId,
    getInvestmentPortfolioById,
    editInvestmentPortfolio,
    deleteInvestmentPortfolio,
    getInvestmentPortfolioAllocationByPortfolioId,
    editInvestmentPortfolioAllocationByPortfolioId,
    addInvestmentTransaction, 
    getAllInvestmentTransactionsByPortfolioId,
    getInvestmentTransactionById
} from '../../controllers/portfolio management/investmentPortfolioController';

const router = express.Router();

/* Investment Portfolio */
router.post('/investment/portfolio', createInvestmentPortfolio);
router.get('/user/:id/investment/portfolios', getAllInvestmentPortfolioByUserId);
router.get('/investment/portfolio/:id', getInvestmentPortfolioById);
router.patch('/investment/portfolio/:id', editInvestmentPortfolio);
router.delete('/investment/portfolio/:id', deleteInvestmentPortfolio)

router.get('/investment/portfolio/:id/allocation', getInvestmentPortfolioAllocationByPortfolioId);
router.patch('/investment/portfolio/:id/allocation', editInvestmentPortfolioAllocationByPortfolioId);
router.post('/investment/portfolio/:id/transaction', addInvestmentTransaction);
router.get('/investment/:id/transaction', getAllInvestmentTransactionsByPortfolioId);
router.get('/investment/transaction/:id', getInvestmentTransactionById);

export default router;