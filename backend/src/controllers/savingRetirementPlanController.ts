import SavingRetirementPlan from "../models/savingRetirementPlanModel";
import RetirementTransaction from "../models/retirementTransactionModel";
import { Request, Response } from "express";

export const createRetirementPlan = async(req: Request, res: Response) => {
    const 
    {   
        plan_name,
        target_amount,
        time_period,
        initial_saving,
        monthly_saving,
        start_date,
        last_update,
        total_balance,
        time_remaining,
        date_of_birth,
        interest_rate,
        monthly_expense,
        age_to_retire,
        age_to_live,
        inflation_rate,
        additional_investment,
        progression
    } = req.body;
    try {

        await SavingRetirementPlan.create({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            InitialSaving: initial_saving,
            MonthlySaving: monthly_saving,
            StartDate: start_date,
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            DateOfBirth: date_of_birth,
            InterestRate: interest_rate,
            MonthlyExpense: monthly_expense,
            AgeToRetire: age_to_retire,
            AgeToLive: age_to_live,
            InflationRate: inflation_rate,
            AdditionalInvestment: additional_investment,
            Progression: progression,
        });
        res.status(201).json({msg: "Successful Create new retirement plan "});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getRetirementyPlan = async(req: Request, res: Response) => {
}

export const getRetirementPlanById = async(req: Request, res: Response) => {
    const retirementPlan = await SavingRetirementPlan.findOne({
        where: {
            Retirement_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!retirementPlan) {
        return res.status(404).json({msg: "Retirement plan not found"});
    }
    
    try {
        const response = await SavingRetirementPlan.findOne({
            attributes:[
                'PlanName',
                'TargetAmount',
                'TimePeriod',
                'InitialSaving',
                'MonthlySaving',
                'StartDate',
                'LastUpdate',
                'TotalBalance',
                'TimeRemaining',
                'DateOfBirth',
                'InterestRate',
                'MonthlyExpense',
                'AgeToRetire',
                'AgeToLive',
                'InflationRate',
                'AdditionalInvestment',
                'Progression'
            ],
            where: {
                Retirement_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const getRetirementPlanTransaction = async(req: Request, res: Response) => {
}

export const editRetirementPlan = async(req: Request, res: Response) => {
    const emergencyPlan = await SavingRetirementPlan.findOne({
        where: {
            Retirement_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
        return res.status(404).json({msg: "Retirement plan not found"});
    }

    const {   
        plan_name,
        target_amount,
        time_period,
        initial_saving,
        monthly_saving,
        last_update,
        total_balance,
        time_remaining,
        date_of_birth,
        interest_rate,
        monthly_expense,
        age_to_retire,
        age_to_live,
        inflation_rate,
        additional_investment,
        progression
    } = req.body;

    try {
        await SavingRetirementPlan.update({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            InitialSaving: initial_saving,
            MonthlySaving: monthly_saving,
            // LastUpdate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            DateOfBirth: date_of_birth,
            InterestRate: interest_rate,
            MonthlyExpense: monthly_expense,
            AgeToRetire: age_to_retire,
            AgeToLive: age_to_live,
            InflationRate: inflation_rate,
            AdditionalInvestment: additional_investment,
            Progression: progression,
        }, {
            where:{
                Retirement_ID: req.params.id
            }
        });
        res.status(200).json({msg: "Retirement Plan Updated Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteRetirementPlan = async(req: Request, res: Response) => {
    const user = await SavingRetirementPlan.findOne({
        where: {
            Retirement_ID: req.params.id
        }
    });

    /* Check User */
    if(!user) {
        return res.status(404).json({msg: "Retirement Plan not found"});
    }

    try {
        await SavingRetirementPlan.destroy({
            where: {
                Retirement_ID: req.params.id
            }
        })
        res.status(200).json({msg: "Retirement Plan Deleted Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Calculation */
export const calculateRetirementFund = async(req: Request, res: Response) => {
}

/* Transaction */
export const addTransactionToRetirementPlan = async(req: Request, res: Response) => {

    try {
        const { transaction_date, amount, type } = req.body;

        /* Check Plan */
        const retirementPlan = await SavingRetirementPlan.findOne({
            where: {
                Retirement_ID: req.params.id
            }
        })
        if(!retirementPlan) {
            return res.status(404).json({msg: "Retirement Plan not found"});
        }

        /* Update the retirement plan's total balance and progression */
        let totalBalance: number = 0, progression: number = 0;
        if (type === 'deposit') {
            totalBalance = retirementPlan.TotalBalance + parseFloat(amount);
            progression = (totalBalance/retirementPlan.TargetAmount) * 100;
            await SavingRetirementPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Retirement_ID: req.params.id
                } 
            })    
        }
        else if (type === 'withdrawal') {
            totalBalance = retirementPlan.TotalBalance - parseFloat(amount);
            progression = (totalBalance/retirementPlan.TargetAmount) * 100;
            await SavingRetirementPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Retirement_ID: req.params.id
                } 
            })    
        }
        else {
            return res.status(404).json({msg: `Transaction type error with ${type}`});
        }
        
        /* Create Retirement Transaction */ 
        await RetirementTransaction.create({
            TransactionDate: transaction_date,
            Amount: amount,
            Type: type,
            Retirement_ID: retirementPlan.Retirement_ID
        });
        /* !! Must update LastUpdate and TimeRemaining */

        res.status(201).json({msg: "Retirement transaction history is recorded"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

/* get all retirement transactions history */
export const getAllRetirementTransactionsByRetirementId = async(req: Request, res: Response) => {

    try {

        /* Check Plan: User must create the plan first */
        const retirementPlan = await SavingRetirementPlan.findOne({
            where: {
                Retirement_ID: req.params.id
            }
        });
        if(!retirementPlan) {
            return res.status(404).json({msg: "Retirement plan not found! Pls create the plan first"});
        }

        /* Check Retirement Transaction: */
        const retirementTransaction = await RetirementTransaction.findAll({
            where: {
                Retirement_ID: req.params.id
            }
        });
        if(!retirementTransaction) {
            return res.status(404).json({msg: "Retirement transaction not found"});
        }

        /* Find Retirement Transaction by EmergencyID */
        const response = await RetirementTransaction.findAll({
            attributes:[
                'TransactionDate',
                'Amount',
                'Type'
            ],
            where: {
                Retirement_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}


export const getRetirementTransactionById = async(req: Request, res: Response) => {

    try {

        /* Check Retirement Transaction */
        const retirementTransaction = await RetirementTransaction.findOne({
            where: {
                Transaction_ID: req.params.id
            }
        });
        if(!retirementTransaction) {
            return res.status(404).json({msg: "Retirement transaction not found"});
        }
    
        const response = await RetirementTransaction.findOne({
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