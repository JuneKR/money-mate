import { Request, Response } from "express";
import PortfolioPackage from "../../models/portfolio management/portfolioPackageModel";
import PackageItem from "../../models/portfolio management/packageItem";
import MutualFund from "../../models/portfolio management/mutualFundModel";

/* Portfolio Package */
export const createPortfolioPackage = async(req: Request, res: Response) => {
    try {
        const 
        {   
            package_name,
            last_update,
            risk_spectrum,
            investment_type,
            return_rate,
        } = req.body;

        await PortfolioPackage.create({ 
            PackageName: package_name,
            LastUpdate: last_update,
            RiskSpectrum: risk_spectrum,
            InvestmentType: investment_type,
            ReturnRate: return_rate
        });
        res.status(201).json({msg: "Successful Create new portfolio package"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}


export const getAllPortfolioPackages = async(req: Request, res: Response) => {
    
    try {
        const portfolioPackage = await PortfolioPackage.findOne();

        /* Check Portfolio Package */
        if(!portfolioPackage) {
            return res.status(404).json({msg: 'Portfolio package not found'});
        }

        const response = await PortfolioPackage.findAll({
            attributes:[
                'Package_ID',
                'PackageName',
                'LastUpdate',
                'RiskSpectrum',
                'InvestmentType',
                'ReturnRate'
            ]
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const getPortfolioPackageById = async(req: Request, res: Response) => {
    
    try {
        const portfolioPackage = await PortfolioPackage.findOne({
            where: {
                Package_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!portfolioPackage) {
            return res.status(404).json({msg: `Portfolio Package id: ${req.params.id} not found!`});
        }

        const response = await PortfolioPackage.findAll({
            attributes:[
                'PackageName',
                'LastUpdate',
                'RiskSpectrum',
                'InvestmentType',
                'ReturnRate'
            ],
            where: {
                Package_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }

}

export const editPortfolioPackageInfo = async(req: Request, res: Response) => {
    
    try {
        const portfolioPackage = await PortfolioPackage.findOne({
            where: {
                Package_ID: req.params.id
            }
        });

        /* Check Package */
        if(!portfolioPackage) {
            return res.status(404).json({msg: `Portfolio Package with id: ${req.params.id} not found`});
        }

        const {   
            package_name,
            last_update,
            risk_spectrum,
            investment_type,
            return_rate,
        } = req.body;

        await PortfolioPackage.update({
            PackageName: package_name,
            LastUpdate: last_update,
            RiskSpectrum: risk_spectrum,
            InvestmentType: investment_type,
            ReturnRate: return_rate,
        }, {
            where:{
                Package_ID: req.params.id
            }
        });
        res.status(200).json({msg: `Portfolio Package id: ${req.params.id} Updated Successfully`})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Portfolio Package Item */
export const getAllPortfolioPackageAllocationByPackageId = async(req: Request, res: Response) => {
    try {
        const packageItem = await PackageItem.findOne({
            where: {
                Package_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!packageItem) {
            return res.status(404).json({msg: `Portfolio package with id ${req.params.id} not found`});
        }

        const response = await PackageItem.findAll({
            attributes:[
                'Package_ID',
                'Fund_ID',
                'AllocationRatio'
            ],
            where: {
                Package_ID: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

// Change mutual fund allocation in portfolio package
export const editPortfolioPackageAllocationByPackageId = async(req: Request, res: Response) => {
    try {
        // Find PackageItem with Portfolio Package ID
        const packageItem = await PackageItem.findOne({
            where: {
                Package_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!packageItem) {
            return res.status(404).json({msg: `Package item with Portfolio id ${req.params.id} not found`});
        }

        const {   
            allocation_ratio
        } = req.body;

        await PackageItem.update({
            AllocationRatio: allocation_ratio
        }, {
            where:{
                Package_ID: req.params.id
            }
        });
        res.status(200).json({msg: `Package Item Updated Successfully with Portfolio Package id: ${req.params.id}, `})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Add Mutual Fund */
export const addMutualFundToPackage = async(req: Request, res: Response) => {
    try {
        const 
        {   
            package_id,
            fund_id,
            allocation_ratio,
        } = req.body;

        const portfolioPackage = await PortfolioPackage.findByPk(package_id);
        if (!portfolioPackage) {
            return res.status(404).json({msg: `Portfolio Package with id ${package_id} not found`});
        }

        const mutualFund = await MutualFund.findByPk(fund_id);
        if (!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund with id ${fund_id} not found`});
        }
        
        await PackageItem.create({
            Package_ID: package_id,
            Fund_ID: fund_id,
            AllocationRatio: allocation_ratio
        });
        res.status(201).json({msg: "Successful add mutual fund and allocation to portfolio package"});
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}
/* Calculate Return Rate from Mutual Fund Allocation Ratio */
export const calculatePortfolioPackageReturns = async(req: Request, res: Response) => {
    try { 
        const portfolioPackage = await PortfolioPackage.findOne({
            where: {
                Package_ID: req.params.id
            }
        });
        if(!portfolioPackage) {
            return res.status(404).json({msg: `Portfolio Package with id ${req.params.id} not found`});
        }

        const packageItem = await PackageItem.findAll({
            attributes:[
                'Package_ID',
                'Fund_ID',
                'AllocationRatio'
            ],
            where: {
                Package_ID: req.params.id
            }
        });

        let totalMutualFundReturn = 0;
 
        for (const item of packageItem) {
            const FundId = item.Fund_ID;
            //Check Mutual Fund
            const mutualFund = await MutualFund.findByPk(FundId);
            if(!mutualFund) {
                return res.status(404).json({msg: `Mutual Fund with id ${FundId} not found`});
            } else {
                const mutualFundAllocation = item.AllocationRatio;
                let mutualFundReturns = 0;
                // Calculate mutual fund returns from the oldest available returns
                if (mutualFund.fiveYearReturns) {
                    mutualFundReturns = mutualFund.fiveYearReturns;
                } else if (mutualFund.threeYearReturns) {
                    mutualFundReturns = mutualFund.threeYearReturns;
                } else if (mutualFund.oneYearReturns) {
                    mutualFundReturns = mutualFund.oneYearReturns;
                } else {
                    mutualFundReturns = mutualFund.YTDReturns;
                }
                totalMutualFundReturn += (mutualFundReturns / 100) * mutualFundAllocation;
            }
        }

        // update portfolio package return rate
        await PortfolioPackage.update({
            ReturnRate: totalMutualFundReturn
        }, {
            where:{
                Package_ID: req.params.id
            }
        });
        res.status(201).json({msg: "Successful calculate portfolio package returns"});
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}