import express from "express";
import {
    getAllPortfolioPackages,
    getPortfolioPackageById,
    editPortfolioPackageInfo,
    getAllPortfolioPackageAllocationByPackageId,
    editPortfolioPackageAllocationByPackageId,
    getMutualFundByFundId,
    getAllMutualFundByPackageId,
    editMutualFundInfo
} from '../../controllers/Portfolio Management/portfolioPackageController';

const router = express.Router();

/* Portfolio Package */
router.get('/portfolio/packages', getAllPortfolioPackages);
router.get('/portfolio/package/:id', getPortfolioPackageById);
router.patch('/portfolio/package/:id', editPortfolioPackageInfo);
router.get('/portfolio/package/:id/allocations', getAllPortfolioPackageAllocationByPackageId);
router.patch('/portfolio/package/:id/allocations', editPortfolioPackageAllocationByPackageId);

/* Mutual Fund */
router.get('/portfolio/package/fund/:id', getMutualFundByFundId);
router.get('/portfolio/package/:id/funds', getAllMutualFundByPackageId);
router.patch('/portfolio/package/fund/:id', editMutualFundInfo);

export default router;