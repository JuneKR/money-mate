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
  Emergency_ID: number;
  Goal_ID: number;
  Retirement_ID: number;
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
            className="py-2 rounded shadow-2xl bg-gray-50"
          >
            <p
              style={{ padding: "0 1rem" }}
              className="text-2xl font-bold text-white "
            >
              ภาพรวม
            </p>
          </div>
          <div className="py-5 ">
            <div className="grid grid-cols-2 transition duration-300 delay-150 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-900 via-pink-800 to-purple-800 hover:delay-300 hover:from-purple-500 hover:to-pink-800">
              <div className="flex grid justify-center grid-rows-2 py-20 item-center ">
                <div>
                  <p className="font-bold">เราแนะนำให้คุณสร้างแผนการออมเงิน</p>
                </div>
                <div>
                  <p>สร้างแผนการออมเงินก่อน</p>
                </div>
              </div>
              <div className="flex justify-center py-20 item-center">
                <button
                  onClick={handleSavingSelectionPage}
                  className="px-4 py-2 font-bold text-white duration-300 bg-purple-500 rounded shadow-lg animate-bounce shadow-pink-500/50"
                >
                  เริ่มสร้างแผนการออมเงินเลย!
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div
              style={{ backgroundColor: "#1D1D41" }}
              className="w-full h-24 h-full py-2 shadow-2xl rounded-xl"
            >
              <div className="px-5 pb-5">
                <div className="grid grid-cols-2 ">
                  <div className="py-3 text-xl font-bold text-white border-b-2 border-gray-500">
                    <p>ความก้าวหน้าการออมเงินของคุณ</p>
                  </div>
                  <div className="flex justify-end py-3 border-b-2 border-gray-500 item-center">
                    {/* <p className="text-white">จัดเรียง</p> */}
                  </div>
                </div>
              </div>
              {!savingPlans.length ? (
                <div className="p-20">
                  <p className="flex justify-center text-2xl font-bold text-gray-200 item-center">
                    คุณยังไม่มีแผนการออมเงิน ได้โปรดสร้างแผนการออม
                  </p>
                </div>
              ) : (
                <div className="px-5 pb-5">
                  {savingPlans.map((savingPlan) => (
                    <LandingSavingPlanCard key={savingPlan.PlanName} saving={savingPlan} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="pt-10">
            <div
              style={{ backgroundColor: "#1D1D41" }}
              className="w-full h-24 h-full py-2 shadow-2xl rounded-xl"
            >
              <div className="px-5 pb-5">
                <div className="grid grid-cols-2 ">
                  <div className="py-3 text-xl font-bold text-white border-b-2 border-gray-500">
                    <p>การลงทุนทั้งหมดของคุณ</p>
                  </div>
                  <div className="flex justify-end py-3 border-b-2 border-gray-500 item-center">
                    {/* <p className="text-white">จัดเรียง</p> */}
                  </div>
                </div>
              </div>
              {!investmentPlans.length ? (
                <div className="p-20">
                  <p className="flex justify-center text-2xl font-bold text-gray-200 item-center">
                    คุณยังไม่มีแผนการลงทุน ได้โปรดสร้างแผนการออมถึงจะสามารถสร้างแผนการลงทุนได้
                  </p>
                </div>
              ) : (
                <div className="px-5 pb-5">
                  {investmentPlans.map((investmentPlan) => (
                    <LandingInvestmentPlanCard key={investmentPlan.Portfolio_ID} investmentPlanData={investmentPlan} />
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
