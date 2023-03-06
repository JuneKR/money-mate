import PortfolioPackage from "../../models/Portfolio Management/portfolioPackageModel";
import PackageItem from "../../models/Portfolio Management/PackageItem";
import MutualFund from "../../models/Portfolio Management/mutualFundModel";
import { Request, Response } from "express";


/* Portfolio Package */
export const getAllPortfolioPackages = async(req: Request, res: Response) => {
    
    try {
        const portfolioPackage = await PortfolioPackage.findOne();

        /* Check Plan */
        if(!portfolioPackage) {
            return res.status(404).json({msg: 'Portfolio package not found'});
        }

        const response = await PortfolioPackage.findAll({
            attributes:[
                'Package_ID',
                'PackageName',
                'LastUpdate',
                'RiskLevel',
                'InvestmentType',
                'EstimatedReturnRate'
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
                'RiskLevel',
                'InvestmentType',
                'EstimatedReturnRate'
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

        /* Check User */
        if(!portfolioPackage) {
            return res.status(404).json({msg: `Portfolio Package with id: ${req.params.id} not found`});
        }

        const {   
            package_name,
            last_update,
            risk_level,
            investment_type,
            estimated_return_rate,
        } = req.body;

        await PortfolioPackage.update({
            Package_ID: package_name,
            PackageName: last_update,
            LastUpdate: last_update,
            RiskLevel: risk_level,
            InvestmentType: investment_type,
            EstimatedReturnRate: estimated_return_rate
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

export const editPortfolioPackageAllocationByPackageId = async(req: Request, res: Response) => {
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

/* Mutual Fund */
export const getMutualFundByFundId = async(req: Request, res: Response) => {

    try {
        const mutualFund = await MutualFund.findOne({
            where: {
                Fund_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund id: ${req.params.id} not found!`});
        }

        const response = await MutualFund.findAll({
            attributes:[
                'FundName',
                'FundSymbol',
                'FundType',
                'LastUpdate',
                'CostBasis',
                'Nav',
                'ReturnRate',
                'ExpenseRatio',
                'Description',
            ],
            where: {
                Fund_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }

}

export const getAllMutualFundByPackageId = async(req: Request, res: Response) => {
    try {
        const mutualFund = await MutualFund.findOne({
            where: {
                Fund_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund id: ${req.params.id} not found!`});
        }

        const response = await PackageItem.findAll({
            attributes:[
                'FundName',
                'FundSymbol',
                'FundType',
                'LastUpdate',
                'CostBasis',
                'Nav',
                'ReturnRate',
                'ExpenseRatio',
                'Description',
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

export const editMutualFundInfo = async(req: Request, res: Response) => {

    try {
        const mutualFund = await MutualFund.findOne({
            where: {
                Fund_ID: req.params.id
            }
        });

        /* Check User */
        if(!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund id: ${req.params.id} not found`});
        }

        const {   
            fund_name,
            fund_symbol,
            fund_type,
            last_update,
            cost_basis,
            nav,
            return_rate,
            expense_ratio,
            description
        } = req.body;

        await MutualFund.update({
            FundName: fund_name,
            FundSymbol: fund_symbol,
            FundType: fund_type,
            LastUpdate: last_update,
            CostBasis: cost_basis,
            Nav: nav,
            ReturnRate: return_rate,
            ExpenseRatio: expense_ratio,
            Description: description,
        }, {
            where:{
                Fund_ID: req.params.id
            }
        });
        res.status(200).json({msg: `Mutual Fund id: ${req.params.id} Updated Successfully`})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }

}
