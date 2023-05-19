import express from "express";
import {
    createMutualFund,
    getAllMutualFunds,
    getMutualFundByFundId,
    getMutualFundByFundAbbrName,
    editMutualFundInfo,
    getAllMutualFundByPackageId
} from '../../controllers/portfolio management/mutualFundController';

const router = express.Router();

router.post('/api/mutual/fund', createMutualFund);
router.get('/api/mutual/fund/:id', getMutualFundByFundId);
router.get('/api/mutual/fund/abbr/:name', getMutualFundByFundAbbrName);
router.get('/api/mutual/funds', getAllMutualFunds);
router.patch('/api/mutual/fund/:id', editMutualFundInfo);

/* Package */
router.get('/api/portfolio/package/:id/funds', getAllMutualFundByPackageId);
// get all mutual fund by portfolio id

export default router;
