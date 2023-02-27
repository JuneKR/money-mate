import SavingEmergencyPlan from "../models/savingEmergencyPlanModel";
import EmergencyTransaction from "../models/emergencyTransactionModel";
import { Request, Response } from "express";

export const createEmergencyPlan = async(req: Request, res: Response) => {
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
        interest_rate,
        monthly_expense,
        progression
    } = req.body;
    try {

        await SavingEmergencyPlan.create({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            InitialSaving: initial_saving,
            MonthlySaving: monthly_saving,
            StartDate: start_date,
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            InterestRate: interest_rate,
            MonthlyExpense: monthly_expense,
            Progression: progression,
        });
        res.status(201).json({msg: "Successful Create new emergency plan "});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getEmergencyPlan = async(req: Request, res: Response) => {
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
                'InitialSaving',
                'MonthlySaving',
                'StartDate',
                'LastUpdate',
                'TotalBalance',
                'TimeRemaining',
                'InterestRate',
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
        initial_saving,
        monthly_saving,
        last_update,
        total_balance,
        time_remaining,
        interest_rate,
        monthly_expense,
        progression
    } = req.body;

    try {
        await SavingEmergencyPlan.update({
            PlanName: plan_name,
            TargetAmount: target_amount,
            TimePeriod: time_period,
            InitialSaving: initial_saving,
            MonthlySaving: monthly_saving,
            // LastUpdate: new Date().toISOString().slice(0, 19).replace('T', ' '),
            LastUpdate: last_update,
            TotalBalance: total_balance,
            TimeRemaining: time_remaining,
            InterestRate: interest_rate,
            MonthlyExpense: monthly_expense,
            Progression: progression,
        }, {
            where:{
                // id: user.id
                Emergency_ID: req.params.id
            }
        });
        res.status(200).json({msg: "Emergency Plan Updated Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteEmergencyPlan = async(req: Request, res: Response) => {
    const user = await SavingEmergencyPlan.findOne({
        where: {
            Emergency_ID: req.params.id
        }
    });

    /* Check User */
    if(!user) {
        return res.status(404).json({msg: "Emergency Plan not found"});
    }

    try {
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

/* Calculation */
export const calculateEmergencyFund = async(req: Request, res: Response) => {
}

/* Transaction */
export const createRecordTransaction = async(req: Request, res: Response) => {
    /* Check Plan 
    const emergencyPlan = await SavingEmergencyPlan.findOne({
        where: {
            Emergency_ID: req.params.id
        }
    });
    
    if(!emergencyPlan) {
        return res.status(404).json({msg: "Emergency plan not found"});
    }
    */

    const 
    { transaction_date, amount, type
    } = req.body;

    try {
        await EmergencyTransaction.create({
            TransactionDate: transaction_date,
            Amount: amount,
            Type: type
        });
        res.status(201).json({msg: "Emergency transaction history is recorded"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getEmergencyPlanTransaction = async(req: Request, res: Response) => {
}

export const getEmergencyPlanTransactionById = async(req: Request, res: Response) => {
    // record transaction must have the emergency plan first
    const emergencyPlan = await SavingEmergencyPlan.findOne({
        where: {
            Emergency_ID: req.params.id
        }
    });

    /* Check Plan: User must create the plan first */
    if(!emergencyPlan) {
        return res.status(404).json({msg: "Emergency plan not found! Pls create the plan first"});
    }

    const emergencyTransaction = await EmergencyTransaction.findOne({
        where: {
            Transaction_ID: req.params.id
        }
    });

    /* Check Transaction */
    if(!emergencyTransaction) {
        return res.status(404).json({msg: "Emergency transaction not found"});
    }
    
    try {
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