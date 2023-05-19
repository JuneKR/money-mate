import React, { useState, useEffect } from "react";
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import icon2 from "@/images/Icon/กระปุก3.png";
import icon3 from "@/images/Icon/กระปุก4.png";
import { useRouter } from "next/router";

interface SavingPlan {
  Emergency_ID?: number;
  Goal_ID?: number;
  Retirement_ID?: number;
  PlanName: string;
  TargetAmount: number;
  TimePeriod: string;
  TotalBalance: number;
  Progression: number;
  User_ID: number;
}

interface LandingSavingPlanCardProps {
  // key: any;
  saving: SavingPlan;
}

const LandingSavingPlanCard: React.FC<LandingSavingPlanCardProps> = (props) => {
  const { saving } = props;
  const router = useRouter();
  const targetAmount2 = Number(saving.TargetAmount);
  const totalBalance2 = Number(saving.TotalBalance);
  const formatTargetAmount = targetAmount2.toLocaleString();
  const formatTotalBalance = totalBalance2.toLocaleString();
  const isEmergencyPlan = !!saving?.Emergency_ID;
  const isGoalPlan = !!saving?.Goal_ID;
  const isRetirementPlan = !!saving?.Retirement_ID;
  const [showModal, setShowModal] = useState<boolean>(false);

  function checkProgress(progress: number) {
    if (progress >= 100) {
      setShowModal(true);
    }
  }
  useEffect(() => {
    checkProgress(saving?.Progression);
  }, [saving?.Progression]);

  let bgColorClass = "";
  let icon: string = "";
  if (isEmergencyPlan) {
    // handle emergency plan
    bgColorClass = "bg-custom-emergencyPlanHeader dark:bg-gradient-to-r from-purple-900 to-pink-500";
  } else if (isGoalPlan) {
    // handle goal plan
    bgColorClass = "bg-custom-goalBasedPlanHeader dark:bg-gradient-to-r from-purple-900 to-red-500";
  } else if (isRetirementPlan) {
    bgColorClass = "bg-custom-retirementPlanHeader dark:bg-gradient-to-r from-purple-900 to-green-500";
  }

  const handleClick = () => {
    if (isEmergencyPlan) {
      router.push("/EmergencyPages/emergencyDashboard");
    } else if (isGoalPlan) {
      router.push("/GoalBasedPages/goalBasedDashboard");
    } else if (isRetirementPlan) {
      router.push("/RetirementPages/retirementDashboard");
    }
  };
  return (
    <div className="px-5 pb-10">
      <div
        // key={index}
        //, backgroundColor: "#27264E"
        style={{ alignItems: "center" }}
        className="relative pb-5 text-black shadow-2xl bg-custom-innercard dark:bg-custom-darkInnercard dark:text-white"
      >
        <div
          style={{ alignItems: "center" }}
          className="relative grid grid-cols-1 gap-5 px-3 py-10 text-white md:grid-cols-1 lg:grid-cols-3"
        >
          <div className="grid grid-rows-2 px-3 py-3">
            <div className="absolute top-0 left-0 p-5">
              <div className={`px-3 py-3 rounded-lg ${bgColorClass}`}>
                <p className="flex justify-center text-xl font-bold item-center">
                  {/* ออมเงินเผื่อฉุกเฉิน */}
                  {saving?.PlanName}
                </p>
              </div>
            </div>
            <div className="mt-10">
              <div
                // style={{ backgroundColor: "#6259E8" }}
                className="px-3 py-3 text-white rounded-lg shadow-2xl bg-custom-toppicPlain dark:bg-indigo-500"
              >
                {showModal ? (
                  <p className="flex justify-center text-xl font-bold item-center">
                    {/* ออมเงินเผื่อฉุกเฉิน */}
                    สำเร็จแล้ว!
                  </p>
                ) : (
                  <p className="flex justify-center text-xl font-bold item-center">
                    {/* ออมเงินเผื่อฉุกเฉิน */}
                    {formatTotalBalance} / {formatTargetAmount}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="font-bold">
            <div>
              <Image src={icon1} alt="Your Image" className="pb-3" />
              <Progress title={""} progress={`${saving.Progression}%`} />
              {/* <Progress title={""} progress={"90%"} /> */}
            </div>
          </div>
          <div className="flex grid justify-center grid-cols-2 gap-5 py-3 font-bold text-black item-center dark:text-white">
            <p>จำนวนเงินออมเป้าหมาย</p>
            {formatTargetAmount} บาท
            <p>ออมไปแล้ว</p>
            {formatTotalBalance} บาท
          </div>
          <a
            onClick={handleClick}
            className="absolute flex justify-center text-black cursor-pointer dark:text-white top-3 right-3 item-center hover:text-blue-800"
          >
            ดูข้อมูลเพิ่มเติม &gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingSavingPlanCard;
