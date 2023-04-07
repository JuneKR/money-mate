import SavingEmergencyPlan from "../models/savingEmergencyPlanModel";
import EmergencyTransaction from "../models/emergencyTransactionModel";
import { Request, Response } from "express";

export const createEmergencyPlan = async(req: Request, res: Response) => {
    const 
    {   
        plan_name,
        target_amount,
        time_period,
        monthly_saving,
        start_date,
        last_update,
        total_balance,
        time_remaining,
        monthly_expense,
        progression,
        user_id,
    } = req.body;
    try {
        const currentProgression = (total_balance/target_amount) * 100
        await SavingEmergencyPlan.create({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            MonthlySaving: monthly_saving,
            StartDate: start_date,
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            MonthlyExpense: monthly_expense,
            Progression: currentProgression | progression,
            User_ID: user_id,
        });
        res.status(201).json({msg: "Successful Create new emergency plan"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getEmergencyPlan = async(req: Request, res: Response) => {
}

export const getEmergencyPlanByUserId = async(req: Request, res: Response) => {
    const emergencyPlan = await SavingEmergencyPlan.findOne({
        where: {
            User_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
        return res.status(404).json({msg: `Emergency plan not found by user id: ${req.params.id}`});
    }
    
    try {
        const response = await SavingEmergencyPlan.findOne({
            attributes:[
                'Emergency_ID',
                'PlanName',
                'TargetAmount',
                'TimePeriod',
                'MonthlySaving',
                'StartDate',
                'LastUpdate',
                'TotalBalance',
                'TimeRemaining',
                'MonthlyExpense',
                'Progression'
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

export const getEmergencyPlanById = async(req: Request, res: Response) => {
    const emergencyPlan = await SavingEmergencyPlan.findOne({
        where: {
            Emergency_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
        return res.status(404).json({msg: "Emergency plan not found"});
    }
    
    try {
        const response = await SavingEmergencyPlan.findOne({
            attributes:[
                'PlanName',
                'TargetAmount',
                'TimePeriod',
                'MonthlySaving',
                'StartDate',
                'LastUpdate',
                'TotalBalance',
                'TimeRemaining',
                'MonthlyExpense',
                'Progression'
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

export const editEmergencyPlan = async(req: Request, res: Response) => {
    const emergencyPlan = await SavingEmergencyPlan.findOne({
        where: {
            Emergency_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
        return res.status(404).json({msg: "Emergency plan not found"});
    }

    const {   
        plan_name,
        target_amount,
        time_period,
        monthly_saving,
        last_update,
        total_balance,
        time_remaining,
        monthly_expense,
        progression
    } = req.body;

    try {
        await SavingEmergencyPlan.update({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            MonthlySaving: monthly_saving,
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            MonthlyExpense: monthly_expense,
            Progression: progression,
        }, {
            where:{
                Emergency_ID: req.params.id
            }
        });
        res.status(200).json({msg: "Emergency Plan Updated Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteEmergencyPlan = async(req: Request, res: Response) => {

    try {
        /* Check Plan */
        const emergencyPlan = await SavingEmergencyPlan.findOne({
            where: {
                Emergency_ID: req.params.id
            }
        });
        if(!emergencyPlan) {
            return res.status(404).json({msg: "Emergency Plan not found"});
        }

        await SavingEmergencyPlan.destroy({
            where: {
                Emergency_ID: req.params.id
            }
        })
        res.status(200).json({msg: "Emergency Plan Deleted Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Transaction */
export const addTransactionToEmergencyPlan = async(req: Request, res: Response) => {

    try {
        const { transaction_date, amount, type } = req.body;

        /* Check Plan */
        const emergencyPlan = await SavingEmergencyPlan.findOne({
            where: {
                Emergency_ID: req.params.id
            }
        })
        if(!emergencyPlan) {
            return res.status(404).json({msg: "Emergency Plan not found"});
        }

        /* Update the emergency plan's total balance and progression */
        let totalBalance: number = 0, progression: number = 0;
        if (type === 'deposit') {
            totalBalance = emergencyPlan.TotalBalance + parseFloat(amount);
            progression = (totalBalance/emergencyPlan.TargetAmount) * 100;
            await SavingEmergencyPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Emergency_ID: req.params.id
                } 
            })    
        }
        else if (type === 'withdrawal') {
            totalBalance = emergencyPlan.TotalBalance - parseFloat(amount);
            progression = (totalBalance/emergencyPlan.TargetAmount) * 100;
            await SavingEmergencyPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Emergency_ID: req.params.id
                } 
            })    
        }
        else {
            return res.status(404).json({msg: `Transaction type error with ${type}`});
        }
        
        /* Create Emergency Transaction */ 
        await EmergencyTransaction.create({
            TransactionDate: transaction_date,
            Amount: amount,
            Type: type,
            Emergency_ID: emergencyPlan.Emergency_ID
        });
        /* !! Must update LastUpdate and TimeRemaining */

        res.status(201).json({msg: "Emergency transaction history is recorded"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

/* get all emergency transactions history */
export const getAllEmergencyTransactionsByEmergencyId = async(req: Request, res: Response) => {

    try {

        /* Check Plan: User must create the plan first */
        const emergencyPlan = await SavingEmergencyPlan.findOne({
            where: {
                Emergency_ID: req.params.id
            }
        });
        if(!emergencyPlan) {
            return res.status(404).json({msg: "Emergency plan not found! Pls create the plan first"});
        }

        /* Check Emergency Transaction: */
        const emergencyTransaction = await EmergencyTransaction.findOne({
            where: {
                Emergency_ID: req.params.id
            }
        });
        if(!emergencyTransaction) {
            return res.status(404).json({msg: `Emergency transaction not found with emergency id: ${req.params.id}`});
        }

        /* Find Emergency Transaction by EmergencyID */
        const response = await EmergencyTransaction.findAll({
            attributes:[
                'TransactionDate',
                'Amount',
                'Type'
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


export const getEmergencyTransactionById = async(req: Request, res: Response) => {

    try {

        /* Check Emergency Transaction */
        const emergencyTransaction = await EmergencyTransaction.findOne({
            where: {
                Transaction_ID: req.params.id
            }
        });
        if(!emergencyTransaction) {
            return res.status(404).json({msg: "Emergency transaction not found"});
        }
    
        const response = await EmergencyTransaction.findOne({
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