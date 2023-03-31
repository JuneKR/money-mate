import GoalBasedSavingPlan from "../models/goalBasedSavingPlanModel";
import GoalBasedTransaction from "../models/goalBasedTransactionModel";
import { Request, Response } from "express";

export const createGoalBasedPlan = async(req: Request, res: Response) => {
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
        progression,
        user_id,
    } = req.body;
    try {

        await GoalBasedSavingPlan.create({
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
            Progression: progression,
            User_ID: user_id,
        });
        res.status(201).json({msg: "Successful Create new goal-based plan "});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getAllGoalBasedPlanByUserId = async(req: Request, res: Response) => {

    try {
        const goalBasedPlan = await GoalBasedSavingPlan.findOne({
            where: {
                User_ID: req.params.id
            }
        });
    
        /* Check Plan */
        if(!goalBasedPlan) {
            return res.status(404).json({msg: `Goal-Based plan not found by user id: ${req.params.id}`});
        }

        const response = await GoalBasedSavingPlan.findAll({
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

export const getGoalBasedPlanById = async(req: Request, res: Response) => {
    const goalBasedPlan = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!goalBasedPlan) {
        return res.status(404).json({msg: "Goal-Based plan not found"});
    }
    
    try {
        const response = await GoalBasedSavingPlan.findOne({
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
                'Progression'
            ],
            where: {
                Goal_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const editGoalBasedPlan = async(req: Request, res: Response) => {
    const goalBasedPlan = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!goalBasedPlan) {
        return res.status(404).json({msg: "Goal-Based plan not found"});
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
        progression
    } = req.body;

    try {
        await GoalBasedSavingPlan.update({
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
            Progression: progression,
        }, {
            where:{
                Goal_ID: req.params.id
            }
        });
        res.status(200).json({msg: "Goal-Based Plan Updated Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteGoalBasedPlan = async(req: Request, res: Response) => {
    const goalBasedPlan = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check User */
    if(!goalBasedPlan) {
        return res.status(404).json({msg: "Goal-Based Plan not found"});
    }

    try {
        await GoalBasedSavingPlan.destroy({
            where: {
                Goal_ID: req.params.id
            }
        })
        res.status(200).json({msg: "Goal-Based Plan Deleted Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

/* Transaction */
export const addTransactionToGoalBasedPlan = async(req: Request, res: Response) => {

    try {
        const { transaction_date, amount, type } = req.body;

        /* Check Goal-Based Plan */
        const goalBasedPlan = await GoalBasedSavingPlan.findOne({
            where: {
                Goal_ID: req.params.id
            }
        })
        if(!goalBasedPlan) {
            return res.status(404).json({msg: "Goal-Based Plan not found"});
        }

        /* Update the goal-based plan's total balance and progression */
        let totalBalance: number = 0, progression: number = 0;
        if (type === 'deposit') {
            totalBalance = goalBasedPlan.TotalBalance + parseFloat(amount);
            progression = (totalBalance/goalBasedPlan.TargetAmount) * 100;
            await GoalBasedSavingPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Goal_ID: req.params.id
                } 
            })    
        }
        else if (type === 'withdrawal') {
            totalBalance = goalBasedPlan.TotalBalance - parseFloat(amount);
            progression = (totalBalance/goalBasedPlan.TargetAmount) * 100;
            await GoalBasedSavingPlan.update({
                TotalBalance: totalBalance,
                Progression: progression
            }, {
                where: {
                    Goal_ID: req.params.id
                } 
            })    
        }
        else {
            return res.status(404).json({msg: `Transaction type error with ${type}`});
        }
        
        /* Create Goal-Based Transaction */ 
        await GoalBasedTransaction.create({
            TransactionDate: transaction_date,
            Amount: amount,
            Type: type,
            Goal_ID: goalBasedPlan.Goal_ID
        });
        /* !! Must update LastUpdate and TimeRemaining */

        res.status(201).json({msg: "Goal-Based transaction history is recorded"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

/* get all emergency transactions history */
export const getAllGoalBasedTransactionsByGoalId = async(req: Request, res: Response) => {

    try {

        /* Check Plan: User must create the plan first */
        const goalBasedPlan = await GoalBasedSavingPlan.findOne({
            where: {
                Goal_ID: req.params.id
            }
        });
        if(!goalBasedPlan) {
            return res.status(404).json({msg: "Goal-Based plan not found! Pls create the plan first"});
        }

        /* Check Goal-Based Transaction: */
        const goalBasedTransaction = await GoalBasedTransaction.findOne({
            where: {
                Goal_ID: req.params.id
            }
        });
        if(!goalBasedTransaction) {
            return res.status(404).json({msg: `Goal-Based transaction not found with goal id: ${req.params.id}`});
        }

        /* Find Goal-Based Transaction by Goal ID */
        const response = await GoalBasedTransaction.findAll({
            attributes:[
                'TransactionDate',
                'Amount',
                'Type'
            ],
            where: {
                Goal_ID: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({msg: error.message});
    }
}

export const getGoalBasedTransaction = async(req: Request, res: Response) => {
}

export const getGoalBasedTransactionById = async(req: Request, res: Response) => {

    try {

        /* Check Goal-Based Transaction */
        const goalBasedTransaction = await GoalBasedTransaction.findOne({
            where: {
                Transaction_ID: req.params.id
            }
        });
        if(!goalBasedTransaction) {
            return res.status(404).json({msg: "Goal-Based transaction not found"});
        }
    
        const response = await GoalBasedTransaction.findOne({
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