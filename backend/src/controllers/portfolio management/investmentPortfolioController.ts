import InvestmentPortfolio from "../../models/portfolio management/investment portfolio/investmentPortfolioModel";
import PortfolioItem from "../../models/portfolio management/investment portfolio/portfolioItemModel";
import MutualFund from "../../models/portfolio management/mutualFundModel";
import InvestmentTransaction from "../../models/portfolio management/investmentTransactionModel";
import { Request, Response } from "express";
import SavingRetirementPlan from "../../models/savingRetirementPlanModel";
import SavingEmergencyPlan from "../../models/savingEmergencyPlanModel";
import GoalBasedSavingPlan from "../../models/goalBasedSavingPlanModel";


/* Investment Portfolio */
export const createInvestmentPortfolio = async(req: Request, res: Response) => {
    const 
    {   
        portfolio_name,
        total_value,
        last_update,
        start_date,
        risk_spectrum,
        return_rate,
        // user_id,
        package_id,
        emergency_id,
        goal_id,
        retirement_id,
    } = req.body;
    try {

        await InvestmentPortfolio.create({
            PortfolioName: portfolio_name,
            TotalValue:total_value,
            LastUpdate: last_update,
            StartDate: start_date,
            RiskSpectrum: risk_spectrum,
            ReturnRate: return_rate,
            // User_ID: user_id,
            Package_ID: package_id,
            Emergency_ID: emergency_id,
            Goal_ID: goal_id,
            Retirement_ID: retirement_id
        });
        res.status(201).json({msg: "Successful Create new investment portfolio"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getAllInvestmentPortfolioByUserId = async(req: Request, res: Response) => {
    
    try {
        const savingRetirement = await SavingRetirementPlan.findOne({
            where: {
                User_ID: req.params.id,
            }
        })

        const savingEmergency = await SavingEmergencyPlan.findOne({
            where: {
                User_ID: req.params.id,
            }
        })

        const goalBasedSaving = await GoalBasedSavingPlan.findOne({
            where: {
                User_ID: req.params.id,
            }
        })

        /* Check Saving Plan */
        if(!savingRetirement && !savingEmergency && !goalBasedSaving) {
            return res.status(404).json({msg: 'User must create the saving plan first!'});
        }

        const retirementPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Retirement_ID: savingRetirement?.Retirement_ID,
            }
        })

        const emergencyPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Emergency_ID: savingEmergency?.Emergency_ID,
            }
        })

        const goalBasedPortfolio = await InvestmentPortfolio.findAll({
            where: {
                Goal_ID: goalBasedSaving?.Goal_ID,
            }
        })

        if(!retirementPortfolio && !emergencyPortfolio && !goalBasedPortfolio) {
            return res.status(404).json({msg: 'Investment portfolio not found'});
        }

        const response = [
            retirementPortfolio,
            emergencyPortfolio,
            goalBasedPortfolio
        ]
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
                'RiskSpectrum',
                'ReturnRate',
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
            risk_spectrum,
            return_rate,
            // user_id,
            package_id,
            emergency_id,
            goal_id,
            retirement_id,
        } = req.body;

        await InvestmentPortfolio.update({
            PortfolioName: portfolio_name,
            TotalValue:total_value,
            LastUpdate: last_update,
            StartDate: start_date,
            RiskSpectrum: risk_spectrum,
            ReturnRate: return_rate,
            // User_ID: user_id,
            Package_ID: package_id,
            Emergency_ID: emergency_id,
            Goal_ID: goal_id,
            Retirement_ID: retirement_id
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

/* Investment Transaction */
export const addInvestmentTransaction = async(req: Request, res: Response) => {

    try {
        const { transaction_date, amount, type } = req.body;

        /* Check Investment Portfolio */
        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        })
        if(!investmentPortfolio) {
            return res.status(404).json({msg: "Investment Portfolio not found"});
        }

        /* recalculated of investment portfolio total value */
        let totalValue: number = 0;
        if (type === 'deposit') {
            /*
                ...
            */
            await InvestmentPortfolio.update({
                TotalValue: totalValue
            }, {
                where: {
                    Portfolio_ID: req.params.id
                } 
            })    
        }
        else if (type === 'withdrawal') {
            /*
                ...
            */
            await InvestmentPortfolio.update({
                TotalValue: totalValue
            }, {
                where: {
                    Portfolio_ID: req.params.id
                } 
            })  
        }
        else {
            return res.status(404).json({msg: `Transaction type error with ${type}`});
        }
        
        /* Create Investment Transaction */ 
        await InvestmentTransaction.create({
            TransactionDate: transaction_date,
            Amount: amount,
            Type: type,
            Portfolio_ID: investmentPortfolio.Package_ID
        });

        res.status(201).json({msg: "Investment transaction history is recorded"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

/* get all investment transactions history */
export const getAllInvestmentTransactionsByPortfolioId = async(req: Request, res: Response) => {

    try {

        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });
        if(!investmentPortfolio) {
            return res.status(404).json({msg: "Investment Portfolio not found! Pls create the investment portfolio first"});
        }

        /* Check Investment Transaction: */
        const investmentTransaction = await InvestmentTransaction.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        });
        if(!investmentTransaction) {
            return res.status(404).json({msg: `Investment transaction not found with portfolio id: ${req.params.id}`});
        }

        /* Find Investment Transaction by Portfolio ID */
        const response = await InvestmentTransaction.findAll({
            attributes:[
                'TransactionDate',
                'Amount',
                'Type'
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

export const getInvestmentTransactionById = async(req: Request, res: Response) => {

    try {

        /* Check Investment Transaction */
        const investmentTransaction = await InvestmentTransaction.findOne({
            where: {
                Transaction_ID: req.params.id
            }
        });
        if(!investmentTransaction) {
            return res.status(404).json({msg: "Investment transaction not found"});
        }
    
        const response = await InvestmentTransaction.findOne({
            attributes:[
                'TransactionDate',
                'Amount',
                'Type'
            ],
            where: {
                Transaction_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}