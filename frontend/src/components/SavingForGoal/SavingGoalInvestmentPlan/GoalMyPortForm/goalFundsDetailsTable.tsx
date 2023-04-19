import React, { useState } from "react";

interface PortfolioItem {
    Portfolio_ID: number;
    Fund_ID: number;
    PolicyDesc: string;
    FundAbbrName: string;
    OneYearReturns: number;
    AllocationRatio: number;
}

interface GoalFundsDetailsTableProps {
    title: string;
    investmentPortfolio: any;
    investmentPortfolioAllocation: PortfolioItem[];
}
const GoalFundsDetailsTable: React.FC<GoalFundsDetailsTableProps> = (props) => {
    const { investmentPortfolio, investmentPortfolioAllocation } = props;
    console.log('Allocation', investmentPortfolioAllocation)

  return (
    <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">ประเภทกองทุน</th>
                            <th scope="col" className="px-6 py-4">ชื่อย่อกองทุน</th>
                            <th scope="col" className="px-6 py-4">ผลตอบแทน (%)</th>
                            <th scope="col" className="px-6 py-4">สัดส่วนการลงทุน (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(investmentPortfolioAllocation)?.map((portfolioItem: PortfolioItem) => (
                                <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{portfolioItem.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{portfolioItem.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{portfolioItem.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{portfolioItem.AllocationRatio}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <p>ผลตอบแทนที่คาดหวัง {investmentPortfolio.ReturnRate}%</p>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default GoalFundsDetailsTable;
