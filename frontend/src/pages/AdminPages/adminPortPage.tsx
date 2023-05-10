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
              <div className="grid grid-cols-1 py-5 shadow-2xl sm:grid-cols-1 lg:grid-cols-3 bg-gray-50 ">
                <div
                  style={{ alignItems: "center" }}
                  className="flex justify-center col-span-1 item-center"
                >
                  <Pie1 title={"my pie1"} />
                </div>
                <div className="flex justify-center col-span-2 text-black border-blue-500 item-center boder ">
                  <AdminPortsDetailTable title={""} />
                </div>
              </div>
            </div>
            <div className="pt-5">
              <div className="flex justify-center p-5 shadow-2xl item-center bg-gray-50">
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
