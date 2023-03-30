import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import SavingGraph from "@/components/SavingEmergency/EmergencyGraphComponent/savingGraph";
import ModleButtonAdd from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd";
import ModleButtonWithDraw from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw";
import Box from "@mui/material/Box";
import ModleButtonForm1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/emergencyInvestmentDashBoardModalForm1";
import EmergencyFundsDetailsTable from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyFundsDetailsTable";
import Pie1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CachedIcon from "@mui/icons-material/Cached";
import icon1 from "@/images/Icon/กระปุก2.png";
import Image from "next/image";
const EmergencyInvestmentDashboard = () => {
  const router = useRouter();
  const handleEmergencyInvestmentPortfilio = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfilio");
  };
  return (
    <>
      <main className={styles.main}>
        <div className="w-full h-full">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Sidebar title="My Sidebar" />
            <div
              style={{ padding: "0 1rem" }}
              className="text-black py-4 rounded dark:bg-gray-800"
            >
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
                <div className="pb-5">
                  <div className="border border-gray-200 bg-gray-50 rounded">
                    <ModleButtonForm1 title={""} />
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
                    className="font-bold text-black dark:text-gray-500"
                  >
                    Saving Graph
                  </p>
                </div>
                <div className=" ">
                  <SavingGraph title={"saving chart"} />
                </div>
              </div>

              <div className="py-5 shadow-2xl">
                <div
                  style={{ backgroundColor: "#FEF5AC" }}
                  className=" py-2 rounded bg-gray-50 dark:bg-gray-800"
                >
                  <div>
                    <p
                      style={{ padding: "0 1rem" }}
                      className="font-bold text-black dark:text-gray-500"
                    >
                      My investment Portfolio
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 py-5 bg-gray-50 ">
                  <div
                    style={{ alignItems: "center" }}
                    className="col-span-1 flex justify-center item-center"
                  >
                    <Pie1 title={"my pie1"} />
                  </div>
                  <div className="flex justify-center item-center boder border-blue-500 col-span-2 ">
                    <EmergencyFundsDetailsTable title={""} />
                  </div>
                </div>
                <div className="py-5 px-5 bg-gray-50  shadow-2xl">
                  <div
                    style={{ backgroundColor: "#E5F8FF" }}
                    className="border border-black grid grid-cols-1 md:grid-cols-3"
                  >
                    <div className="border-r border-black flex items-center justify-center grid grid-ros-2 px-3 py-5 ">
                      <div className=" text-gray-500">
                        <h1>เงินในออมฉุกเฉิน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">50000 บาท</h1>
                      </div>
                    </div>
                    <div className="border-r border-black flex items-center justify-center grid grid-ros-2 px-3 py-5">
                      <div className="flex items-center justify-center text-gray-500">
                        <h1>มูลค่าสินทรัพย์ขจองคุณในปัจจุบัน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">10,000 บาท</h1>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 py-5 ">
                        <div className="flex items-center justify-center grid grid-rows-2">
                          <div className="flex items-center justify-center">
                            <AddIcon />
                          </div>
                          <div>
                            <p>ซื้อกองทุน</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center grid grid-rows-2">
                          <div className="flex items-center justify-center">
                            <RemoveIcon />
                          </div>
                          <div>
                            <p>ขายกองทุน</p>
                          </div>
                        </div>
                      </div>
                      <h1 className="flex items-center justify-center pb-5">
                        <CachedIcon />
                        ดูประวัติการทำรายการ
                      </h1>
                    </div>
                  </div>
                  <div className="py-3">
                    <h1 className="font-bold">พอร์ตการลงทุนในปัจจุบัน</h1>
                    <div className="grid grid-cols-3 py-2">
                      <div className="flex justify-center">
                        <h1>ประเภทพอร์ตการลงทุน</h1>
                      </div>
                      <div className="flex justify-center">
                        <h1>% เทียบกับพอร์ตที่แนะนำ</h1>
                      </div>
                      <div className="flex justify-center">
                        <h1>เงินลงทุนเทียบกับพอร์ต</h1>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="pb-5">
                      <div className=" grid grid-cols-3 border border-black p-3">
                        <div>กองทุนรวมผสม</div>
                        <div>10%/20%</div>
                        <div>10,000/20,000</div>
                      </div>
                    </div>
                    <div className="pb-5">
                      <div className=" grid grid-cols-3 border border-black p-3">
                        <div>กองทุนรวมผสม</div>
                        <div>10%/20%</div>
                        <div>10,000/20,000</div>
                      </div>
                    </div>
                    <div className="pb-5">
                      <div className=" grid grid-cols-3 border border-black p-3">
                        <div>กองทุนรวมผสม</div>
                        <div>10%/20%</div>
                        <div>10,000/20,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundColor: "#FEF5AC" }}
                className=" py-2 rounded"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="font-bold  text-black dark:text-gray-500"
                >
                  หยอดกระปุก
                </p>
              </div>
              <div className="bg-gray-50 px-5 pb-10 shadow-2xl">
                <div className="pt-5 grid grid-cols-4">
                  <div className="col-span-1 ">
                    <Image src={icon1} alt="Your Image" className="pb-3" />
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="px-5 col-span-3 py-5"
                  >
                    <h1 className="flex justify-center item-center text-black">
                      นักออมฉุกเฉินมือใหม่
                    </h1>
                    <Progress title={"my bar"} />
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#E5F8FF" }}
                  className="border border-black grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                >
                  <div>
                    <div className="flex items-center justify-center py-3 text-gray-500">
                      <h1>จำนวนเงินเป้าหมาย</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 style={{ color: "#085385" }} className="font-bold">
                        100000
                      </h1>
                    </div>
                  </div>
                  <div className=" border-r-2 border-gray-300">
                    <div className="flex items-center justify-center py-3 text-gray-500">
                      <h1>ระยะเวลาในการออม</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 style={{ color: "#085385" }} className="font-bold">
                        6
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-gray-500">
                      จำนวนเงินทั้งหมด
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 style={{ color: "#085385" }} className="font-bold">
                        20,000
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3  text-gray-500">
                      <h1>จำนวนเงินคงเหลือ</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 style={{ color: "#085385" }} className="font-bold">
                        80000
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3  text-gray-500">
                      <h1>เหลือเวลาอีก</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 style={{ color: "#085385" }} className="font-bold">
                        4ปี5เดือน
                      </h1>
                    </div>
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
export default EmergencyInvestmentDashboard;
