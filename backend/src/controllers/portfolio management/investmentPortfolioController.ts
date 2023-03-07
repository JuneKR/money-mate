import InvestmentPortfolio from "../../models/portfolio management/investment portfolio/investmentPortfolioModel";
import PortfolioItem from "../../models/portfolio management/investment portfolio/portfolioItemModel";
import MutualFund from "../../models/portfolio management/mutualFundModel";
import { Request, Response } from "express";


/* Investment Portfolio */
export const createInvestmentPortfolio = async(req: Request, res: Response) => {
    const 
    {   
        portfolio_name,
        total_value,
        last_update,
        start_date,
        risk_level,
        estimated_return_rate,
        roi,
        user_id,
        package_id
    } = req.body;
    try {

        await InvestmentPortfolio.create({
            PortfolioName: portfolio_name,
            TotalValue:total_value,
            LastUpdate: last_update,
            StartDate: start_date,
            RiskLevel: risk_level,
            EstimatedReturnRate: estimated_return_rate,
            ROI: roi,
            User_ID: user_id,
            Package_ID: package_id,
        });
        res.status(201).json({msg: "Successful Create new investment portfolio"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getAllInvestmentPortfolioByUserId = async(req: Request, res: Response) => {
    
    try {
        const investmentPortfolio = await InvestmentPortfolio.findOne();

        /* Check Plan */
        if(!investmentPortfolio) {
            return res.status(404).json({msg: 'Invesment portfolio not found'});
        }

        const response = await InvestmentPortfolio.findAll({
            attributes:[
                'PortfolioName',
                'TotalValue:total_value',
                'LastUpdate',
                'StartDate',
                'RiskLevel',
                'EstimatedReturnRate',
                'ROI',
                'Package_ID',
            ],
            where: {
                User_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const getInvestmentPortfolioById = async(req: Request, res: Response) => {
    
    try {
        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!investmentPortfolio) {
            return res.status(404).json({msg: `Investment portfolio id: ${req.params.id} not found!`});
        }

        const response = await InvestmentPortfolio.findAll({
            attributes:[
                'PortfolioName',
                'TotalValue',
                'LastUpdate',
                'StartDate',
                'RiskLevel',
                'EstimatedReturnRate',
                'ROI',
                'Package_ID'
            ],
            where: {
                Portfolio_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }

}

export const editInvestmentPortfolio = async(req: Request, res: Response) => {
    
    try {
        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });

        /* Check User */
        if(!investmentPortfolio) {
            return res.status(404).json({msg: `Investment portfolio with id: ${req.params.id} not found`});
        }

        const {   
            portfolio_name,
            total_value,
            last_update,
            start_date,
            risk_level,
            estimated_return_rate,
            roi,
            package_id
        } = req.body;

        await InvestmentPortfolio.update({
            PortfolioName: portfolio_name,
            TotalValue:total_value,
            LastUpdate: last_update,
            StartDate: start_date,
            RiskLevel: risk_level,
            EstimatedReturnRate: estimated_return_rate,
            ROI: roi,
            Package_ID: package_id,
        }, {
            where:{
                Portfolio_ID: req.params.id
            }
        });
        res.status(200).json({msg: `Investment portfolio id: ${req.params.id} Updated Successfully`})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteInvestmentPortfolio = async(req: Request, res: Response) => {
    
    try {

        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });

        if(!investmentPortfolio) {
            return res.status(404).json({msg: "Investment portfolio not found"});
        }

        await InvestmentPortfolio.destroy({
            where: {
                Portfolio_ID: req.params.id
            }
        })
        res.status(200).json({msg: "Investment portfolio Deleted Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Portfolio Item */
export const getInvestmentPortfolioAllocationByPortfolioId = async(req: Request, res: Response) => {
    try {
        const portfolioItem = await PortfolioItem.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });

        if(!portfolioItem) {
            return res.status(404).json({msg: `Portfolio item with portfolio id ${req.params.id} not found`});
        }

        const response = await InvestmentPortfolio.findAll({
            attributes:[
                'Portfolio_ID',
                'Fund_ID',
                'AllocationRatio'
            ],
            where: {
                Portfolio_ID: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const editInvestmentPortfolioAllocationByPortfolioId = async(req: Request, res: Response) => {
    try {
        const portfolioItem = await PortfolioItem.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });

        /* Check Plan */
        if(!portfolioItem) {
            return res.status(404).json({msg: `Portfolio item with portfolio id ${req.params.id} not found`});
        }

        const {   
            allocation_ratio
        } = req.body;

        await PortfolioItem.update({
            AllocationRatio: allocation_ratio
        }, {
            where:{
                Portfolio_ID: req.params.id
            }
        });
        res.status(200).json({msg: `Portfolio Item Updated Successfully with Portfolio id: ${req.params.id}`})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Should Have Mutual Fund? */

/* Calculator Funciton */
export const calculateInvestmentROI = async(req: Request, res: Response) => {
}