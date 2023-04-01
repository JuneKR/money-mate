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
                        <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
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
                                <td className="whitespace-nowrap px-6 py-4 font-medium">กองทุนรวมผสม</td>
                                <td className="whitespace-nowrap px-6 py-4">ABFC</td>
                                <td className="whitespace-nowrap px-6 py-4">1.11%</td>
                                <td className="whitespace-nowrap px-6 py-4">10%</td>
                                <td className="whitespace-nowrap px-6 py-4">10,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                                <td className="whitespace-nowrap px-6 py-4">ASP-MRF</td>
                                <td className="whitespace-nowrap px-6 py-4">1.12%</td>
                                <td className="whitespace-nowrap px-6 py-4">10%</td>
                                <td className="whitespace-nowrap px-6 py-4">10,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">กองทุนรวมตลาดเงิน</td>
                                <td className="whitespace-nowrap px-6 py-4">T-NMRMF</td>
                                <td className="whitespace-nowrap px-6 py-4">1.13%</td>
                                <td className="whitespace-nowrap px-6 py-4">5%</td>
                                <td className="whitespace-nowrap px-6 py-4">15,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                                <td className="whitespace-nowrap px-6 py-4">TCMF</td>
                                <td className="whitespace-nowrap px-6 py-4">1.14 %</td>
                                <td className="whitespace-nowrap px-6 py-4">5%</td>
                                <td className="whitespace-nowrap px-6 py-4">5,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">กองทุนรวมตราสารหนี้</td>
                                <td className="whitespace-nowrap px-6 py-4">ASP-FRF</td>
                                <td className="whitespace-nowrap px-6 py-4">1.15 %</td>
                                <td className="whitespace-nowrap px-6 py-4">50 %</td>
                                <td className="whitespace-nowrap px-6 py-4">50,000</td>
                            </tr>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                                <td className="whitespace-nowrap px-6 py-4">KKP PLUS</td>
                                <td className="whitespace-nowrap px-6 py-4">1.16 %</td>
                                <td className="whitespace-nowrap px-6 py-4">10 %</td>
                                <td className="whitespace-nowrap px-6 py-4">10,000</td>
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
