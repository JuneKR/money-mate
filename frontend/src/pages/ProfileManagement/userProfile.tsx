import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import InvestmentCheckBox from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox";
import { useRouter } from "next/router";

import Setting from "@/components/UserProfileComponents/setting";
import Password from "@/components/UserProfileComponents/password";

export interface UserProfileData {
  User_ID: number | any;
  FirstName: string | any;
  LastName: string | any;
  DateOfBirth: string | any;
  Gender: string | any;
  RiskLevel: number | any;
  Email: string | any;
}

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

  const urlServer = "http://localhost:8080/";

  const [userProfileDatas, setUserProfileDatas] = useState<UserProfileData[]>(
    []
  );

  // Fetch APIs
  useEffect(() => {
    async function fetchSavingPlan() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();
        setUserProfileDatas(userProfile);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);
  return (
    <>
      <main className={styles.main}>
        <div style={{ padding: "0 4rem" }} className=" xl:w-8/12">
          <Sidebar title="My Sidebar" />
          <div style={{ backgroundColor: "#1D1D41" }} className="shadow-2xl">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#6259E8",
              }}
              className="py-2 rounded bg-gray-50 dark:bg-gray-800 shadow-2xl"
            >
              <p
                style={{ padding: "0 1rem" }}
                className="font-bold text-white dark:text-gray-500 text-2xl"
              >
                ตั้งค่า
              </p>
            </div>
            <div className="pt-5 ">
              <div className="text-black px-5 ">
                <button
                  onClick={() => handleSettingsButtonClick(1)}
                  className={`transition-all p-4 ${
                    activeButton === 1 ? "border-b-4 border-blue-800" : ""
                  }`}
                >
                  แก้ไขข้อมูลส่วนตัว
                </button>
                <button
                  onClick={() => handlePasswordChangeButtonClick(2)}
                  className={`transition-all p-4 ${
                    activeButton === 2 ? "border-b-4  border-blue-800" : ""
                  }`}
                >
                  เปลี่ยนรหัสผ่าน
                </button>
              </div>
            </div>
            <div className="flex item-center justify-center ">
              {currentPage === "settings" ? (
                <div className="text-white">
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
                  <Password title={""} />
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
