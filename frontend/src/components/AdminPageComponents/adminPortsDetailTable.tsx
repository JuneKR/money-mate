import React, { useState } from "react";

interface AdminPortsDetailTableProps {
    title: string;
}
const AdminPortsDetailTable: React.FC<AdminPortsDetailTableProps> = (props) => {
  return (
    <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full text-sm font-light text-left">
                        <thead className="font-medium border-b dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">ประเภทกองทุน</th>
                            <th scope="col" className="px-6 py-4">ชื่อย่อกองทุน</th>
                            <th scope="col" className="px-6 py-4">ผลตอบแทน (%)</th>
                            <th scope="col" className="px-6 py-4">สัดส่วนการลงทุน (%)</th>
                            <th scope="col" className="px-6 py-4">จำนวนเงินลงทุน (บาท)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap">กองทุนรวมผสม</td>
                                <td className="px-6 py-4 whitespace-nowrap">ABFC</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.11%</td>
                                <td className="px-6 py-4 whitespace-nowrap">10%</td>
                                <td className="px-6 py-4 whitespace-nowrap">10,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap">ASP-MRF</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.12%</td>
                                <td className="px-6 py-4 whitespace-nowrap">10%</td>
                                <td className="px-6 py-4 whitespace-nowrap">10,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap">กองทุนรวมตลาดเงิน</td>
                                <td className="px-6 py-4 whitespace-nowrap">T-NMRMF</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.13%</td>
                                <td className="px-6 py-4 whitespace-nowrap">5%</td>
                                <td className="px-6 py-4 whitespace-nowrap">15,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap">TCMF</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.14 %</td>
                                <td className="px-6 py-4 whitespace-nowrap">5%</td>
                                <td className="px-6 py-4 whitespace-nowrap">5,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap">กองทุนรวมตราสารหนี้</td>
                                <td className="px-6 py-4 whitespace-nowrap">ASP-FRF</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.15 %</td>
                                <td className="px-6 py-4 whitespace-nowrap">50 %</td>
                                <td className="px-6 py-4 whitespace-nowrap">50,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="px-6 py-4 font-medium whitespace-nowrap"></td>
                                <td className="px-6 py-4 whitespace-nowrap">KKP PLUS</td>
                                <td className="px-6 py-4 whitespace-nowrap">1.16 %</td>
                                <td className="px-6 py-4 whitespace-nowrap">10 %</td>
                                <td className="px-6 py-4 whitespace-nowrap">10,000</td>
                            </tr>
                            
                            
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default AdminPortsDetailTable;
