import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress1 from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import ModleButtonAdd from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd";
import ModleButtonWithDraw from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw";
import Box from "@mui/material/Box";
import EmergencyPlanDataTable from "@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable";
import ModleButtonForm1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/emergencyInvestmentDashBoardModalForm1";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import { useRouter } from "next/router";

const EmergencyDashboard = () => {
  const router = useRouter();
  const handleEmergencyInvestmentPortfolioPackage = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfolioPackage");
  };
  return (
    <>
      <main className={styles.main} style={{ overflowX: 'auto' }}>
        <div className="w-full h-full">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Sidebar title="My Sidebar" />
            <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#FEF5AC",
                  }}
                  className="py-2 rounded bg-gray-50 dark:bg-gray-800"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="font-bold text-black dark:text-gray-500 "
                  >
                    การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
                  </p>
                </div>
                <div >
                  <div className="border border-gray-200 bg-gray-50 rounded">
                    <ModleButtonForm1 title={""} />
                  </div>
                </div>
              </div>
            <div className="py-5 ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FEF5AC",
                }}
                className=" py-2 rounded bg-gray-50 dark:bg-gray-800"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-black dark:text-gray-500 "
                >
                  หยอดกระปุก
                </p>
              </div>
              <div className="bg-gray-50 shadow-2xl">
                  <div className="pt-5 grid grid-cols-4">
                    <div className="col-span-1 ">
                      <Image src={icon1} alt="Your Image" className="pb-3" />
                    </div>
                    <div className="px-5 w-full h-full col-span-3 py-5">
                      <h1 className="flex justify-center item-center text-black">
                        นักออมฉุกเฉินมือใหม่
                      </h1>
                      <Progress1 title={"my bar"} />
                    </div>
                  </div>
                  <div className=" px-5 text-black">
                    <p className=" text-black dark:text-gray-500 pb-3 ">
                      แผนการออมเงินของคุณ
                    </p>
                    <div
                      style={{ backgroundColor: "#E5F8FF" }}
                      className="border border-black py-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                    >
                      <div>
                        <div className="flex items-center justify-center py-3">
                          <h1>จำนวนเงินเป้าหมาย</h1>
                        </div>
                        <div className="flex items-center justify-center py-3">
                          <h1>100000</h1>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center py-3">
                          <h1>ระยะเวลาในการออม</h1>
                        </div>
                        <div className="flex items-center justify-center py-3">
                          <h1>6</h1>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center py-3">
                          จำนวนเงินทั้งหมด
                        </div>
                        <div className="flex items-center justify-center py-3">
                          <h1>20,000</h1>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center py-3">
                          <h1>จำนวนเงินคงเหลือ</h1>
                        </div>
                        <div className="flex items-center justify-center py-3">
                          <h1>80000</h1>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-center py-3">
                          <h1>เหลือเวลาอีก</h1>
                        </div>
                        <div className="flex items-center justify-center py-3">
                          <h1>4ปี5เดือน</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pb-5 pt-5 px-5">
                    <div className="flex justify-end">
                      <ModleButtonAdd title={"my modle1"} />
                      <ModleButtonWithDraw title={"my modle2"} />
                    </div>
                  </div>
              </div>
            </div>
            <div className="pb-5 text-black ">
              <div className=" grid grid-cols-2 rounded-3xl bg-gray-50 shadow-2xl">
                <div className="flex justify-center item-center py-20 grid grid-rows-2">
                  <div>
                    <p className="font-bold">เราจะแนะนำการลงทุนให้คุณ</p>
                  </div>
                  <div>
                    <p>หากคุณต้องการให้เป้าหมายสำเร็จเร็วขึ้น!</p>
                  </div>
                </div>
                <div className="flex justify-center item-center py-20">
                  <button
                    onClick={handleEmergencyInvestmentPortfolioPackage}
                    className="transition ease-in-out delay-150 bg-yellow-200 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 text-black font-bold py-2 px-4 rounded"
                  >
                    เพิ่มแผนการลงทุน
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 shadow-2xl">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#FEF5AC",
                }}
                className=" py-2 rounded bg-gray-50 dark:bg-gray-800"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-black dark:text-gray-500 "
                >
                  ประวัติรายการ
                </p>
              </div>
              <div>
                <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                  <div>
                    <EmergencyPlanDataTable title={"my table1"} />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};
export default EmergencyDashboard;
