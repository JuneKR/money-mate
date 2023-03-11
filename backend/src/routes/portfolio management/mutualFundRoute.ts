import express from "express";
import {
    createMutualFund,
    getMutualFundByFundId,
    editMutualFundInfo,
    getAllMutualFundByPackageId
} from '../../controllers/portfolio management/mutualFundController';

const router = express.Router();

router.post('/mutual/fund', createMutualFund);
router.get('/mutual/fund/:id', getMutualFundByFundId);
router.patch('/mutual/fund/:id', editMutualFundInfo);

/* Package */
router.get('/portfolio/package/:id/funds', getAllMutualFundByPackageId);

export default router;