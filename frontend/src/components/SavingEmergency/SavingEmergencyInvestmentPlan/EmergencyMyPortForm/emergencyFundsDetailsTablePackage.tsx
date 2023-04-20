import React, { useState } from "react";

interface PackageItem {
    Package_ID: number;
    Fund_ID: number;
    PolicyDesc: string;
    FundAbbrName: string;
    OneYearReturns: number;
    AllocationRatio: number;
}

interface EmergencyFundsDetailsTableProps {
    title: string;
    portfolioPackage: any;
    portfolioPackageAllocation: PackageItem[];
}
const EmergencyFundsDetailsTable: React.FC<EmergencyFundsDetailsTableProps> = (props) => {
    const { portfolioPackage, portfolioPackageAllocation } = props;
    console.log('Allocation', portfolioPackageAllocation)

  return (
    <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full text-left text-lg font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">ประเภทกองทุน</th>
                            <th scope="col" className="px-6 py-4">ชื่อย่อกองทุน</th>
                            <th scope="col" className="px-6 py-4">ผลตอบแทน (%)</th>
                            <th scope="col" className="px-6 py-4">สัดส่วนการลงทุน (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from(portfolioPackageAllocation)?.map((packageItem: PackageItem) => (
                                <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{packageItem.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageItem.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageItem.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageItem.AllocationRatio}</td>
                            </tr>
                            ))}
                        </tbody>
                        </table>
                        <p 
                            className="text-lg text-center p-10 rounded-lg bg-gradient-to-r from-purple-900 to-pink-500 p-1 m-3"
                        >   
                            ผลตอบแทนที่คาดหวัง {portfolioPackage.ReturnRate}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default EmergencyFundsDetailsTable;
