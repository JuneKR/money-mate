import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { Stepper, StepLabel, Step, Box } from "@mui/material";
import { useMultistepForm } from "@/components/SavingEmergency/EmergencyForm/useMultistepForm";
import { GoalForm } from "@/components/SavingEmergency/EmergencyForm/GoalForm";
import { PlanForm } from "@/components/SavingEmergency/EmergencyForm/PlanForm";
import InvestmentForm from "@/components/SavingEmergency/EmergencyForm/InvestmentForm";
import PortfolioPackage from "@/components/SavingEmergency/EmergencyForm/PortfolioPackage";
import { create } from "domain";
import { start } from "repl";

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
  const [showPackageStep, setShowPackageStep] = useState(false);
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [stepDesc, setStepDesc] = useState("ถัดไป");
  const [uID, setuID] = useState(1);
  const urlServer = "http://localhost:8080/";
  const [isSelectedPackage, setIsSelectedPackage] = useState(false);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleInvestmentSelection = (selected: boolean) => {
    console.log('Selected Package', selected) 
    setShowPackageStep(selected);
  };

  const handlePackageSelection = (selected: boolean) => {
    console.log('Selected Package', selected) 
    setIsSelectedPackage(selected);
  };

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next, goTo } =
    useMultistepForm([
      <GoalForm {...data} updateFields={updateFields} />,
      <PlanForm {...data} updateFields={updateFields} />,
      <InvestmentForm selected={false} {...data} updateFields={updateFields} handleInvestmentSelection={handleInvestmentSelection}/>,
      <PortfolioPackage {...data} updateFields={updateFields} handlePackageSelection={handlePackageSelection} />,
    ]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentStepIndex === 2) {
      if (showPackageStep) {
        return next();
      } else {
        alert('สร้างแผนการออมเงินสำเร็จแล้ว!');
        const userProfile = await getUserProfile(urlServer);
        await createEmergencyPlan(urlServer, userProfile);
        router.push("/EmergencyPages/emergencyDashboard");
      }
    }
    else if (isLastStep) {
      if (isSelectedPackage) {
        alert('สร้างพอร์ตการออมเงินสำเร็จแล้ว!');
        const userProfile = await getUserProfile(urlServer);
        await createEmergencyPlan(urlServer, userProfile);
        const savingEmergency = await getSavingEmergencyPlan(urlServer, userProfile);
        const portfolioPackage = await getPortfolioPackage(urlServer, data.riskLevel);
        const portfolioPackageAllocation = await getPortfolioPackageAllocation(urlServer, portfolioPackage);
        await createInvestmentPortfolio(urlServer, portfolioPackage, userProfile, savingEmergency);
        const investmentPortfolio = await getInvestmentPortfolio(urlServer, savingEmergency);
        await addMutualFundsToInvestmentPortfolio(urlServer, investmentPortfolio, portfolioPackageAllocation);
        router.push("/EmergencyPages/emergencyInvestmentDashboard");
      }
      else {
        alert('โปรดกดเลือกพอร์ตก่อน');
      }
    } 
    else {
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
  }

  const createEmergencyPlan = async (urlServer: string, userProfile: any) => {

    const moment = require('moment-timezone');
    const now = moment().tz('Asia/Bangkok');
    const startDate = now.format('YYYY-MM-DD');
    const lastUpdate = now.format('YYYY-MM-DD HH:mm:ss');
    
    const defaultPlanName = "แผนออมเงินสำรองฉุกเฉิน";

    const createEmergencyPlanData = {
      plan_name: defaultPlanName,
      target_amount: data.targetAmount,
      time_period: data.period,
      initial_saving: data.totalBalance,
      monthly_saving: data.monthlySaving,
      start_date: startDate,
      last_update: lastUpdate,
      total_balance: data.totalBalance,
      time_remaining: data.timeRemaining,
      monthly_expense: data.expense,
      progression: (data.totalBalance/data.targetAmount) * 100,
      user_id: userProfile.User_ID,
    };
    try {
      const response = await fetch(`${urlServer}saving/emergency`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createEmergencyPlanData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }
  
      const responseData = await response.json();
      console.log(`Successfully Created Saving Plan By ${userProfile.FirstName}`,responseData);
    } catch (error) {
      console.error(error);
    }
  };

  const getSavingEmergencyPlan = async (urlServer: string, userProfile: any) => {
    try {
      // Fetch Saving Emergency Plan
      const savingResponse = await fetch(`${urlServer}user/${userProfile.User_ID}/saving/emergency`, {
        credentials: "include",
      });
      const savingEmergencyPlan = await savingResponse.json();
      console.log('Emergency Plan',savingEmergencyPlan);
      return savingEmergencyPlan;
    } catch (error) {
      console.log("fetch Saving Emergency Plan Error: ", error);
    }
  }

  const getPortfolioPackage = async (urlServer: string, riskSpectrum: number) => {
    try {
      // Fetch Portfolio Package
      const packageResponse = await fetch(`${urlServer}portfolio/package/risk-spectrum/${riskSpectrum}`, {
        credentials: "include",
      });
      const portfolioPackage = await packageResponse.json();
      console.log('Package', portfolioPackage);

      return portfolioPackage;
    } catch (error) {
      console.log("fetch Portfolio Package Error: ", error);

      return null;
    }
  }

  const getPortfolioPackageAllocation = async (userlServer: string, portfolioPackage: any) => {
    try {
      const packageResponse = await fetch(`${urlServer}portfolio/package/${portfolioPackage.Package_ID}/allocations`, {
        credentials: "include",
      });
      const portfolioPackageAllocation = await packageResponse.json();
      console.log('Package Allocation', portfolioPackageAllocation);
      return portfolioPackageAllocation;

    } catch (error) {
      console.log("fetch Package Error: ", error);

      return null;
    }
  }

  const createInvestmentPortfolio = async (urlServer: string, portfolioPackage: any, userProfile: any, savingEmergency: any) => {
    const defaultPortfolioName = "พอร์ตการลงทุนเผื่อเงินออมฉุกเฉิน"
    const moment = require('moment-timezone');
    const now = moment().tz('Asia/Bangkok');
    const startDate = now.format('YYYY-MM-DD');
    const lastUpdate = now.format('YYYY-MM-DD HH:mm:ss');

    const createInvestmentPortfolioData = {
      portfolio_name: defaultPortfolioName,
      total_value: 0,
      last_update: lastUpdate,
      start_date: startDate,
      risk_spectrum: portfolioPackage.RiskSpectrum,
      return_rate: portfolioPackage.ReturnRate,
      user_id: userProfile.User_ID,
      package_id: portfolioPackage.Package_ID,
      emergency_id: savingEmergency.Emergency_ID,
      goal_id: null,
      retirement_id: null
    };
    try {
      const response = await fetch(`${urlServer}investment/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createInvestmentPortfolioData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }
  
      const responseData = await response.json();
      console.log(`Successfully Created Investment Portfolio By Emergency ID: ${savingEmergency.Emergency_ID}`,responseData);
    } catch (error) {
      console.error(error);
    }
  }

  const getInvestmentPortfolio = async (urlServer: string, savingEmergency: any) => {
    try {
      // Fetch Investment Portfolio By Emergency ID
      const portfolioResponse = await fetch(`${urlServer}emergency/${savingEmergency.Emergency_ID}/investment/portfolio`, {
        credentials: "include",
      });
      const investmentPortfolio = await portfolioResponse.json();
      console.log('Investment Portfolio', investmentPortfolio);
      return investmentPortfolio;
    } catch (error) {
      console.log("fetch Investment Portfolio Error: ", error);

      return null;
    }
  }

  const addMutualFundsToInvestmentPortfolio = async (urlServer: string, investmentPortfolio: any, portfolioPackageAllocation: any) => {
    try {
      for (const packageAllocation of portfolioPackageAllocation) {
        const { Package_ID, Fund_ID, PolicyDesc, FundAbbrName, OneYearReturns, AllocationRatio } = packageAllocation;
        
        // Add Mutual Fund to Investment Portfolio
        const response = await fetch(`${urlServer}investment/portfolio/fund`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            portfolio_id: investmentPortfolio.Portfolio_ID,
            fund_id: Fund_ID,
            policy_desc: PolicyDesc,
            fund_abbr_name: FundAbbrName,
            one_year_returns: OneYearReturns,
            allocation_ratio: AllocationRatio
          })
        });
  
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to add mutual fund allocation: ${errorMessage}`);
        }
      }
  
      console.log('Successfully added all mutual fund allocations to investment portfolio');
    } catch (error) {
      console.error(error);
    }
  }

  // Generate Button Text 
  const getNextButtonText = () => {
    if (currentStepIndex === 2) {
      if (showPackageStep) {
        return "ถัดไป";
      } else {
        return "สร้างแผนการออมเงิน";
      }
    }
    else if (isLastStep) {
      return "สร้างพอร์ตการออมเงิน";
    } 
    else {
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
          className="py-2 rounded-lg bg-gradient-to-r from-purple-900 to-pink-500"
        >
          <p
            style={{ padding: "0 1rem" }}
            className="font-bold text-white text-2xl"
          >
            ออมเงินเผื่อฉุกเฉิน
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
                    onClick={() => {
                      back() 
                      setIsSelectedPackage(false)
                    }}
                    className="px-4 py-2 font-bold text-white bg-indigo-500 hover:bg-blue-500 rounded shadow focus:shadow-outline focus:outline-none  transition delay-150"
                  >
                    ย้อนกลับ
                  </button>
                )}

                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white  bg-indigo-500 hover:bg-blue-500 rounded shadow focus:shadow-outline focus:outline-none transition delay-150"
                >
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

export default emergencyCreateForm;
