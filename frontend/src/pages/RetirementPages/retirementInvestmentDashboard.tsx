import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import SavingGraph from "@/components/SavingForRetirement/SavingRetirementDashBoardComponents/sRetirementSavingGraph";
import Box from "@mui/material/Box";
import ModleButtonForm1 from "@/components/SavingForRetirement/SavingRetirementDashBoardComponents/sRetirementInvestmentDashBoardModalForm";
import RetirementFundsDetailsTable from "@/components/SavingForRetirement/SavingRetirementInvestmentPlan/RetirementMyPortForm/retirementFundsDetailsTable";
import Pie1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CachedIcon from "@mui/icons-material/Cached";
import icon1 from "@/images/Icon/กระปุก2.png";
import Image from "next/image";

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
  ReturnRate: number;
}

export interface SavingRetirementInvestmentPortData {
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

const initialSavingRetirementPlan: SavingRetirementPlan = {
    PlanName: "",
    TargetAmount: 0,
    Period: 0,
    MonthlySaving: 0,
    Initial_saving: 0,
    StartDate: "",
    LastUpdate: "",
    TotalBalance: 0,
    TimeRemaining: 0,
    DateOfBirth: "",
    InterestRate: 0,
    MonthlyExpense: 0,
    AgeToRetire: 0,
    AgeToLive: 0,
    InflationRate: 0,
    AdditionalInvestment: 0,
    Progression: "",
    RiskLevel: 0,
    ReturnRate: 0,
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
  Retirement_ID: 0,
};

const RetirementInvestmentDashboard = () => {
  const urlServer = "http://localhost:8080/";
  const [savingRetirementPlan, setSavingRetirementPlan] =
    useState<SavingRetirementPlan>(initialSavingRetirementPlan);
  const [investmentPortfolio, setInvestmentPortfolio] =
    useState(initialPortfolio);
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] =
    useState([]);

  // Fetch APIs
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();

        //Fetch Saving Retirement Plan
        const savingRetirementResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/retirement`,
          {
            credentials: "include",
          }
        );
        const savingRetirement = await savingRetirementResponse.json();
        setSavingRetirementPlan(savingRetirement);

        //Fetch Saving Retirement Investment Portfolio
        const retirementInvestmentReponse = await fetch(
          `${urlServer}retirement/${savingRetirement?.Retirement_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        console.log(
          "savingRetirement.Retirement_ID",
          savingRetirement?.Retirement_ID
        );
        const retirementInvestmentPortfolio =
          await retirementInvestmentReponse.json();
        setInvestmentPortfolio(retirementInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(
          `${urlServer}investment/portfolio/${retirementInvestmentPortfolio.Portfolio_ID}/allocation`,
          {
            credentials: "include",
          }
        );
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, []);

  console.log("Portfolio", investmentPortfolio);
  console.log("Allocation", investmentPortfolioAllocation);

  const router = useRouter();

  const handleRetirementInvestmentPortfolio = () => {
    router.push("/RetirementPages/retirementInvestmentPortfolio");
  };

  const handleRetirementInvestmentTransaction = () => {
    router.push("/RetirementPages/retirementInvestmentTransaction");
  };
  const targetAmountDisplay = Number(savingRetirementPlan?.TargetAmount);
  const monthlySavingDisplay = Number(savingRetirementPlan?.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  function yearsToYearsMonthsDays(value: string) {
    // const values = Number(value) / 12;
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
  return (
    <>
      <Sidebar title="My Sidebar" />
      <main className={styles.main}>
        <div className="w-full xl:w-8/12">
          <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
            <div
              style={{ padding: "0 1rem" }}
              className="py-4 text-lg font-bold text-white rounded-lg"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "#6259E8",
                  }}
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-green-500"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="text-2xl font-bold text-white"
                  >
                    การลงทุนสำหรับเงินเพื่อเกษียณ
                  </p>
                </div>
                <div className="pb-10">
                  <div className="rounded-lg shadow-2xl">
                    <ModleButtonForm1
                      title={""}
                      savingRetirement={savingRetirementPlan}
                      savingInvestmentPort={investmentPortfolio}
                    />
                  </div>
                </div>
              </div>
              <div className="shadow-2xl ">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    // backgroundColor: "#6259E8",
                  }}
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-green-500"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="text-2xl font-bold text-white"
                  >
                    กราฟเปรียบเทียบการลงทุนและการออมเงิน
                  </p>
                </div>
                <div style={{ backgroundColor: "#1D1D41" }} className="p-10">
                  <SavingGraph
                    title={"saving chart"}
                    savingRetirement={savingRetirementPlan}
                    savingInvestmentPort={investmentPortfolio}
                  />
                  <p>หมายเหตุ....</p>
                </div>
              </div>

