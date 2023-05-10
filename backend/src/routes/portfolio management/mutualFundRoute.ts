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

router.post('/mutual/fund', createMutualFund);
router.get('/mutual/fund/:id', getMutualFundByFundId);
router.get('/mutual/fund/abbr/:name', getMutualFundByFundAbbrName);
router.get('/mutual/funds', getAllMutualFunds);
router.patch('/mutual/fund/:id', editMutualFundInfo);

/* Package */
router.get('/portfolio/package/:id/funds', getAllMutualFundByPackageId);
// get all mutual fund by portfolio id

export default router;
