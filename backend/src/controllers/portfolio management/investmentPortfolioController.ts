import InvestmentPortfolio from "../../models/portfolio management/investment portfolio/investmentPortfolioModel";
import PortfolioItem from "../../models/portfolio management/investment portfolio/portfolioItemModel";
import MutualFund from "../../models/portfolio management/mutualFundModel";
import InvestmentTransaction from "../../models/portfolio management/investmentTransactionModel";
import { Request, Response } from "express";
import SavingEmergencyPlan from "../../models/savingEmergencyPlanModel";
import SavingRetirementPlan from "../../models/savingRetirementPlanModel";
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
        user_id,
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
            User_ID: user_id,
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
        const investmentPortfolio = await InvestmentPortfolio.findAll({
            where: {
                User_ID: req.params.id
            }
        })

        /* Check Investment Portfolio */
        if(!investmentPortfolio) {
            return res.status(404).json({msg: `Investment portfolio id: ${req.params.id} not found!`});
        }

        const response = await InvestmentPortfolio.findAll({
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

        /* Check Investment Portfolio */
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

export const getInvestmentPortfolioByEmergencyId = async(req: Request, res: Response) => {
    
    try {
        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Emergency_ID: req.params.id
            }
        });

        /* Check Investment Portfolio */
        if(!investmentPortfolio) {
            return res.status(404).json({msg: `Investment portfolio with emergency id: ${req.params.id} not found!`});
        }

        const response = await InvestmentPortfolio.findOne({
            attributes:[
                'PortfolioName',
                'TotalValue',
                'LastUpdate',
                'StartDate',
                'RiskSpectrum',
                'ReturnRate',
                'Package_ID',
                'Portfolio_ID'
            ],
            where: {
                Emergency_ID: req.params.id,
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
            user_id,
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
            User_ID: user_id,
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

        const response = await PortfolioItem.findAll({
            attributes:[
                'Portfolio_ID',
                'Fund_ID',
                'PolicyDesc',
                'FundAbbrName',
                'OneYearReturns',
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

/* Add Mutual Fund */
export const addMutualFundToInvestmentPortfolio = async(req: Request, res: Response) => {
    try {
        const 
        {   
            portfolio_id,
            fund_id,
            policy_desc,
            fund_abbr_name,
            one_year_returns,
            allocation_ratio,
        } = req.body;

        const investmentPortfolio = await InvestmentPortfolio.findByPk(portfolio_id);
        if (!investmentPortfolio) {
            return res.status(404).json({msg: `Investment Portfolio with id ${portfolio_id} not found`});
        }

        const mutualFund = await MutualFund.findByPk(fund_id);
        if (!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund with id ${fund_id} not found`});
        }
        
        await PortfolioItem.create({
            Portfolio_ID: portfolio_id,
            Fund_ID: fund_id,
            PolicyDesc: policy_desc,
            FundAbbrName: fund_abbr_name,
            OneYearReturns: one_year_returns,
            AllocationRatio: allocation_ratio
        });
        res.status(201).json({msg: "Successful add mutual fund and allocation to investment portfolio"});
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const addMutualFundsToInvestmentPortfolio = async(req: Request, res: Response) => {
    try {
        const portfolioItems = req.body;
        const portfolioId = portfolioItems[0].Portfolio_ID;

        const investmentPortfolio = await InvestmentPortfolio.findByPk(portfolioId);
        if (!investmentPortfolio) {
            return res.status(404).json({msg: `Investment Portfolio with id ${portfolioId} not found`});
        }

        for (const item of portfolioItems) {
            const mutualFund = await MutualFund.findByPk(item.Fund_ID);
            if (!mutualFund) {
                return res.status(404).json({msg: `Mutual Fund with id ${item.Fund_ID} not found`});
            }

            await PortfolioItem.create({
                Portfolio_ID: item.Portfolio_ID,
                Fund_ID: item.Fund_ID,
                PolicyDesc: item.PolicyDesc,
                FundAbbrName: item.FundAbbrName,
                OneYearReturns: item.OneYearReturns,
                AllocationRatio: item.AllocationRatio
            });
        }
        res.status(201).json({msg: "Successful add mutual fund and allocation to investment portfolio"});
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

/* Investment Transaction */
// Unfinished
export const addInvestmentTransaction = async(req: Request, res: Response) => {

    try {
        // only just the input with plan id is better?
        const { transaction_date, policy_desc, fund_abbr_name, amount, type } = req.body;

        /* Check Investment Portfolio */
        const investmentPortfolio = await InvestmentPortfolio.findOne({
            where: {
                Portfolio_ID: req.params.id
            }
        })
        if(!investmentPortfolio) {
            return res.status(404).json({msg: "Investment Portfolio not found"});
        }

        // Check the saving plan of portfolio
        const allSavingPlanId = await InvestmentPortfolio.findOne({
            attributes:[
                'Emergency_ID',
                'Goal_ID',
                'Retirement_ID'
            ],
            where: {
                Portfolio_ID: req.params.id,
            }
        })
        
        let savingPlan;
        let savingPlanCategory = '';
        let savingPlanId = 0;
        if (!allSavingPlanId?.Emergency_ID && !allSavingPlanId?.Goal_ID && !allSavingPlanId) {
            return res.status(404).json({msg: "Saving plan id not found in an investment portfolio"});
        }
        else if(allSavingPlanId.Emergency_ID) {
            savingPlanCategory = 'Emergency'
            savingPlan = await SavingEmergencyPlan.findOne({
                where: {
                    Emergency_ID: allSavingPlanId.Emergency_ID,
                }
            })
            if(!savingPlan) {
                return res.status(404).json({msg: "Saving plan not found"});
            }

            savingPlanId = savingPlan.Emergency_ID;
        }
        else if(allSavingPlanId.Retirement_ID) {
            savingPlanCategory = 'Retirement'
            savingPlan = await SavingRetirementPlan.findOne({
                where: {
                    Retirement_ID: allSavingPlanId.Retirement_ID,
                }
            })
            if(!savingPlan) {
                return res.status(404).json({msg: "Saving plan not found"});
            }
            
            savingPlanId = savingPlan.Retirement_ID;
        }
        else if(allSavingPlanId.Goal_ID) {
            savingPlanCategory = 'Goal'
            savingPlan = await GoalBasedSavingPlan.findOne({
                where: {
                    Goal_ID: allSavingPlanId.Goal_ID,
                }
            })
            if(!savingPlan) {
                return res.status(404).json({msg: "Saving plan not found"});
            }
            
            savingPlanId = savingPlan.Goal_ID;
        }

        if(!savingPlan) {
            return res.status(404).json({msg: "Saving plan not found"});
        }
        // [/] 1.Check whether it is buy or sell
        // [/] 2.Reduce or Increase (recalculated) total balance of saving plan
        // [/] 2.1 Check what the plan is for reculated (saving plan is not null)
        // [/] 2.2 Check what the plan has enough money to buy 
        // [/] 2.3 update total balance of saving plan
        // [/] 3.recalculated total value of investment portfolio 
        // [/] 3.1 Increase or Decrease total value of investment portfolio
        // [] 4.adjust the allocation ratio of portfolio item
        // [/] 5.add new transaction history
        let totalValue: number = investmentPortfolio.TotalValue;
        let totalBalance: number = savingPlan.TotalBalance;
        if (type === 'buy') {   
            // Check whether plan has enough total balance and update total balance of each plan
            if (savingPlan.TotalBalance >= amount) {
                totalBalance -= parseFloat(amount);
                totalValue += parseFloat(amount);
                if(savingPlanCategory === 'Emergency') {
                    await SavingEmergencyPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Emergency_ID: savingPlanId
                        } 
                    })
                }
                else if(savingPlanCategory === 'Retirement') {
                    await SavingRetirementPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Retirement_ID: savingPlanId
                        } 
                    })
                }
                else if(savingPlanCategory === 'Retirement') {
                    await GoalBasedSavingPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Goal_ID: savingPlanId
                        } 
                    })
                }
            }   
            else {
                return res.status(404).json({msg: `Total Balance of Saving plan name ${savingPlan.PlanName} is not enough to buy`});
            } 
        }
        else if (type === 'sell') {
            // Check whether plan has enough total balance and update total balance of each plan
            if (savingPlan.TotalBalance >= amount) {
                totalBalance += parseFloat(amount);
                totalValue -= parseFloat(amount);
                if(savingPlanCategory === 'Emergency') {
                    await SavingEmergencyPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Emergency_ID: savingPlanId
                        } 
                    })
                }
                else if(savingPlanCategory === 'Retirement') {
                    await SavingRetirementPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Retirement_ID: savingPlanId
                        } 
                    })
                }
                else if(savingPlanCategory === 'Retirement') {
                    await GoalBasedSavingPlan.update({
                        TotalBalance: totalBalance
                    }, 
                    {
                        where: {
                            Goal_ID: savingPlanId
                        } 
                    })
                }
            }    
            else {
                return res.status(404).json({msg: `Total Balance of Saving plan name ${savingPlan.PlanName} is not enough`});
            }

            // Update Total Value of Investment Portfolio
            await InvestmentPortfolio.update({
                TotalValue: totalValue
            }, {
                where: {
                    Portfolio_ID: req.params.id
                } 
            })  

            // Update Portfolio Allocation
        }
        else {
            return res.status(404).json({msg: `Transaction type error with ${type}`});
        }
        
        /* Add Investment Transaction */ 
        await InvestmentTransaction.create({
            TransactionDate: transaction_date,
            PolicyDesc: policy_desc,
            FundAbbrName: fund_abbr_name,
            Amount: amount,
            Type: type,
            Portfolio_ID: investmentPortfolio.Portfolio_ID
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
                'PolicyDesc',
                'FundAbbrName',
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
                'PolicyDesc',
                'FundAbbrName',
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