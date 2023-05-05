import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Progress from "@/components/SavingEmergency/EmergencyGraphComponent/Progress1";
import SavingGraph from "@/components/SavingEmergency/EmergencyGraphComponent/savingGraph";
import Box from "@mui/material/Box";
import ModleButtonForm1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/emergencyInvestmentDashBoardModalForm1";
import EmergencyFundsDetailsTable from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyFundsDetailsTable";
import Pie1 from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CachedIcon from "@mui/icons-material/Cached";
import icon1 from "@/images/Icon/กระปุก2.png";
import Image from "next/image";
import GoalAccordion from "@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalAccordion";
import { IPortfolioItem, initialInvestmentPortfolioAllocation } from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyMyPortForm";

export interface SavingEmergencyPlan {
  Emergency_ID: number | any;
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

export interface IPackageAllocation {
  Package_ID: number,
  Fund_ID: number,
  PolicyDesc: string,
  FundAbbrName: string,
  OneYearReturns: number,
  AllocationRatio: number
}

const initialSavingEmergencyPlan: SavingEmergencyPlan = {
  Emergency_ID: 1,
  LastUpdate: "",
  MonthlyExpense: 0,
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

export const initialPortfolioPackageAllocation: IPackageAllocation[] = [];

const EmergencyInvestmentDashboard = () => {
  const urlServer = "http://localhost:8080/";
  const [savingEmergencyPlan, setSavingEmergencyPlan] = useState<SavingEmergencyPlan>(initialSavingEmergencyPlan);
  const [investmentPortfolio, setInvestmentPortfolio] = useState(initialPortfolio);
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] = useState<IPortfolioItem[]>([]);
  const [portfolioPackage, setPortfolioPackage] = useState();
  const [portfolioPackageAllocation, setPortfolioPackageAllocation] = useState<IPackageAllocation[]>([]);

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
        const savingEmergencyResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/emergency`,
          {
            credentials: "include",
          }
        );
        const savingEmergency = await savingEmergencyResponse.json();
        setSavingEmergencyPlan(savingEmergency);

        //Fetch Saving Emergency Investment Portfolio
        const emergencyInvestmentReponse = await fetch(
          `${urlServer}emergency/${savingEmergency.Emergency_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        console.log("savingEmergency.Emergency_ID", savingEmergency.Emergency_ID);
        const emergencyInvestmentPortfolio = await emergencyInvestmentReponse.json();
        setInvestmentPortfolio(emergencyInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(`${urlServer}investment/portfolio/${emergencyInvestmentPortfolio.Portfolio_ID}/allocation`, {
          credentials: "include",
        });
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);

        //Fetch Portfolio Package by Package Id
        const packageResponse = await fetch(
          `${urlServer}portfolio/package/${emergencyInvestmentPortfolio.Package_ID}`,
          {
            credentials: "include",
          }
        );
        const portfolioPackage = await packageResponse.json();
        setPortfolioPackage(portfolioPackage)
        
        //Fetch Portfolio Package Allocation by Package Id
        const packageAllocationResponse = await fetch(
          `${urlServer}portfolio/package/${emergencyInvestmentPortfolio.Package_ID}/allocations`,
          {
            credentials: "include",
          }
        );
        const portfolioPackageAllocation = await packageAllocationResponse.json();
        setPortfolioPackageAllocation(portfolioPackageAllocation);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, []);

  const router = useRouter();

  const handleEmergencyInvestmentPortfolio = () => {
    router.push("/EmergencyPages/emergencyInvestmentPortfolio");
  };

  const handleEmergencyInvestmentTransaction = () => {
    router.push("/EmergencyPages/emergencyInvestmentTransaction");
  };
  const targetAmountDisplay = Number(savingEmergencyPlan.TargetAmount);
  const monthlySavingDisplay = Number(savingEmergencyPlan.MonthlySaving);

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
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-pink-500"
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
                    <ModleButtonForm1
                      title={""}
                      savingEmergency={savingEmergencyPlan}
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
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-pink-500"
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
                    savingEmergency={savingEmergencyPlan}
                    savingInvestmentPort={investmentPortfolio}
                  />
                  <p>หมายเหตุ....</p>
                </div>
              </div>

              <div className="py-5 py-10 shadow-2xl">
                <div
                  className="py-2 rounded bg-gradient-to-r from-purple-900 to-pink-500"
                >
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
                    <Pie1 
                      title={investmentPortfolio.PortfolioName} 
                      investmentPortfolioAllocation={investmentPortfolioAllocation}
                    />
                  </div>
                  <div className="flex justify-center col-span-3 border-blue-500 item-center boder ">
                    <EmergencyFundsDetailsTable
                      title={""}
                      investmentPortfolio={investmentPortfolio}
                      investmentPortfolioAllocation={investmentPortfolioAllocation}
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
                          {/* To display balance of emergency plan by decrease with investment portfolio value */}
                          {savingEmergencyPlan?.TotalBalance - investmentPortfolio.TotalValue} บาท
                        </h1>
                      </div>
                    </div>
                    <div className="flex grid items-center justify-center px-3 py-5 border-r border-black grid-ros-2">
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
                        <div className="flex grid items-center justify-center grid-rows-2">
                          <button onClick={handleEmergencyInvestmentPortfolio}>
                            <div className="flex items-center justify-center">
                              <AddIcon />
                            </div>
                          </button>

                          <div>
                            <p>ซื้อกองทุน</p>
                          </div>
                        </div>
                        <div className="flex grid items-center justify-center grid-rows-2">
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
                </div>
              </div>
              
              <div
                  style={{ backgroundColor: "#1D1D41" }}
                  className="shadow-2xl bg-gray-50 mb-5"
              >
                <h1 className="flex justify-center py-4 font-bold rounded bg-gradient-to-r from-purple-900 to-red-500">พอร์ตการลงทุนที่แนะนำในปัจจุบัน</h1>
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
                    {investmentPortfolioAllocation.map((item) => {
                      const packageItem = portfolioPackageAllocation.find((packageItem) => item.FundAbbrName === packageItem.FundAbbrName);
                      return (
                        <div className="mb-4" key={item.PortfolioItem_ID}>
                          <GoalAccordion
                            savingPlan={savingEmergencyPlan}
                            investmentPortfolio={investmentPortfolio}
                            portfolioItem={item}
                            portfolioPackage={portfolioPackage}
                            portfolioPackageAllocation={packageItem}
                          />
                        </div> 
                      )
                    })}
                    </div>
                  </div>
              </div>
                            
              <div
                className="py-2 rounded bg-gradient-to-r from-purple-900 to-pink-500"
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
                    <div>
                      <Progress
                        title={"my bar"}
                        progress={`${savingEmergencyPlan?.Progression}%`}
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
                        {savingEmergencyPlan?.TargetAmount}
                      </h1>
                    </div>
                  </div>
                  <div className="border-r-2 border-gray-300 ">
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>ระยะเวลาในการออม</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingEmergencyPlan?.TimePeriod} เดือน
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      จำนวนเงินทั้งหมด
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingEmergencyPlan?.TotalBalance} บาท
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center py-3 text-white">
                      <h1>จำนวนเงินคงเหลือ</h1>
                    </div>
                    <div className="flex items-center justify-center py-3">
                      <h1 className="font-bold text-white">
                        {savingEmergencyPlan?.TargetAmount -
                          savingEmergencyPlan?.TotalBalance}{" "}
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
                        {savingEmergencyPlan?.TimeRemaining} เดือน
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
