import MutualFund from "../../models/portfolio management/mutualFundModel";
import PackageItem from "../../models/portfolio management/packageItem";
import { Request, Response } from "express";

/* Mutual Fund */
export const createMutualFund = async(req: Request, res: Response) => {
    
    try {
        const 
        {   
            last_update,
            fund_name,
            fund_abbr_name,
            risk_spectrum,
            policy_desc,
            spec_code,
            spec_desc,
            nav,
            minimum_investment_amount,
            minimum_additional_amount,
            one_year_returns,
            three_year_returns,
            five_year_returns,
            ytd_returns,
        } = req.body;

        await MutualFund.create({ 
            LastUpdate: last_update,
            FundName: fund_name,
            FundAbbrName: fund_abbr_name,
            RiskSpectrum: risk_spectrum,
            PolicyDesc: policy_desc,
            SpecCode: spec_code,
            SpecDesc: spec_desc,
            NAV: nav,
            MinimumInvestmentAmount: minimum_investment_amount,
            MinimumAdditionalAmount: minimum_additional_amount,
            oneYearReturns: one_year_returns,
            threeYearReturns: three_year_returns,
            fiveYearReturns: five_year_returns,
            YTDReturns: ytd_returns,
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
                'LastUpdate',
                'FundName',
                'FundAbbrName',
                'RiskSpectrum',
                'PolicyDesc',
                'SpecCode',
                'SpecDesc',
                'NAV',
                'MinimumInvestmentAmount',
                'MinimumAdditionalAmount',
                'oneYearReturns',
                'threeYearReturns',
                'fiveYearReturns',
                'YTDReturns',
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

        /* Check Mutual Fund */
        if(!mutualFund) {
            return res.status(404).json({msg: `Mutual Fund id: ${req.params.id} not found`});
        }

        const {   
            last_update,
            fund_name,
            fund_abbr_name,
            risk_spectrum,
            policy_desc,
            spec_code,
            spec_desc,
            nav,
            minimum_investment_amount,
            minimum_additional_amount,
            one_year_returns,
            three_year_returns,
            five_year_returns,
            ytd_returns,
        } = req.body;

        await MutualFund.update({
            LastUpdate: last_update,
            FundName: fund_name,
            FundAbbrName: fund_abbr_name,
            RiskSpectrum: risk_spectrum,
            PolicyDesc: policy_desc,
            SpecCode: spec_code,
            SpecDesc: spec_desc,
            NAV: nav,
            MinimumInvestmentAmount: minimum_investment_amount,
            MinimumAdditionalAmount: minimum_additional_amount,
            oneYearReturns: one_year_returns,
            threeYearReturns: three_year_returns,
            fiveYearReturns: five_year_returns,
            YTDReturns: ytd_returns,
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
                'LastUpdate',
                'FundName',
                'FundAbbrName',
                'RiskSpectrum',
                'PolicyDesc',
                'SpecCode',
                'SpecDesc',
                'NAV',
                'MinimumInvestmentAmount',
                'MinimumAdditionalAmount',
                'oneYearReturns',
                'threeYearReturns',
                'fiveYearReturns',
                'YTDReturns',
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
