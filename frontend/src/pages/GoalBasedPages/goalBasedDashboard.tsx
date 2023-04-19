import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress1 from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import ModleButtonAdd from "@/components/SavingForGoal/SavingGoalDashBoardComponents/sGoalDashBoardModalAdd";
import ModleButtonWithDraw from "@/components/SavingForGoal/SavingGoalDashBoardComponents/sGoalDashBoardModalWithDraw";
import Box from "@mui/material/Box";
import EmergencyPlanDataTable from "@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable";
import ModleButtonForm1 from "@/components/SavingForGoal/SavingGoalDashBoardComponents/sGoalDashBoardModalForm";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/transactionTable";

export interface SavingGoalPlan {
  Goal_ID: number | any;
  LastUpdate: string | any;
  MonthlyExpense: number | any;
  MonthlySaving: number | any;
  PlanName: string | any;
  Progression: number | any;
  StartDate: string | any;
  TargetAmount: number | any;
  TimePeriod: number | any;
  TimeRemaining: number | any;
  TotalBalance: number | any;
  User_ID: number | any;
}

export interface SavingGoalTransaction {
  TransactionDate: string;
  Amount: number;
  Type: string;
}
function monthsToYearsMonthsDays(value: string) {
  const values = Number(value) / 12;
  const totalDays = Number(values) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }
  return result.toString();
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

const GoalBasedDashboard = () => {
  const router = useRouter();

  const handleEmergencyInvestmentPortfolioPackage = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfolioPackage");
  };

  const urlServer = "http://localhost:8080/";

  const [savingSGoalPlan, setSavingSGoalPlan] = useState<SavingGoalPlan>();

  const [savingEmergencyTransactions, setSavingEmergencyTransactions] =
    useState<SavingGoalTransaction[]>([]);

  // Fetch APIs
  useEffect(() => {
    async function fetchSavingPlan() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();
        console.log(userProfile)

        //Fetch Saving Goal Plan
        const savingGoalBasedResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/goal`,
          {
            credentials: "include",
          }
        );
        const savingGoal = await savingGoalBasedResponse.json();
        setSavingSGoalPlan(savingGoal);

        //Fetch Saving Emergency Transaction
        const savingEmergencyTransactionResponse = await fetch(
          `${urlServer}saving/goal/${savingGoal.Goal_ID}/transactions`,
          {
            credentials: "include",
          }
        );
        const savingEmergencyTransaction = await savingEmergencyTransactionResponse.json();
        setSavingEmergencyTransactions(savingEmergencyTransaction);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);

  const targetAmount2 = Number(savingSGoalPlan?.TargetAmount);
  const formatTargetAmount2 = targetAmount2.toLocaleString();
  const totalBalance2 = Number(savingSGoalPlan?.TotalBalance);
  const formatTotalBalance2 = totalBalance2.toLocaleString();
  
  console.log(savingEmergencyTransactions);

  return (
    <>
    TotalBalance
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
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-red-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-white text-2xl"
                >
                  การออมเงินเพื่อ {savingSGoalPlan?.PlanName}
                </div>
              </div>
              <div>
                <div>
                  <ModleButtonForm1
                    title={""}
                    savingGoal={savingSGoalPlan}
                  />
                </div>
              </div>
            </div>
            <div className="py-10 ">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // backgroundColor: "#6259E8",
                }}
                className=" py-2 rounded-lg bg-gradient-to-r from-purple-900 to-red-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-white text-2xl"
                >
                  หยอดกระปุก
                </div>
              </div>
              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="rounded-b-2xl pb-5 shadow-2xl "
              >
                <div className="pt-5 grid grid-cols-4">
                  <div className="col-span-1 ">
                    <Image src={icon1} alt="Your Image" className="pb-3" />
                  </div>
                  <div className="px-5 w-full h-full col-span-3 py-5">
                    <h1 className="flex justify-center item-center text-lg font-bold pb-7">
                      นักออมฉุกเฉินมือใหม่
                    </h1>
                    <Progress1
                      title={"my bar"}
                      progress={`${savingSGoalPlan?.Progression}%`}
                    />
                  </div>
                </div>
                <div className=" px-5 text-black">
                  <div className="text-2xl text-white text-black pb-3 ">
                    {" "}
                    แผนการออมเงินของคุณ
                  </div>
                  <div
                    style={{ backgroundColor: "#27264E" }}
                    className="py-5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 shadow-2xl rounded-lg text-white text-lg font-bold"
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
                        {/* <h1>{monthsToYearsMonthsDays(savingSGoalPlan?.TimePeriod)} เดือน</h1> */}
                        <h1>{savingSGoalPlan?.TimePeriod} เดือน</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        เงินออมทั้งหมดในปัจจุบัน
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>{formatTotalBalance2} บาท</h1>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center py-3">
                        <h1>จำนวนเงินคงเหลือ</h1>
                      </div>
                      <div className="flex items-center justify-center py-3">
                        <h1>
                          {(savingSGoalPlan?.TargetAmount -
                            savingSGoalPlan?.TotalBalance).toLocaleString()}{" "}
                          บาท
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
                            savingSGoalPlan?.TimeRemaining
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
                      savingGoal={savingSGoalPlan}
                    />
                    <ModleButtonWithDraw
                      title={"my modle2"}
                      savingGoal={savingSGoalPlan}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="pb-5 ">
              <div className=" grid grid-cols-2 rounded-3xl transition duration-300 delay-150 bg-gradient-to-r from-blue-900 via-pink-800 to-purple-800 hover:delay-300 hover:from-purple-500 hover:to-pink-800 shadow-2xl">
                <div className="flex justify-center item-center py-20 grid grid-rows-2">
                  <div>
                    <div className="font-bold">เราจะแนะนำการลงทุนให้คุณ</div>
                  </div>
                  <div>
                    <div>หากคุณต้องการให้เป้าหมายสำเร็จเร็วขึ้น!</div>
                  </div>
                </div>
                <div className="flex justify-center item-center py-20">
                  <button
                    // onClick={handleEmergencyInvestmentPortfolioPackage}
                    className="transition ease-in-out delay-150 bg-yellow-200 hover:-translate-y-1 hover:scale-110 hover:bg-yellow-500 duration-300 text-black font-bold py-2 px-4 rounded"
                  >
                    เพิ่มแผนการลงทุน
                  </button>
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
                className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-red-500"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-white text-2xl "
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
                      <p className="text-gray-200 flex justify-center item-center text-2xl font-bold">
                        คุณยังไม่มีประวัติการออมเงินและถอนเงิน
                      </p>
                    </div>
                  ) : (
                    <div className="pb-5 px-5">
                      
                      {savingEmergencyTransactions.map(
                        (savingEmergencyTransaction, index) => (
                          <div key={index}>
                            <TransactionTable
                              title={"my table1"}
                              transaction={savingEmergencyTransaction}
                              savingData={savingSGoalPlan}
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
        </div>
      </main>
    </>
  );
};
export default GoalBasedDashboard;
