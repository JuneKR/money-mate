import express from "express";
import {
    createPortfolioPackage,
    getAllPortfolioPackages,
    getPortfolioPackageById,
    editPortfolioPackageInfo,
    getAllPortfolioPackageAllocationByPackageId,
    editPortfolioPackageAllocationByPackageId,
    addMutualFundToPackage
} from '../../controllers/portfolio management/portfolioPackageController';

const router = express.Router();

/* Portfolio Package */
router.post('/portfolio/package', createPortfolioPackage);
router.get('/portfolio/packages', getAllPortfolioPackages);
router.get('/portfolio/package/:id', getPortfolioPackageById);
router.patch('/portfolio/package/:id', editPortfolioPackageInfo);
router.get('/portfolio/package/:id/allocations', getAllPortfolioPackageAllocationByPackageId);
router.patch('/portfolio/package/:id/allocations', editPortfolioPackageAllocationByPackageId);

/* Add New Mutual Fund to Package */
router.post('/portfolio/package/fund', addMutualFundToPackage);

export default router;