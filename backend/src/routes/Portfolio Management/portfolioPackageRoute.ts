import express from "express";
import {
    getAllPortfolioPackages,
    getPortfolioPackageById
} from '../../controllers/Portfolio Management/portfolioPackageController';

const router = express.Router();

router.get('/portfolio/packages', getAllPortfolioPackages);
router.get('/portfolio/package/:id', getPortfolioPackageById);

export default router;