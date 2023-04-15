import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { Stepper, StepLabel, Step, Box } from "@mui/material";
import { useMultistepForm } from "@/components/SavingEmergency/EmergencyForm/useMultistepForm";
import { SGoalForm } from "@/components/SavingForGoal/SavingGoalForm/sGoalForm";
import { PlanForm } from "@/components/SavingForGoal/SavingGoalForm/sGoalPlanForm";
import SGInvestmentForm from "@/components/SavingForGoal/SavingGoalForm/sGoalInvestmentForm";
import PortfolioPackage from "@/components/SavingEmergency/EmergencyForm/PortfolioPackage";
import { create } from "domain";

type FormData = {
  planName: string;
  targetAmount: number;
  period: number;
  monthlySaving: number;
  startDate: string;
  lastUpdate: string;
  totalBalance: number;
  timeRemaining: number;
  progression: string;
  riskLevel: number;
  returnRate: number;
};

const initialData: FormData = {
    planName: "",
    targetAmount: 0,
    period: 0,
    monthlySaving: 0,
    startDate: "",
    lastUpdate: "",
    totalBalance: 0,
    timeRemaining: 0,
    progression: "",
    riskLevel: 0,
    returnRate: 0,
};

const goalBasedCreateForm = () => {
  const router = useRouter();
  const [data, setData] = useState(initialData);
  const [showPackageStep, setShowPackageStep] = useState(false);
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [stepDesc, setStepDesc] = useState("ถัดไป");
  const [uID, setuID] = useState(1);
  const urlServer = "http://localhost:8080/";

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleInvestmentSelection = (selected: boolean) => {
    console.log("Selected Package", selected);
    setShowPackageStep(selected);
  };

  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
  } = useMultistepForm([
    <SGoalForm {...data} updateFields={updateFields} />,
    <PlanForm {...data} updateFields={updateFields} />,
    <SGInvestmentForm
      selected={false}
      {...data}
      updateFields={updateFields}
      handleInvestmentSelection={handleInvestmentSelection}
    />,
    // <PortfolioPackage {...data} updateFields={updateFields} />,
  ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStepIndex === 2) {
      if (showPackageStep) {
        return next();
      } else {
        alert("สร้างแผนการออมเงินสำเร็จแล้ว!");
        const userProfile = await getUserProfile(urlServer);
        // Set up state of User ID
        // setuID(userProfile.User_ID);
        await createEmergencyPlan(urlServer, userProfile);
        // router.push("/GoalBasedPages/goalBasedDashboard");
      }
    } else if (isLastStep) {
      alert("สร้างพอร์ตการออมเงินสำเร็จแล้ว!");
      await getUserProfile(urlServer);
      // await createEmergencyPlan();
      // await getPortfolioPackage();
      // await getPortfolioPackageAllocation();
      // await createInvestmentPortfolio();
      // await clonePortfolioPackageAllocation();
      router.push("/EmergencyPages/emergencyInvestmentDashboard");
    } else {
      return next();
    }
  };

  useEffect(() => {
    if (currentStepIndex === 2 && showPackageStep) {
      setStepDesc("ถัดไป");
    } else if (currentStepIndex === 2 && !showPackageStep) {
      setStepDesc("สร้างแผนการออมเงิน");
    } else {
      setStepDesc("สร้างพอร์ตการออมเงิน");
    }
  }, [currentStepIndex, showPackageStep]);

  const getUserProfile = async (urlServer: string) => {
    try {
      // Fetch User Profile
      const profileResponse = await fetch(`${urlServer}user/profile`, {
        credentials: "include",
      });
      const userProfile = await profileResponse.json();

      return userProfile;
    } catch (error) {
      console.log("fetch User Profile Error: ", error);

      return null;
    }
  };

  const createEmergencyPlan = async (urlServer: string, userProfile: any) => {
    const moment = require("moment-timezone");
    const now = moment().tz("Asia/Bangkok");
    const startDate = now.format("YYYY-MM-DD");
    const lastUpdate = now.format("YYYY-MM-DD HH:mm:ss");

    const defaultPlanName = "แผนออมเงิน ทริปสิงคโปร์";

    const createGoalBasedPlanData = {
      plan_name: data.planName,
      target_amount: data.targetAmount,
      time_period: data.period,
      initial_saving: data.totalBalance,
      monthly_saving: data.monthlySaving,
      start_date: startDate,
      last_update: lastUpdate,
      total_balance: data.totalBalance,
      time_remaining: data.timeRemaining,
    //   monthly_expense: data.expense,
      progression: (data.totalBalance / data.targetAmount) * 100,
      user_id: userProfile.User_ID,
      // user_id: uID,
    };
    try {
      const response = await fetch(`${urlServer}saving/goal`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createGoalBasedPlanData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      console.log(
        `Successfully Created Saving Plan By ${userProfile.FirstName}`,
        responseData
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getPortfolioPackage = async () => {
    try {
      // Fetch Portfolio Package
      const packageResponse = await fetch(
        `${urlServer}portfolio/package/risk-spectrum/${data.riskLevel}`,
        {
          credentials: "include",
        }
      );
      const portfolioPackage = await packageResponse.json();
      console.log("Package", portfolioPackage);
    } catch (error) {
      console.log("fetch Package Error: ", error);
    }
  };

  const getPortfolioPackageAllocation = async () => {
    try {
      const packageResponse = await fetch(
        `${urlServer}portfolio/package/1/allocations`,
        {
          credentials: "include",
        }
      );
    } catch (error) {
      console.log("fetch Package Error: ", error);
    }
  };

  // Generate Button Text
  const getNextButtonText = () => {
    if (currentStepIndex === 2) {
      if (showPackageStep) {
        return "ถัดไป";
      } else {
        return "สร้างแผนการออมเงิน";
      }
    } else if (isLastStep) {
      return "สร้างพอร์ตการออมเงิน";
    } else {
      return "ถัดไป";
    }
  };

  return (
    <main className={styles.main}>
      <Sidebar title="My Sidebar" />
      <div className="w-full xl:w-8/12">
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-red-500"
        >
          <p
            style={{ padding: "0 1rem" }}
            className="font-bold text-white text-2xl"
          >
            ออมเงินเพื่อเป้าหมาย
          </p>
        </div>

        <div
          className="rounded-b-2xl pb-5 shadow-2xl"
          style={{ backgroundColor: "#1D1D41" }}
        >
          <div className="py-10">
            <Box sx={{ width: "100%", padding: "0 4rem" }}>
              <Stepper activeStep={currentStepIndex}>
                <Step>
                  <StepLabel>
                    <span className="text-white text-xl font-bold bg-purple-600 p-2 rounded-full shadow-2xl">
                      เลือกเป้าหมาย
                    </span>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <span className="text-white text-xl font-bold bg-purple-700 p-2 rounded-full shadow-2xl">
                      สร้างเป้าหมาย
                    </span>
                  </StepLabel>
                </Step>
                <Step>
                  <StepLabel>
                    <span className="text-white text-xl font-bold bg-purple-900 p-2 rounded-full shadow-2xl">
                      ตรวจสอบและเลือกแผน
                    </span>
                  </StepLabel>
                </Step>
                {showPackageStep && (
                  <Step>
                    <StepLabel>
                      <span className="text-white text-xl font-bold bg-purple-900 p-2 rounded-full shadow-2xl">
                        เลือกพอร์ตการลงทุน
                      </span>
                    </StepLabel>
                  </Step>
                )}
              </Stepper>
            </Box>{" "}
          </div>

          <form onSubmit={onSubmit}>
            {step}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                gap: ".5rem",
                justifyContent: "flex-end",
              }}
            >
              <div className="p-5 grid grid-cols-2 gap-5">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="px-4 py-2 font-bold text-white bg-indigo-500 hover:bg-blue-500 rounded shadow focus:shadow-outline focus:outline-none  transition delay-150"
                  >
                    ย้อนกลับ
                  </button>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white  bg-indigo-500 hover:bg-blue-500 rounded shadow focus:shadow-outline focus:outline-none transition delay-150"
                >
                  {/* {isLastStep ? stepDesc : "ถัดไป"} */}
                  {getNextButtonText()}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default goalBasedCreateForm;
