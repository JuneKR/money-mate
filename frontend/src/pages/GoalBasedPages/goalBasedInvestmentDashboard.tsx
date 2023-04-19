import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
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

export interface SavingGoalPlan {
  Goal_ID: number | any;
  LastUpdate: string | any;
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

export interface SavingEmergencyInvestmentPortData {
  Portfolio_ID: number | any;
  PortfolioName: string | any;
  TotalValue: number | any;
  LastUpdate: string | any;
  StartDate: string | any;
  RiskSpectrum: number | any;
  ReturnRate: number | any;
  User_ID: number | any;
  Package_ID: number | any;
  Emergency_ID: number | any;
  Goal_ID: number | any;
  Retirement_ID: number | any;
}

export interface InvestmentPortfolio {
  Portfolio_ID: number;
  PortfolioName: string;
  TotalValue: number;
  LastUpdate: string;
  StartDate: string;
  RiskSpectrum: number;
  ReturnRate: number;
  User_ID: number;
  Package_ID: number;
  Emergency_ID: number;
  Goal_ID: number;
  Retirement_ID: number;
}

const initialSavingGoalPlan: SavingGoalPlan = {
  Goal_ID: 1,
  LastUpdate: "",
  MonthlySaving: 0,
  PlanName: "",
  Progression: 0,
  StartDate: "",
  TargetAmount: 0,
  TimePeriod: 0,
  TimeRemaining: 0,
  TotalBalance: 0,
  User_ID: 1,
};

const initialPortfolio: InvestmentPortfolio = {
  Portfolio_ID: 1,
  PortfolioName: "",
  TotalValue: 0,
  LastUpdate: "",
  StartDate: "",
  RiskSpectrum: 0,
  ReturnRate: 0,
  User_ID: 1,
  Package_ID: 1,
  Emergency_ID: 0,
  Goal_ID: 0,
  Retirement_ID: 0
}

const EmergencyInvestmentDashboard = () => {
  const urlServer = "http://localhost:8080/";
  const [savingGoalPlan, setSavingGoalPlan] = useState<SavingGoalPlan>(initialSavingGoalPlan);
  const [investmentPortfolio, setInvestmentPortfolio] = useState(initialPortfolio);
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] = useState([]);

  // Fetch APIs
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();

        //Fetch Saving Emergency Plan
        const savingGoalResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/goal`,
          {
            credentials: "include",
          }
        );
        const savingGoal = await savingGoalResponse.json();
        setSavingGoalPlan(savingGoal);

        //Fetch Saving Emergency Investment Portfolio
        const goalInvestmentReponse = await fetch(
          `${urlServer}goal/${savingGoal.Goal_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const goalInvestmentPortfolio = await goalInvestmentReponse.json();
        setInvestmentPortfolio(goalInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(`${urlServer}investment/portfolio/${goalInvestmentPortfolio.Portfolio_ID}/allocation`, {
          credentials: "include",
        });
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);


      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, []);

  console.log('Portfolio', investmentPortfolio);
  console.log('Allocation',investmentPortfolioAllocation);

  const router = useRouter();

