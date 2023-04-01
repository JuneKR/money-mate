import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebarAdmin";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import DataTable from '@/components/AdminPageComponents/adminFundManagementPageTable'


const AdminFundsManagement = () => {
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
            <div className="bg-gray-50 shadow-2xl">
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
                  จัดการข้อมูลกองทุน
                </p>
              </div>
              <div>
                <DataTable title={""}/>
              </div>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};
export default AdminFundsManagement;
