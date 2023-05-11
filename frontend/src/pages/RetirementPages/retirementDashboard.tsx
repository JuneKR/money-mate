import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress1 from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import ModleButtonAdd from "@/components/SavingForRetirement/SavingRetirementDashBoardComponents/sRetirementDashBoardModalAdd";
import ModleButtonWithDraw from "@/components/SavingForRetirement/SavingRetirementDashBoardComponents/sRetirementDashBoardModalWithDraw";
import Box from "@mui/material/Box";
import ModleButtonForm1 from "@/components/SavingForRetirement/SavingRetirementDashBoardComponents/sRetirementDashBoardModalForm";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/transactionTable";
import Complete from "@/components/completeModal";
export interface SavingRetirementPlan {
  PlanName: string;
  TargetAmount: number;
  Period: number;
  MonthlySaving: number;
  Initial_saving: number;
  StartDate: string;
  LastUpdate: string;
  TotalBalance: number;
  TimeRemaining: number;
  DateOfBirth: string;
  InterestRate: number;
  MonthlyExpense: number;
  AgeToRetire: number;
  AgeToLive: number;
  InflationRate: number;
  AdditionalInvestment: number;
  Progression: string;
  RiskLevel: number;
  User_ID: number;
}

export interface SavingRetirementTransaction {
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

const RetirementDashboard = () => {
  const router = useRouter();
  const urlServer = "http://localhost:8080/";

  const [savingRetirePlan, setSavingRetirePlan] =
    useState<SavingRetirementPlan>();

  const [savingRetirementTransactions, setSavingRetirementTransactions] =
    useState<SavingRetirementTransaction[]>([]);

  // Fetch APIs
  useEffect(() => {
    async function fetchSavingPlan() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();
        console.log(userProfile);

        //Fetch Saving Retirement Plan
        const savingGoalBasedResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/retirement`,
          {
            credentials: "include",
          }
        );
        const savingRetirement = await savingGoalBasedResponse.json();
        setSavingRetirePlan(savingRetirement);
        console.log(savingRetirement);
        console.log(
          `${urlServer}user/${userProfile.User_ID}/saving/retirement`
        );

        //Fetch Saving Retirement Transaction
        const savingRetirementTransactionResponse = await fetch(
          `${urlServer}saving/retirement/${savingRetirement.Retirement_ID}/transactions`,
          {
            credentials: "include",
          }
        );
        console.log(savingRetirement.Retirement_ID);
        const savingRetirementTransaction =
          await savingRetirementTransactionResponse.json();
        setSavingRetirementTransactions(savingRetirementTransaction);

        // Check if data is defined before using it
        if (savingRetirement) {
          setSavingRetirePlan(savingRetirement);
        }

        if (savingRetirementTransaction) {
          setSavingRetirementTransactions(savingRetirementTransaction);
        }
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);

  const targetAmount2 = Number(savingRetirePlan?.TargetAmount);
  const formatTargetAmount2 = targetAmount2?.toLocaleString();
  const totalBalance2 = Number(savingRetirePlan?.TotalBalance);
  const formatTotalBalance2 = totalBalance2?.toLocaleString();
  const amountRemaining =
    Number(savingRetirePlan?.TargetAmount) -
    Number(savingRetirePlan?.TotalBalance);

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
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-green-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white"
                >
                  การออมเงินเพื่อเพื่อเกษียณอายุ
                </div>
              </div>
              <div>
                <div className="pt-10">
                  <ModleButtonForm1
                    title={""}
                    savingRetirement={savingRetirePlan}
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
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-green-500"
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
                      progress={`${savingRetirePlan?.Progression}%`}
                    />
                  </div>
                </div>
                <div className="px-5 text-black ">
                  <div className="pb-3 text-2xl text-black text-white ">
                    {" "}
                    แผนการออมเงินของคุณ
                  </div>
                  <div
                    style={{ backgroundColor: "#27264E" }}
                    className="grid grid-cols-2 py-5 text-lg font-bold text-white rounded-lg shadow-2xl md:grid-cols-2 lg:grid-cols-4"
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
                        จำนวนเงินทั้งหมด
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
                          {yearsToYearsMonthsDays(
                            Number(savingRetirePlan?.TimeRemaining).toString()
                          )}{" "}
                          เดือน
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-10">
                  <div className="flex justify-end">
                    <ModleButtonAdd
                      title={"my modle1"}
                      savingRetirement={savingRetirePlan}
                    />
                    <ModleButtonWithDraw
                      title={"my modle2"}
                      savingRetirement={savingRetirePlan}
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
                  // backgroundColor: "#6259E8",
                }}
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-green-500"
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
                  {!savingRetirementTransactions.length ? (
                    <div className="p-20">
                      <p className="flex justify-center text-2xl font-bold text-gray-200 item-center">
                        คุณยังไม่มีประวัติการออมเงินและถอนเงิน
                      </p>
                    </div>
                  ) : (
                    <div className="px-5 pb-5">
                      {savingRetirementTransactions.map(
                        (savingRetirementTransaction, index) => (
                          <div key={index}>
                            <TransactionTable
                              title={"my table1"}
                              transaction={savingRetirementTransaction}
                              savingData={savingRetirePlan}
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                  <div></div>
                </div>
              </div>
            </div>
          </Box>
          <Complete progress={savingRetirePlan?.Progression} />
        </div>
      </main>
    </>
  );
};
export default RetirementDashboard;
