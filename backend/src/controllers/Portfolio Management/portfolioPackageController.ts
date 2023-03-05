import PortfolioPackage from "../../models/Portfolio Management/portfolioPackageModel";
import PackageItem from "../../models/Portfolio Management/PackageItem";
import MutualFund from "../../models/Portfolio Management/mutualFundModel";
import { Request, Response } from "express";

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
    const portfolioPackage = await PortfolioPackage.findOne({
        where: {
            Package_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!portfolioPackage) {
        return res.status(404).json({msg: `Portfolio Package id: ${req.params.id} not found!`});
    }
    
    try {
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