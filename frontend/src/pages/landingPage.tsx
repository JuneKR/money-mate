import React, { useEffect, useState, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import LandingSavingPlanCard from "@/components/LandingPageComponents/landingSavingPlanCard";

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
            className="py-2 rounded shadow-2xl"
          >
            <p
              style={{ padding: "0 1rem" }}
              className="font-bold text-white text-2xl"
            >
              ภาพรวม
            </p>
          </div>
          <div className="py-5 ">
            <div className="grid grid-cols-2 rounded-3xl transition duration-300 delay-150 bg-gradient-to-r from-blue-900 via-pink-800 to-purple-800 hover:delay-300 hover:from-purple-500 hover:to-pink-800 shadow-2xl">
              <div className="flex justify-center item-center py-20 grid grid-rows-2 ">
                <div>
                  <p className="font-bold text-white">เราแนะนำให้คุณสร้างแผนการออมเงิน</p>
                </div>
                <div>
                  <p className="text-white">สร้างแผนการออมเงินก่อน</p>
                </div>
              </div>
              <div className="flex justify-center item-center py-20">
                <button
                  onClick={handleSavingSelectionPage}
                  className="transition ease-in-out delay-150 bg-purple-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-500 duration-300 text-white font-bold py-2 px-4 rounded"
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
              {/* <div className="pb-5 px-5">
                {displayData.map((row, index) => (
                  <div
                    key={index}
                    style={{ alignItems: "center" }}
                    className="pb-5 relative text-black border border-gray-200 "
                  >
                    <div
                      style={{ alignItems: "center" }}
                      className="relative grid grid-cols-4 text-black border border-black  "
                    >
                      <div className="font-bold py-3 ">
                        <div className="px-3 ">
                          <p
                            style={{ color: "#085385" }}
                            className="flex justify-center item-center"
                          >
                            เงินออมเป้ามายที่ {index + 1}
                          </p>
                          <p className="font-bold flex justify-center item-center">
                            ออมเงินเผื่อฉุกเฉิน
                          </p>
                        </div>
                      </div>
                      <div className="font-bold py-3">
                        <div>
                          <Image
                            src={icon1}
                            alt="Your Image"
                            className="pb-3"
                          />
                          <Progress title={""} progress={"90%"} />
                        </div>
                      </div>
                      <div className="font-bold py-3 flex justify-center item-center grid grid-rows-3">
                        <div></div>
                        <p style={{ color: "#085385" }}>จำนวนเงินออมเป้าหมาย</p>
                        <p style={{ color: "#085385" }}>ยอดเงิน</p>
                      </div>
                      <div className="font-bold py-3 grid grid-rows-3 ">
                        <p className="font-bold ">100,000 บาท</p>
                        <p className="font-bold ">20,000 บาท</p>
                      </div>
                      <a
                        onClick={handleLandingPageDetails}
                        className="absolute top-3 right-3 flex justify-center item-center cursor-pointer text-black hover:text-blue-800"
                      >
                        ดูข้อมูลเพิ่มเติม &gt;
                      </a>
                    </div>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default LandingPage;
