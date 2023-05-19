import React, { useRef, useEffect } from "react";
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import { useRouter } from "next/router";

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
interface LandingInvestmentPlanCardProps {
  // key: any;
  investmentPlanData: InvestmentPlan;
}

const LandingInvestmentPlanCard: React.FC<LandingInvestmentPlanCardProps> = (
  props
) => {
  const { investmentPlanData } = props;
  const isEmergencyPlan = !!investmentPlanData?.Emergency_ID;
  const isGoalPlan = !!investmentPlanData?.Goal_ID;
  const isRetirementPlan = !!investmentPlanData?.Retirement_ID;
  const router = useRouter();
  // const targetAmount2 = Number(investmentPlanData?.TargetAmount);
  // const totalBalance2 = Number(investmentPlanData?.TotalBalance);
  // const formatTargetAmount = targetAmount2.toLocaleString();
  // const formatTotalBalance = totalBalance2.toLocaleString();
  
  let bgColorClass = "";
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
      router.push('/EmergencyPages/emergencyInvestmentDashboard');
    } else if (isGoalPlan) {
      router.push('/GoalBasedPages/goalBasedInvestmentDashboard');
    } else if (isRetirementPlan) {
      router.push('/RetirementPages/retirementInvestmentDashboard');
    }
  };
  
  return (
    <div className="px-5 pb-10">
      <div
        // key={index}
        style={{ alignItems: "center"}}
        className="relative pb-5 text-white shadow-2xl bg-custom-innercard dark:bg-custom-darkInnercard"
      >
        <div
          style={{ alignItems: "center" }}
          className="relative gap-5 px-3 py-10 text-white"
        >
          <div className="px-3 py-3">
            <div className="">
              <div
                className={`px-3 py-3 rounded-lg ${bgColorClass}`}>
                <p className="flex justify-center text-xl font-bold item-center">
                  {investmentPlanData.PortfolioName}
                </p>
              </div>
            </div>
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

export default LandingInvestmentPlanCard;
