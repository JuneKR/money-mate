import express from "express";
import {
    getAllPortfolioPackages,
    getPortfolioPackageById,
    editPortfolioPackageInfo,
    getAllPortfolioPackageAllocationByPackageId,
    editPortfolioPackageAllocationByPackageId,
} from '../../controllers/portfolio management/portfolioPackageController';

const router = express.Router();

/* Portfolio Package */
router.get('/portfolio/packages', getAllPortfolioPackages);
router.get('/portfolio/package/:id', getPortfolioPackageById);
router.patch('/portfolio/package/:id', editPortfolioPackageInfo);
router.get('/portfolio/package/:id/allocations', getAllPortfolioPackageAllocationByPackageId);
router.patch('/portfolio/package/:id/allocations', editPortfolioPackageAllocationByPackageId);

export default router;