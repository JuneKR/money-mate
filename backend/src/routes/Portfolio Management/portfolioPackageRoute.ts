import express from "express";
import {
    createPortfolioPackage,
    getAllPortfolioPackages,
    getPortfolioPackageById,
    editPortfolioPackageInfo,
    getPortfolioPackageByRiskSpectrum,
    getAllPortfolioPackageAllocationByPackageId,
    editPortfolioPackageAllocationByPackageId,
    addMutualFundToPackage,
    calculatePortfolioPackageReturns
} from '../../controllers/portfolio management/portfolioPackageController';

const router = express.Router();

/* Portfolio Package */
router.post('/api/portfolio/package', createPortfolioPackage);
router.get('/api/portfolio/packages', getAllPortfolioPackages);
router.get('/api/portfolio/package/:id', getPortfolioPackageById);
router.patch('/api/portfolio/package/:id', editPortfolioPackageInfo);
router.get('/api/portfolio/package/:id/allocations', getAllPortfolioPackageAllocationByPackageId);
router.patch('/api/portfolio/package/:id/allocations', editPortfolioPackageAllocationByPackageId);
router.get('/api/portfolio/package/risk-spectrum/:risk', getPortfolioPackageByRiskSpectrum);

/* Add New Mutual Fund to Package */
router.post('/api/portfolio/package/fund', addMutualFundToPackage);
router.patch('/api/portfolio/package/:id/calculate-returns', calculatePortfolioPackageReturns);

export default router;