import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/investTransactionTable";

export interface SavingGoalPlan {
  GoalGoal_ID: number | any;
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

export interface SavingGoalInvestmentPortData {
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

export interface InvestmentTransaction {
  sort(arg0: (a: any, b: any) => number): any;
  map(arg0: (investmentTransaction: any) => JSX.Element): React.ReactNode;
  TransactionDate: string;
  PolicyDesc: string;
  FundAbbrName: string;
  Amount: number;
  Type: string;
}

const GoalInvestmentPortfolioPackage = () => {
  function toggleColumn() {
    setIsOpen(!isOpen);
  }
  const router = useRouter();
  const handleCheckboxChange = (isChecked: boolean) => {
    // Do something with the new checkbox state
  };
  const handleGoalInvestment = () => {
    router.push("/GoalPages/GoalInvestmentDashboard");
  };
  const handlesGoalPlanForm = () => {
    router.push("/GoalPages/GoalHomepage");
  };
  
  const urlServer = "http://localhost:8080/";
  const [isOpen, setIsOpen] = useState(false);
  const [savingGoalPlan, setSavingGoalPlan] = useState<SavingGoalPlan>();
  const [savingGoalInvestmentPort, setSavingGoalInvestmentPort] = useState<SavingGoalInvestmentPortData>();
  const [investmentTransactions, setInvestmentTransactions] = useState<InvestmentTransaction>();

  // Fetch APIs
  useEffect(() => {
    async function fetchInvestmentTransaction() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });

        const userProfile = await profileResponse.json();
        //Fetch Saving Goal Plan
        const savingGoalResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/Goal`,
          {
            credentials: "include",
          }
        );
        const savingGoal = await savingGoalResponse.json();
        setSavingGoalPlan(savingGoal);

        //Fetch Saving Goal Investment Portfolio
        const goalPortfolioResponse = await fetch(
          `${urlServer}goal/${savingGoal.Goal_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const goalPortfolio = await goalPortfolioResponse.json();

        // Fetch All Goal Investment Transaction By Portfolio ID of Goal
        const goalInvestmentTransactionResponse = await fetch(
          `${urlServer}investment/${goalPortfolio.Portfolio_ID}/transactions`,
          {
            credentials: "include",
          }
        );

        const goalInvestmentTransaction = await goalInvestmentTransactionResponse.json();
        setInvestmentTransactions(goalInvestmentTransaction);
       
      } catch (error) {
        console.log("Fetching Goal Investment Transaction Error: ", error);
      }
    }
    fetchInvestmentTransaction();
  }, []);
  return (
    <>
      <main className={styles.main}>
        <div style={{ padding: "0 4rem" }} className="w-full xl:w-8/12">
          <Sidebar title="My Sidebar" />
          <div className="shadow-2xl">
          <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#6259E8",
                }}
                className="py-2 rounded-lg"
              >
                <div
                  style={{ padding: "0 1rem" }}
                  className="font-bold text-white text-2xl "
                >
                  ประวัติรายการซื้อขายกองทุน
                </div>
              </div>
            <div>
              <div
                style={{
                  maxHeight: "600px",
                  overflow: "auto",
                  backgroundColor: "#1D1D41",
                }}
                className="block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-md shadow-2xl"
              >
                {!investmentTransactions || !Array.isArray(investmentTransactions) || investmentTransactions.length === 0 ? (
                  <div>
                    <h1 className="text-gray-200 flex justify-center item-center text-2xl font-bold">
                      คุณยังไม่มีประวัติการซื้อขายกองทุน
                    </h1>
                  </div>
                ) : (
                  <div className="pb-5 px-5">
                    {investmentTransactions
                    .map(
                      (investmentTransaction) => (
                        <div key={investmentTransaction.TransactionDate}>
                          <TransactionTable
                            title={"my table1"}
                            transaction={investmentTransaction}
                            savingEmergency={savingGoalPlan}
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default GoalInvestmentPortfolioPackage;
