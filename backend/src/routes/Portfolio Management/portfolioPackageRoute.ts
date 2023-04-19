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
router.post('/portfolio/package', createPortfolioPackage);
router.get('/portfolio/packages', getAllPortfolioPackages);
router.get('/portfolio/package/:id', getPortfolioPackageById);
router.patch('/portfolio/package/:id', editPortfolioPackageInfo);
router.get('/portfolio/package/:id/allocations', getAllPortfolioPackageAllocationByPackageId);
router.patch('/portfolio/package/:id/allocations', editPortfolioPackageAllocationByPackageId);
router.get('/portfolio/package/risk-spectrum/:risk', getPortfolioPackageByRiskSpectrum);

/* Add New Mutual Fund to Package */
router.post('/portfolio/package/fund', addMutualFundToPackage);
router.patch('/portfolio/package/:id/calculate-returns', calculatePortfolioPackageReturns);

export default router;
// http://localhost:8080/portfolio/package/2/allocations