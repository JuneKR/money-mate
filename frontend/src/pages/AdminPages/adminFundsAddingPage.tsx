import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/sidebarAdmin";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import AddingForm from "@/components/AdminPageComponents/adminFundsAddingForm";

const AdminFundsAddingPage = () => {
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
            <div className="shadow-2xl">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#6259E8",
                }}
                className="py-2 rounded shadow-2xl"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white "
                >
                  เพิ่มข้อมูลกองทุน
                </p>
              </div>
              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="flex justify-center p-5 item-center"
              >
                <AddingForm title={""} />
              </div>
            </div>
          </Box>
        </div>
      </main>
    </>
  );
};
export default AdminFundsAddingPage;
