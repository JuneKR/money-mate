import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/investTransactionTable";

export interface SavingRetirementPlan {
  Retirement_ID: number | any;
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

export interface SavingRetirementInvestmentPortData {
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

const RetirementInvestmentPortfolioPackage = () => {
  function toggleColumn() {
    setIsOpen(!isOpen);
  }
  const router = useRouter();
  const handleCheckboxChange = (isChecked: boolean) => {
    // Do something with the new checkbox state
  };
  const handleRetirementInvestment = () => {
    router.push("/RetirementPages/RetirementInvestmentDashboard");
  };
  const handlesRetirementPlanForm = () => {
    router.push("/RetirementPages/RetirementHomepage");
  };
  
  const urlServer = "http://localhost:8080/";
  const [isOpen, setIsOpen] = useState(false);
  const [savingRetirementPlan, setSavingRetirementPlan] = useState<SavingRetirementPlan>();
  const [savingRetirementInvestmentPort, setSavingRetirementInvestmentPort] = useState<SavingRetirementInvestmentPortData>();
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
        //Fetch Saving Retirement Plan
        const savingRetirementResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/saving/retirement`,
          {
            credentials: "include",
          }
        );
        const savingRetirement = await savingRetirementResponse.json();
        setSavingRetirementPlan(savingRetirement);

        //Fetch Saving Retirement Investment Portfolio
        const retirementPortfolioResponse = await fetch(
          `${urlServer}retirement/${savingRetirement.Retirement_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const retirementPortfolio = await retirementPortfolioResponse.json();

        // Fetch All Retirement Investment Transaction By Portfolio ID of Retirement
        const retirementInvestmentTransactionResponse = await fetch(
          `${urlServer}investment/${retirementPortfolio.Portfolio_ID}/transactions`,
          {
            credentials: "include",
          }
        );

        const retirementInvestmentTransaction = await retirementInvestmentTransactionResponse.json();
        setInvestmentTransactions(retirementInvestmentTransaction);
       
      } catch (error) {
        console.log("Fetching Retirement Investment Transaction Error: ", error);
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
                            savingEmergency={savingRetirementPlan}
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
export default RetirementInvestmentPortfolioPackage;
