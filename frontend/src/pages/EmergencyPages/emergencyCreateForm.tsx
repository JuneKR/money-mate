import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { Stepper, StepLabel, Step, Box } from "@mui/material";
import { useMultistepForm } from "@/components/SavingEmergency/EmergencyForm/useMultistepForm";
import { GoalForm } from "@/components/SavingEmergency/EmergencyForm/GoalForm";
import { PlanForm } from "@/components/SavingEmergency/EmergencyForm/PlanForm";
import InvestmentForm from "@/components/SavingEmergency/EmergencyForm/InvestmentForm";

type FormData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
  riskLevel: number;
  returnRate: number;
};

const initialData: FormData = {
  expense: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
  riskLevel: 0,
  returnRate: 0,
};

const emergencyCreateForm = () => {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <GoalForm {...data} updateFields={updateFields} />,
      <PlanForm {...data} updateFields={updateFields} />,
      <InvestmentForm selected={false} {...data} updateFields={updateFields} />,
    ]);
  //   console.log("create formmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
  //   console.log(data);

  const urlServer = "http://localhost:8080/";
  const [uID, setuID] = useState([]);
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();
        const uID = userProfile.User_ID;
        setuID(uID);
      } catch (error) {
        console.log("fetch User Profile Error: ", error);
      }
    }
    fetchUserProfile();
  }, []);
  console.log(data);
  //   const updateEmergencyPlanData = {
  //     plan_name: "แผนออมเงินสำรองฉุกเฉิน",
  //     target_amount: data.targetAmount,
  //     time_period: data.period,
  //     initial_saving: data.totalBalance,
  //     monthly_saving: data.monthlySaving,
  //     start_date: "2023-02-26",
  //     last_update: "2023-02-26 10:2:30",
  //     total_balance: data.totalBalance,
  //     time_remaining: data.timeRemaining,
  //     monthly_expense: data.expense,
  //     progression: 0,
  //     user_id: uID,
  //   };
  //   console.log("updateEmergencyPlanData");
  //   console.log(updateEmergencyPlanData);

  const createEmergencyPlan = async () => {
    console.log(data);
    // const goal = data.targetAmount * data.period;
    const createEmergencyPlanData = {
      plan_name: "แผนออมเงินสำรองฉุกเฉิน",
      target_amount: data.targetAmount,
      time_period: data.period,
      initial_saving: data.totalBalance,
      monthly_saving: data.monthlySaving,
      start_date: "2023-02-26",
      last_update: "2023-02-26 10:2:30",
      total_balance: data.totalBalance,
      time_remaining: data.timeRemaining,
      monthly_expense: data.expense,
      progression: 0,
      user_id: uID,
    };
    console.log(createEmergencyPlanData);
    try {
      console.log("Called");
      console.log(`${urlServer}saving/emergency`);
      const response = await fetch(`${urlServer}saving/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createEmergencyPlanData),
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        console.log("done........................");
        console.log(createEmergencyPlanData);
        // setShowCongratulatoryMessage(true);
        router.push("/EmergencyPages/emergencyDashboard");
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  //     e.preventDefault();
  //     if (!isLastStep) return next();
  //     alert("สร้างแผนการออมเงินสำเร็จแล้ว");
  //     await updateEmergencyPlan();
  //   }
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLastStep) return next();
    alert("สร้างแผนการออมเงินสำเร็จแล้ว");
    await createEmergencyPlan();
  };
  return (
    <main className={styles.main}>
      <Sidebar title="My Sidebar" />
      <div className="w-full xl:w-8/12">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#6259E8",
          }}
          className="py-2 rounded-lg"
        >
          <p
            style={{ padding: "0 1rem" }}
            className="font-bold text-white text-2xl"
          >
            ออมเงินเผื่อฉุกเฉิน
          </p>
        </div>

        {/* <div style={{ width: "100%", height: "100%" }} className="py-4 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 center-stepper"> */}
        <div
          className="rounded-b-2xl pb-5 shadow-2xl "
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
              </Stepper>
            </Box>{" "}
          </div>
          {/* </div> */}
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
              <div className="p-5">
                {!isFirstStep && (
                  <button
                    type="button"
                    onClick={back}
                    className="px-4 py-2 font-bold text-white bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none"
                  >
                    ย้อนกลับ
                  </button>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none"
                >
                  {isLastStep ? "สร้างแผนการออมเงิน" : "ถัดไป"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default emergencyCreateForm;
