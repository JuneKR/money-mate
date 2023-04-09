import React, { useState } from "react";

interface EmergencyFundsDetailsTableProps {
    title: string;
    portfolioPackage: any;
    packageAllocation: any;
}
const EmergencyFundsDetailsTable: React.FC<EmergencyFundsDetailsTableProps> = (props) => {
    const { portfolioPackage, packageAllocation } = props;
    console.log('Table',packageAllocation)

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
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{packageAllocation[0]?.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[0]?.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[0]?.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[0]?.AllocationRatio}</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{packageAllocation[1]?.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[1]?.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[1]?.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[1]?.AllocationRatio}</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{packageAllocation[2]?.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[2]?.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[2]?.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation[2]?.AllocationRatio}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default EmergencyFundsDetailsTable;