  const handleEmergencyInvestmentPortfolio = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfolio");
  };

  const handleEmergencyInvestmentTransaction = () => {
    router.push("/EmergencyPages/emergencyInvestmentTransaction");
  };
  const targetAmountDisplay = Number(savingGoalPlan.TargetAmount);
  const monthlySavingDisplay = Number(savingGoalPlan.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <>
      <Sidebar title="My Sidebar" />
      <main className={styles.main}>
        <div className="w-full xl:w-8/12">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <div
              style={{ padding: "0 1rem" }}
              className="text-white font-bold text-lg py-4 rounded-lg"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#6259E8",
                  }}
                  className="py-2 rounded bg-gray-50"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="font-bold text-white text-2xl"
                  >
                    การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
                  </p>
                </div>
                <div className="pb-10">
                  <div className="rounded-lg shadow-2xl">
                    <ModleButtonForm1
                      title={""}
                      savingEmergency={savingGoalPlan}
                      savingInvestmentPort={investmentPortfolio}
                    />
                  </div>
                </div>
              </div>
              <div className=" shadow-2xl">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#6259E8",
                  }}
                  className=" py-2 rounded bg-gray-50"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="font-bold text-white text-2xl"
                  >
                    กราฟเปรียบเทียบการลงทุนและการออมเงิน
                  </p>
                </div>
                <div style={{ backgroundColor: "#1D1D41" }} className="p-10">
                  <SavingGraph 
                    title={"saving chart"}
                    savingEmergency={savingGoalPlan}
                    savingInvestmentPort={investmentPortfolio}
                  />
                  <p>หมายเหตุ....</p>
                </div>
              </div>

              <div className="py-5 shadow-2xl py-10">
                <div
                  style={{ backgroundColor: "#6259E8" }}
                  className=" py-2 rounded bg-gray-50"
                >
                  <div>
                    <p
                      style={{ padding: "0 1rem" }}
                      className="font-bold text-white text-2xl"
                    >
                      {investmentPortfolio.PortfolioName}
                    </p>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#1D1D41" }}
                  className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 p-10"
                >
                  <div
                    style={{ alignItems: "center" }}
                    className="col-span-1 flex justify-center item-center"
                  >
                    {/* <Pie1 
                      title={investmentPortfolio.PortfolioName} 
                      investmentPortfolioAllocation={investmentPortfolioAllocation}
                    /> */}
                  </div>
                  <div className="flex justify-center item-center boder border-blue-500 col-span-3 ">
                    {/* <EmergencyFundsDetailsTable
                      title={""}
                      investmentPortfolio={investmentPortfolio}
                      investmentPortfolioAllocation={investmentPortfolioAllocation}
                    /> */}
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#1D1D41" }}
                  className="py-5 px-5 bg-gray-50  shadow-2xl"
                >
                  <div
                    style={{ backgroundColor: "#3A3B5A" }}
                    className="shadow-2xl grid grid-cols-1 md:grid-cols-3"
                  >
                    <div className="border-r border-black flex items-center justify-center grid grid-ros-2 px-3 py-5 ">
                      <div className="">
                        <h1>เงินออมฉุกเฉิน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">
                          {/* To display balance of emergency plan by decrease with investment portfolio value */}
                          {savingGoalPlan?.TotalBalance - investmentPortfolio.TotalValue} บาท
                        </h1>
                      </div>
                    </div>
                    <div className="border-r border-black flex items-center justify-center grid grid-ros-2 px-3 py-5">
                      <div className="flex items-center justify-center">
                        <h1>มูลค่าสินทรัพย์ของคุณในปัจจุบัน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">
                          {investmentPortfolio?.TotalValue ===
                          undefined
                            ? "0"
                            : investmentPortfolio?.TotalValue}{" "}
                          บาท
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 py-5 ">
                        <div className="flex items-center justify-center grid grid-rows-2">
                          <button onClick={handleEmergencyInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <AddIcon />
                            </div>
                          </button>

                          <div>
                            <p>ซื้อกองทุน</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-center grid grid-rows-2">
                          <button onClick={handleEmergencyInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <RemoveIcon />
                            </div>
                          </button>
                          <div>
                            <p>ขายกองทุน</p>
                          </div>
                        </div>
                      </div>
                      <button onClick={handleEmergencyInvestmentTransaction}>
                        <h1 className="flex items-center justify-center pb-5">
                          <CachedIcon />
                          ดูประวัติการทำรายการ
                        </h1>
                      </button>
                    </div>
                    <div className="px-5"></div>
                  </div>
                  {/* <div className="py-3">
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
                  </div> */}
                  {/* <div>
                    <div className="pb-5">
                      <div className="p-3">
                        <InvestDropdown title={""} />
                      </div>
                    </div>
                    <div className="pb-5">
                      <div className="p-3">
                        <InvestDropdown title={""} />
                      </div>
                    </div>
                    <div className="pb-5">
                      <div className="p-3">
                        <InvestDropdown title={""} />
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div
                style={{ backgroundColor: "#6259E8" }}
                className=" py-2 rounded"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-white text-2xl"
                >
                  หยอดกระปุก
                </p>
              </div>
              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="px-5 pb-10 shadow-2xl"
              >
                <div className="pt-5 grid grid-cols-4">
                  <div className="col-span-1 ">
                    <Image src={icon1} alt="Your Image" className="pb-3" />
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="px-5 col-span-3 py-5"
                  >
                    <h1 className="pb-3 flex justify-center item-center font-bold text-white text-2xl">
                      นักลงทุนมือใหม่
                    </h1>
                    <div>
                      <Progress
                        title={"my bar"}
                        progress={`${savingGoalPlan?.Progression}%`}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#3A3B5A" }}
                  className="shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
                >
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>จำนวนเงินเป้าหมาย</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="text-white font-bold">
                        {savingGoalPlan?.TargetAmount}
                      </h1>
                    </div>
                  </div>
                  <div className=" border-r-2 border-gray-300">
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>ระยะเวลาในการออม</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="text-white font-bold">
                        {savingGoalPlan?.TimePeriod} เดือน
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      จำนวนเงินทั้งหมด
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="text-white font-bold">
                        {savingGoalPlan?.TotalBalance} บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3  text-white">
                      <h1>จำนวนเงินคงเหลือ</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="text-white font-bold">
                        {savingGoalPlan?.TargetAmount -
                          savingGoalPlan?.TotalBalance}{" "}
                        บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3  text-white">
                      <h1>เหลือเวลาอีก</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="text-white font-bold">
                        {savingGoalPlan?.TimeRemaining} เดือน
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
