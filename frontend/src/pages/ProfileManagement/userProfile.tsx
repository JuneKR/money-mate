import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import InvestmentCheckBox from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox";
import { useRouter } from "next/router";

import Setting from '@/components/UserProfileComponents/setting'
const UserProfile = () => {
  const [currentPage, setCurrentPage] = useState<"settings" | "password">(
    "settings"
  );
  const [activeButton, setActiveButton] = useState(1);
  const handleSettingsButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
    setCurrentPage("settings");
  };

  const handlePasswordChangeButtonClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
    setCurrentPage("password");
  };
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isButtonClicked2, setIsButtonClicked2] = useState(false);

  return (
    <>
      <main className={styles.main}>
        <div style={{ padding: "0 4rem" }} className="w-full h-full">
          <Sidebar title="My Sidebar" />
          <div className="bg-gray-50">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#B2E8FF",
              }}
              className=" py-2 rounded bg-gray-50 dark:bg-gray-800"
            >
              <p
                style={{ padding: "0 1rem" }}
                className="font-bold text-black dark:text-gray-500 "
              >
                ตั้งค่า
              </p>
            </div>
            <div className="pt-5">
              <div className="text-black px-5 ">
                <button onClick={() => handleSettingsButtonClick(1)} className={`transition-all p-4 ${activeButton === 1 ? 'border-b-4 border-blue-800' : ''}`}>แก้ไขข้อมูลส่วนตัว</button>
                <button onClick={() => handlePasswordChangeButtonClick(2)} className={`transition-all p-4 ${activeButton === 2 ? 'border-b-4  border-blue-800' : ''}`}>เปลี่ยนรหัสผ่าน</button>
              </div>
            </div>
            <div>
              {currentPage === "settings" ? (
                <div className="text-black ">
                  <Setting user={{
                    fullName: "",
                    birthDate: "",
                    gender: "other",
                    riskRate: 0,
                    email: "",
                    phoneNumber: ""
                  }} onSave={function (updatedUser: { fullName: string; birthDate: string; gender: "other" | "male" | "female"; riskRate: number; email: string; phoneNumber: string; }): void {
                    throw new Error("Function not implemented.");
                  } }/>
                  
                </div>
              ) : (
                <div className="text-black">
                  <h2>Password Change Page</h2>
                  {/* ... */}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default UserProfile;
