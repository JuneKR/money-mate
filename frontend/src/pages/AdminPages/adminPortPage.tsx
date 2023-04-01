import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebarAdmin";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import Pie1 from "@/components/AdminPageComponents/adminPortChart";
import AdminPortsDetailTable from "@/components/AdminPageComponents/adminPortsDetailTable";
import Table1 from "@/components/AdminPageComponents/adminPortPageTable";
const AdminPortPage = () => {
  const router = useRouter();
  const handleEmergencyInvestmentPortfolioPackage = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfolioPackage");
  };
  return (
    <>
      <main className={styles.main} style={{ overflowX: "auto" }}>
        <div className="w-full xl:w-8/12">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <Sidebar title="My Sidebar" />
            <div className="bg-gray-50">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#B2E8FF",
                }}
                className="py-4 rounded bg-gray-50 dark:bg-gray-800"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-black dark:text-gray-500 "
                >
                  พอร์ตการลงทุนของคุณ
                </p>
              </div>
              <div className="shadow-2xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 py-5 bg-gray-50 ">
                <div
                  style={{ alignItems: "center" }}
                  className="col-span-1 flex justify-center item-center"
                >
                  <Pie1 title={"my pie1"} />
                </div>
                <div className="text-black flex justify-center item-center boder border-blue-500 col-span-2 ">
                  <AdminPortsDetailTable title={""} />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-center item-center p-5 bg-gray-50 shadow-2xl">
                <Table1 title={""} />
              </div>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};
export default AdminPortPage;
