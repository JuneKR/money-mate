import MutualFund from "../../models/portfolio management/mutualFundModel";
import PackageItem from "../../models/portfolio management/PackageItem";
import { Request, Response } from "express";

/* Mutual Fund */
export const createMutualFund = async(req: Request, res: Response) => {
    
    try {
        const 
        {   
            fund_name,
            fund_symbol,
            fund_type,
            last_update,
            cost_basis,
            nav,
            return_rate,
            expense_ratio,
            description,
        } = req.body;

        await MutualFund.create({ 
            FundName: fund_name,
            FundSymbol: fund_symbol,
            FundType: fund_type,
            LastUpdate: last_update,
            CostBasis: cost_basis,
            Nav: nav,
            ReturnRate: return_rate,
            ExpenseRatio: expense_ratio,
            Description: description,
        });
        res.status(201).json({msg: "Successful Create new mutual fund"});
    } catch (error: any) {
        res.status(400).json({msg: error.message});
    }
}

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

/* Portfolio Package */
//Unifinished
export const getAllMutualFundByPackageId = async(req: Request, res: Response) => {
    try {
        const packageItem = await PackageItem.findOne({
            where: {
                Package_ID: req.params.id
            }
        });

        /* Check Mutual Fund in Package Item with Portfolio ID */
        if(!packageItem) {
            return res.status(404).json({msg: `Mutual Fund with Portfolio ID: ${req.params.id} not found!`});
        }
        //get package item by package id -> list of mutual fund id
        //get mutual fund info by fund id -> loop through get all fund

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
