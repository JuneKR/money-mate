import React from "react";
import { IPortfolioPackage, IPackageAllocation } from "@/pages/EmergencyPages/emergencyInvestmentDashboard";

interface GoalFundsDetailsTableProps {
    title: string;
    portfolioPackage: IPortfolioPackage;
    portfolioPackageAllocation: IPackageAllocation[];
}
const GoalFundsDetailsTable: React.FC<GoalFundsDetailsTableProps> = (props) => {
  const { portfolioPackage, portfolioPackageAllocation } = props;

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
                            {Array.from(portfolioPackageAllocation)?.map((packageItem: IPackageAllocation) => (
                                <tr key={packageItem.Fund_ID} className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{packageItem.PolicyDesc}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{packageItem.FundAbbrName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{packageItem.OneYearReturns}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{packageItem.AllocationRatio}</td>
                                </tr>
                            ))}
                        </tbody>
                        </table>
                        <p>ผลตอบแทนที่คาดหวัง {portfolioPackage.ReturnRate}%</p>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default GoalFundsDetailsTable;