              <div className="py-5 py-10 shadow-2xl">
                <div
                //   style={{ backgroundColor: "#6259E8" }}
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-green-500"
                >
                  <div>
                    <p
                      style={{ padding: "0 1rem" }}
                      className="text-2xl font-bold text-white"
                    >
                      {investmentPortfolio?.PortfolioName}
                    </p>
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#1D1D41" }}
                  className="grid grid-cols-1 p-10 md:grid-cols-1 lg:grid-cols-4"
                >
                  <div
                    style={{ alignItems: "center" }}
                    className="flex justify-center col-span-1 item-center"
                  >
                    <Pie1
                      title={investmentPortfolio?.PortfolioName}
                      investmentPortfolioAllocation={
                        investmentPortfolioAllocation
                      }
                    />
                  </div>
                  <div className="flex justify-center col-span-3 border-blue-500 item-center boder ">
                    <RetirementFundsDetailsTable
                      title={""}
                      investmentPortfolio={investmentPortfolio}
                      investmentPortfolioAllocation={
                        investmentPortfolioAllocation
                      }
                    />
                  </div>
                </div>

                <div
                  style={{ backgroundColor: "#1D1D41" }}
                  className="px-5 py-5 shadow-2xl bg-gray-50"
                >
                  <div
                    style={{ backgroundColor: "#3A3B5A" }}
                    className="grid grid-cols-1 shadow-2xl md:grid-cols-3"
                  >
                    <div className="flex grid items-center justify-center px-3 py-5 border-r border-black grid-ros-2 ">
                      <div className="">
                        <h1>เงินออมเพื่อเกษียณ</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">
                          {/* To display balance of retirement plan by decrease with investment portfolio value */}
                          {savingRetirementPlan?.TotalBalance -
                            investmentPortfolio?.TotalValue}{" "}
                          บาท
                        </h1>
                      </div>
                    </div>
                    <div className="flex grid items-center justify-center px-3 py-5 border-r border-black grid-ros-2">
                      <div className="flex items-center justify-center">
                        <h1>มูลค่าสินทรัพย์ของคุณในปัจจุบัน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">
                          {investmentPortfolio?.TotalValue === undefined
                            ? "0"
                            : investmentPortfolio?.TotalValue}{" "}
                          บาท
                        </h1>
                      </div>
                    </div>
                    <div>
                      <div className="grid grid-cols-2 py-5 ">
                        <div className="flex grid items-center justify-center grid-rows-2">
                          <button onClick={handleRetirementInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <AddIcon />
                            </div>
                          </button>

                          <div>
                            <p>ซื้อกองทุน</p>
                          </div>
                        </div>
                        <div className="flex grid items-center justify-center grid-rows-2">
                          <button onClick={handleRetirementInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <RemoveIcon />
                            </div>
                          </button>
                          <div>
                            <p>ขายกองทุน</p>
                          </div>
                        </div>
                      </div>
                      <button onClick={handleRetirementInvestmentTransaction}>
                        <h1 className="flex items-center justify-center pb-5">
                          <CachedIcon />
                          ดูประวัติการทำรายการ
                        </h1>
                      </button>
                    </div>
                    <div className="px-5"></div>
                  </div>
                </div>
              </div>
              <div
                // style={{ backgroundColor: "#6259E8" }}
                className="py-2 rounded bg-gradient-to-r from-purple-900 to-green-500"
              >
                <p
                  style={{ padding: "0 1rem" }}
                  className="text-2xl font-bold text-white"
                >
                  หยอดกระปุก
                </p>
              </div>
              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="px-5 pb-10 shadow-2xl"
              >
                <div className="grid grid-cols-4 pt-5">
                  <div className="col-span-1 ">
                    <Image src={icon1} alt="Your Image" className="pb-3" />
                  </div>
                  <div
                    style={{ alignItems: "center" }}
                    className="col-span-3 px-5 py-5"
                  >
                    {/* <h1 className="flex justify-center pb-3 text-2xl font-bold text-white item-center">
                      นักลงทุนมือใหม่
                    </h1> */}
                    <div>
                      <Progress
                        title={"my bar"}
                        progress={`${savingRetirementPlan?.Progression}%`}
                      />
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#3A3B5A" }}
                  className="grid grid-cols-1 shadow-2xl md:grid-cols-2 lg:grid-cols-5"
                >
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>จำนวนเงินเป้าหมาย</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {formattedํargetAmount} บาท
                      </h1>
                    </div>
                  </div>
                  {/* <div className="border-r-2 border-gray-300 ">
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>ระยะเวลาในการออม</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingRetirementPlan?.TimeRemaining} เดือน
                      </h1>
                    </div>
                  </div> */}
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      จำนวนเงินทั้งหมด
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingRetirementPlan?.TotalBalance} บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>จำนวนเงินคงเหลือ</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {(savingRetirementPlan?.TargetAmount -
                          savingRetirementPlan?.TotalBalance).toLocaleString()}{" "}
                        บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>เหลือเวลาอีก</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingRetirementPlan?.TimeRemaining} เดือน
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
export default RetirementInvestmentDashboard;
