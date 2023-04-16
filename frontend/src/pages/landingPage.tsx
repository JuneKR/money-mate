import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import LandingSavingPlanCard from "@/components/LandingPageComponents/landingSavingPlanCard";
import LandingInvestmentPlanCard from "@/components/LandingPageComponents/landingInvestmentPlanCard";

interface LandingPageProps {
  index: number;
}

interface SavingPlan {
  PlanName: string;
  TargetAmount: number;
  TimePeriod: string;
  TotalBalance: number;
  Progression: number;
  User_ID: number;
}

interface InvestmentPlan {
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
  createdAt: string;
  updatedAt: string;
}

interface RowData {
  data: {
    goalID: string;
    goalName: string;
    goalFunds: string;
    cBalance: string;
    goalProgression: string;
  };
}
const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const urlServer = "http://localhost:8080/";
  const [displayData, setdisplayData] = useState<RowData[]>([]);
  const [savingPlans, setSavingPlans] = useState<SavingPlan[]>([]);
  const [investmentPlans, setInvestmentPlans] = useState<InvestmentPlan[]>([]);

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

        //Fetch Goal-Based Saving Plan
        const savingGoalResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/goal`,
          {
            credentials: "include",
          }
        );
        const savingGoal = await savingGoalResponse.json();

        
        const savingRetirementResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/retirement`,
          {
            credentials: "include",
          }
        );
        const savingRetirement = await savingRetirementResponse.json();

        //Fetch Investment Plan
        const investmentPlanResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/investment/portfolios`,
          {
            credentials: "include",
          }
        );
        const investmentPlan = await investmentPlanResponse.json();
        setInvestmentPlans(investmentPlan);
        
        const allSavingPlans: SavingPlan[] = [];
        if (savingEmergency.PlanName) {
          allSavingPlans.push(savingEmergency);
        }

        if (savingGoal.PlanName) {
          allSavingPlans.push(savingGoal);
        }

        if (savingRetirement.PlanName) {
          allSavingPlans.push(savingRetirement);
        }

        setSavingPlans(allSavingPlans);
        console.log("All Saving Plan", allSavingPlans);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);

  // function handleNewData(data: RowData) {
  //   setdisplayData([...displayData, data]);
  // }
  // function handleDeleteRow(index: LandingPageProps) {
  //   const newRows = [...displayData];
  //   setdisplayData(newRows);
  // }

  const router = useRouter();
  const handleSavingSelectionPage = () => {
    router.push("/savingSelectionPage");
  };
  const handleLandingPageDetails = () => {
    router.push("/landingPageDetails");
  };

  return (
    <>
      <Sidebar title="My Sidebar" />
      <main className={styles.main}>
        <div style={{ padding: "0 4rem" }} className="w-full xl:w-8/12">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#6259E8",
            }}
            className=" py-2 rounded bg-gray-50 shadow-2xl "
          >
            <p
              style={{ padding: "0 1rem" }}
              className="font-bold text-white text-2xl "
            >
              ภาพรวม
            </p>
          </div>
          <div className="py-5 ">
            <div className="grid grid-cols-2 rounded-3xl transition duration-300 delay-150 bg-gradient-to-r from-blue-900 via-pink-800 to-purple-800 hover:delay-300 hover:from-purple-500 hover:to-pink-800 shadow-2xl">
              <div className="flex justify-center item-center py-20 grid grid-rows-2 ">
                <div>
                  <p className="font-bold">เราแนะนำให้คุณสร้างแผนการออมเงิน</p>
                </div>
                <div>
                  <p>สร้างแผนการออมเงินก่อน</p>
                </div>
              </div>
              <div className="flex justify-center item-center py-20">
                <button
                  onClick={handleSavingSelectionPage}
                  className="animate-bounce bg-purple-500 shadow-lg shadow-pink-500/50 duration-300 text-white font-bold py-2 px-4 rounded"
                >
                  เริ่มสร้างแผนการออมเงินเลย!
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div
              style={{ backgroundColor: "#1D1D41" }}
              className="w-full h-full py-2 h-24 rounded-xl shadow-2xl"
            >
              <div className="px-5 pb-5">
                <div className=" grid grid-cols-2">
                  <div className="border-b-2 border-gray-500 font-bold py-3 text-white text-xl">
                    <p>ความก้าวหน้าการออมเงินของคุณ</p>
                  </div>
                  <div className="flex item-center justify-end border-b-2 border-gray-500 py-3">
                    <p className="text-white">จัดเรียง</p>
                  </div>
                </div>
              </div>
              {!savingPlans.length ? (
                <div className="p-20">
                  <p className="text-gray-200 flex justify-center item-center text-2xl font-bold">
                    คุณยังไม่มีแผนการออมเงิน ได้โปรดสร้างแผนการออม
                  </p>
                </div>
              ) : (
                <div className="pb-5 px-5">
                  {savingPlans.map((savingPlan) => (
                    <LandingSavingPlanCard saving={savingPlan} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="pt-10">
            <div
              style={{ backgroundColor: "#1D1D41" }}
              className="w-full h-full py-2 h-24 rounded-xl shadow-2xl"
            >
              <div className="px-5 pb-5">
                <div className=" grid grid-cols-2">
                  <div className="border-b-2 border-gray-500 font-bold py-3 text-white text-xl">
                    <p>ความก้าวหน้าการลงทุนของคุณ</p>
                  </div>
                  <div className="flex item-center justify-end border-b-2 border-gray-500 py-3">
                    <p className="text-white">จัดเรียง</p>
                  </div>
                </div>
              </div>
              {!investmentPlans.length ? (
                <div className="p-20">
                  <p className="text-gray-200 flex justify-center item-center text-2xl font-bold">
                    คุณยังไม่มีแผนการลงทุน ได้โปรดสร้างแผนการออมถึงจะสามารถสร้างแผนการลงทุนได้
                  </p>
                </div>
              ) : (
                <div className="pb-5 px-5">
                  {investmentPlans.map((investmentPlan) => (
                    <LandingInvestmentPlanCard investmentPlanData={investmentPlan} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default LandingPage;
