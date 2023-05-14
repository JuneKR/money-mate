import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress1 from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import ModleButtonAdd from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalAdd";
import ModleButtonWithDraw from "@/components/SavingEmergency/EmergencyDashboardComponents/emerGencyDashBoardModalWithDraw";
import Box from "@mui/material/Box";
import ModleButtonForm1 from "@/components/SavingEmergency/EmergencyDashboardComponents/emergencyDashBoardModalForm1";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/transactionTable";

import Complete from "@/components/completeModal";

export interface SavingEmergencyPlan {
  Emergency_ID: number;
  InitialSaving: number;
  InterestRate: number;
  LastUpdate: string;
  MonthlyExpense: number;
  MonthlySaving: number;
  PlanName: string;
  Progression: number;
  StartDate: string;
  TargetAmount: number;
  TimePeriod: number;
  TimeRemaining: number;
  TotalBalance: number;
  User_ID: number;
}

export interface SavingEmergencyTransaction {
  TransactionDate: string;
  Amount: number;
  Type: string;
}
function yearsToYearsMonthsDays(value: string) {
  const totalDays = Number(value) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }
  return result.toString();
}

const EmergencyDashboard = () => {
  const router = useRouter();

  const urlServer = "http://localhost:8080/";

  const [savingEmergencyPlan, setSavingEmergencyPlan] =
    useState<SavingEmergencyPlan>();

  const [savingEmergencyTransactions, setSavingEmergencyTransactions] =
    useState<SavingEmergencyTransaction[]>([]);

  // Fetch APIs
  useEffect(() => {
    async function fetchSavingPlan() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();

        //Fetch Saving Emergency Plan
        const savingEmergencyResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/emergency`,
          {
            credentials: "include",
          }
        );
        const savingEmergency = await savingEmergencyResponse.json();
        setSavingEmergencyPlan(savingEmergency);

        //Fetch Saving Emergency Transaction
        const savingEmergencyTransactionResponse = await fetch(
          `${urlServer}saving/emergency/${savingEmergency.Emergency_ID}/transactions`,
          {
            credentials: "include",
          }
        );

        const savingEmergencyTransaction =
          await savingEmergencyTransactionResponse.json();
        setSavingEmergencyTransactions(savingEmergencyTransaction);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);

  const [showModal, setShowModal] = useState<boolean>(false);
  const targetAmount2 = Number(savingEmergencyPlan?.TargetAmount);
  const formatTargetAmount2 = targetAmount2?.toLocaleString();
  const totalBalance2 = Number(savingEmergencyPlan?.TotalBalance);
  const formatTotalBalance2 = totalBalance2?.toLocaleString();
  const amountRemaining =
    Number(savingEmergencyPlan?.TargetAmount) -
    Number(savingEmergencyPlan?.TotalBalance);
  const dynamicTimePeriod =
    amountRemaining / Number(savingEmergencyPlan?.MonthlySaving);
  const handleCloseModal = (): void => {
    setShowModal(false);
  };
  return (
    <>
      <Sidebar title="My Sidebar" />
      <main className={styles.main} style={{ overflowX: "auto" }}>
        <div className="w-full xl:w-8/12">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-pink-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white"
                >
                  การออมเงินเผื่อฉุกเฉิน
                </div>
              </div>
              <div>
                <div className="pt-10">
                  <ModleButtonForm1
                    title={""}
                    savingEmergency={savingEmergencyPlan}
                    dynamicTimePeriod={dynamicTimePeriod}
                  />
                </div>
              </div>
            </div>
            <div className="py-10 ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-pink-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white"
                >
                  หยอดกระปุก
                </div>
              </div>
              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="pb-5 shadow-2xl rounded-b-2xl "
              >
                <div className="grid grid-cols-4 pt-5">
                  <div className="col-span-1 ">
                    <Image src={icon1} alt="Your Image" className="pb-3" />
                  </div>
                  <div className="w-full h-full col-span-3 px-5 py-5">
                    <Progress1
                      title={"my bar"}
                      progress={`${savingEmergencyPlan?.Progression}%`}
                    />
                  </div>
                </div>
                <div className="px-5 ">
                  <div className="pb-3 text-2xl text-white ">
                    {" "}
                    แผนการออมเงินของคุณ
                  </div>
                  <div
                    style={{ backgroundColor: "#27264E" }}
                    className="grid grid-cols-1 py-5 text-lg font-bold text-white rounded-lg shadow-2xl md:grid-cols-1 lg:grid-cols-5"
                  >
                    <div>
                      <div className="flex items-center justify-center py-3">
                        <h1>จำนวนเงินเป้าหมาย</h1>
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>{formatTargetAmount2} บาท</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        <h1>ระยะเวลาในการออม</h1>
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>{savingEmergencyPlan?.TimePeriod} เดือน</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        ออมไปแล้ว
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>{formatTotalBalance2} บาท</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        <h1>ต้องออมเงินอีก</h1>
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>
                          {amountRemaining <= 0 ? `0` : amountRemaining}บาท
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        <h1>เหลือเวลาอีก</h1>
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>
                          {dynamicTimePeriod <= 0 ? `ออมเงินสำเร็จ` : yearsToYearsMonthsDays(
                            Number(dynamicTimePeriod / 12).toString()
                          )}{" "}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-10">
                  <div className="flex justify-end">
                    <ModleButtonAdd
                      title={"my modle1"}
                      savingEmergency={savingEmergencyPlan}
                    />
                    <ModleButtonWithDraw
                      title={"my modle2"}
                      savingEmergency={savingEmergencyPlan}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 shadow-2xl">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-pink-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white "
                >
                  ประวัติรายการออมและถอนเงิน
                </div>
              </div>
              <div>
                <div
                  style={{
                    maxHeight: "600px",
                    overflow: "auto",
                    backgroundColor: "#1D1D41",
                  }}
                  className="block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-md shadow-2xl"
                >
                  {!savingEmergencyTransactions.length ? (
                    <div className="p-20">
                      <p className="flex justify-center text-2xl font-bold text-gray-200 item-center">
                        คุณยังไม่มีประวัติการออมเงินและถอนเงิน
                      </p>
                    </div>
                  ) : (
                    <div className="px-5 pb-5">
                      {savingEmergencyTransactions.map(
                        (savingEmergencyTransaction, index) => (
                          <div key={index}>
                            <TransactionTable
                              title={"my table1"}
                              transaction={savingEmergencyTransaction}
                              savingData={savingEmergencyPlan}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Box>
          <Complete progress={savingEmergencyPlan?.Progression} />
        </div>
      </main>
    </>
  );
};
export default EmergencyDashboard;
