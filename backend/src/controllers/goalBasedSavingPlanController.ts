import GoalBasedSavingPlan from "../models/goalBasedSavingPlanModel";
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
        progression
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
        });
        res.status(201).json({msg: "Successful Create new goal-based plan "});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

export const getGoalBasedPlan = async(req: Request, res: Response) => {
}

export const getGoalBasedPlanById = async(req: Request, res: Response) => {
    const emergencyPlan = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
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
                'MonthlyExpense',
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

export const getGoalBasedTransaction = async(req: Request, res: Response) => {
}

export const getGoalBasedTransactionById = async(req: Request, res: Response) => {
}

export const editGoalBasedPlan = async(req: Request, res: Response) => {
    const emergencyPlan = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check Plan */
    if(!emergencyPlan) {
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
        monthly_expense,
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
                // id: user.id
                Goal_ID: req.params.id
            }
        });
        res.status(200).json({msg: "Emergency Plan Updated Successfully"})
    } catch (error: any) {
        return res.status(400).json({msg: error.message});
    }
}

export const deleteGoalBasedPlan = async(req: Request, res: Response) => {
    const user = await GoalBasedSavingPlan.findOne({
        where: {
            Goal_ID: req.params.id
        }
    });

    /* Check User */
    if(!user) {
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
