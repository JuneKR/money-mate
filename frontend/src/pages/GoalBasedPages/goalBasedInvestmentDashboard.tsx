import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import SavingGraph from "@/components/SavingForGoal/SavingGoalGraphComponent/savingGraph";
import Box from "@mui/material/Box";
import ModleButtonForm from "@/components/SavingForGoal/SavingGoalInvestmentPlan/sGoalInvestmentDashBoardModalForm";
import GoalFundsDetailsTable from "@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalMyPortForm/goalFundsDetailsTable";
import Pie from "@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalInvestmentPortfolioPackageComponents/sGoalInvestmentPieChartPortfolio";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CachedIcon from "@mui/icons-material/Cached";
import icon1 from "@/images/Icon/กระปุก2.png";
import Image from "next/image";
import GoalAccordion from "@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalAccordion";
import {
  IPortfolioItem,
  initialInvestmentPortfolioAllocation,
} from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyMyPortForm";
import {
  IPortfolioPackage,
  IPackageAllocation,
  initialPackage,
  initialPortfolioPackageAllocation,
} from "../EmergencyPages/emergencyInvestmentDashboard";

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
  Retirement_ID: 0,
};

const GoalInvestmentDashboard = () => {
  const urlServer = "http://localhost:8080/";
  const [savingGoalPlan, setSavingGoalPlan] = useState<SavingGoalPlan>(
    initialSavingGoalPlan
  );
  const [investmentPortfolio, setInvestmentPortfolio] =
    useState(initialPortfolio);
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] =
    useState<IPortfolioItem[]>([]);
  const [portfolioPackage, setPortfolioPackage] =
    useState<IPortfolioPackage>(initialPackage);
  const [portfolioPackageAllocation, setPortfolioPackageAllocation] = useState<
    IPackageAllocation[]
  >([]);

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

  // Fetch APIs
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();

        //Fetch Saving Goal Plan
        const savingGoalResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/goal`,
          {
            credentials: "include",
          }
        );
        const savingGoal = await savingGoalResponse.json();
        setSavingGoalPlan(savingGoal);

        //Fetch Saving Goal Investment Portfolio
        const goalInvestmentReponse = await fetch(
          `${urlServer}goal/${savingGoal.Goal_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const goalInvestmentPortfolio = await goalInvestmentReponse.json();
        setInvestmentPortfolio(goalInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(
          `${urlServer}investment/portfolio/${goalInvestmentPortfolio.Portfolio_ID}/allocation`,
          {
            credentials: "include",
          }
        );
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);

        //Fetch Portfolio Package by Package Id
        const packageResponse = await fetch(
          `${urlServer}portfolio/package/${goalInvestmentPortfolio.Package_ID}`,
          {
            credentials: "include",
          }
        );
        const portfolioPackage = await packageResponse.json();
        setPortfolioPackage(portfolioPackage);

        //Fetch Portfolio Package Allocation by Package Id
        const packageAllocationResponse = await fetch(
          `${urlServer}portfolio/package/${goalInvestmentPortfolio.Package_ID}/allocations`,
          {
            credentials: "include",
          }
        );
        const portfolioPackageAllocation =
          await packageAllocationResponse.json();
        setPortfolioPackageAllocation(portfolioPackageAllocation);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, []);

  const router = useRouter();

  const handleGoalInvestmentPortfolio = () => {
    router.push("/GoalBasedPages/goalInvestmentPortfolio");
  };

  const handleGoalInvestmentTransaction = () => {
    router.push("/GoalBasedPages/goalInvestmentTransaction");
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
              className="py-4 text-lg font-bold text-white rounded-lg"
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-red-500"
                >
                  <p
                    style={{ padding: "0 1rem" }}
                    className="text-2xl font-bold text-white"
                  >
                    การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
                  </p>
                </div>
                <div className="pb-10">
                  <div className="rounded-lg shadow-2xl">
                    <ModleButtonForm
                      title={""}
                      savingGoal={savingGoalPlan}
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
                  }}
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-red-500"
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
                    savingGoal={savingGoalPlan}
                    savingInvestmentPort={investmentPortfolio}
                  />
                </div>
              </div>

              <div className="py-5 py-10 shadow-2xl">
                <div className="py-2 rounded bg-gradient-to-r from-purple-900 to-red-500">
                  <div>
                    <p
                      style={{ padding: "0 1rem" }}
                      className="text-2xl font-bold text-white"
                    >
                      {investmentPortfolio.PortfolioName}
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
                    <Pie
                      title={investmentPortfolio.PortfolioName}
                      portfolioPackageAllocation={portfolioPackageAllocation}
                    />
                  </div>
                  <div className="flex justify-center col-span-3 border-blue-500 item-center boder ">
                    <GoalFundsDetailsTable
                      title={""}
                      portfolioPackage={portfolioPackage}
                      portfolioPackageAllocation={portfolioPackageAllocation}
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
                        <h1>เงินออมฉุกเฉิน</h1>
                      </div>
                      <div className="flex items-center justify-center">
                        <h1 className="font-bold">
                          {/* To display balance of goal plan by decrease with investment portfolio value */}
                          {savingGoalPlan?.TotalBalance -
                            investmentPortfolio.TotalValue}{" "}
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
                          <button onClick={handleGoalInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <AddIcon />
                            </div>
                          </button>

                          <div>
                            <p>ซื้อกองทุน</p>
                          </div>
                        </div>
                        <div className="flex grid items-center justify-center grid-rows-2">
                          <button onClick={handleGoalInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <RemoveIcon />
                            </div>
                          </button>
                          <div>
                            <p>ขายกองทุน</p>
                          </div>
                        </div>
                      </div>
                      <button onClick={handleGoalInvestmentTransaction}>
                        <h1 className="flex items-center justify-center pb-5">
                          <CachedIcon />
                          ดูประวัติการทำรายการ
                        </h1>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ backgroundColor: "#1D1D41" }}
                className="mb-5 shadow-2xl bg-gray-50"
              >
                <h1 className="flex justify-center py-4 font-bold rounded bg-gradient-to-r from-purple-900 to-red-500">
                  พอร์ตการลงทุนที่แนะนำในปัจจุบัน
                </h1>
                <div className="py-3">
                  <div className="grid grid-cols-3 py-2">
                    <div className="flex justify-center">
                      <h1>ประเภทกองทุนรวม</h1>
                    </div>
                    <div className="flex justify-center">
                      <h1>สัดส่วนเทียบกับพอร์ต (%)</h1>
                    </div>
                    <div className="flex justify-center">
                      <h1>เงินลงทุนเทียบกับพอร์ต (บาท)</h1>
                    </div>
                  </div>
                  <div className="p-5">
                    {Array.isArray(investmentPortfolioAllocation) &&
                      investmentPortfolioAllocation.map((item) => {
                        const packageItem = portfolioPackageAllocation.find(
                          (packageItem) =>
                            item.FundAbbrName === packageItem.FundAbbrName
                        );
                        return (
                          <div className="mb-4" key={item.PortfolioItem_ID}>
                            <GoalAccordion
                              savingPlan={savingGoalPlan}
                              investmentPortfolio={investmentPortfolio}
                              portfolioItem={item}
                              portfolioPackage={portfolioPackage}
                              portfolioPackageAllocation={packageItem}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div className="py-2 rounded bg-gradient-to-r from-purple-900 to-red-500">
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
                        progress={`${savingGoalPlan?.Progression}%`}
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
                        {savingGoalPlan?.TargetAmount}
                      </h1>
                    </div>
                  </div>
                  <div className="border-r-2 border-gray-300 ">
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>ระยะเวลาในการออม</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingGoalPlan?.TimePeriod} เดือน
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      จำนวนเงินทั้งหมด
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingGoalPlan?.TotalBalance} บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>จำนวนเงินคงเหลือ</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingGoalPlan?.TargetAmount -
                          savingGoalPlan?.TotalBalance}{" "}
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
                        {/* {yearsToYearsMonthsDays(savingGoalPlan?.TimeRemaining)} เดือน */}
                        {yearsToYearsMonthsDays(
                          (savingGoalPlan?.TimePeriod / 12).toString()
                        )}{" "}
                        เดือน
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
export default GoalInvestmentDashboard;
