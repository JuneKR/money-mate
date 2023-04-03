import React, { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import InvestmentCheckBox from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox";
import { useRouter } from "next/router";
import TransactionTable from "@/components/TransactionComponents/investTransactionTable";

export interface SavingEmergencyPlan {
  Emergency_ID: number | any;
  InitialSaving: number | any;
  InterestRate: number | any;
  LastUpdate: string | any;
  MonthlyExpense: number | any;
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

export interface SavingEmergencyInvestmentPortData {
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
  createdAt: string | any;
  updatedAt: string | any;
}

export interface InvestmentTransaction {
  TransactionDate: string;
  PolicyDesc: string;
  FundAbbrName: string;
  Amount: number;
  Type: string;
}
const EmergencyInvestmentPortfolioPackage = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleColumn() {
    setIsOpen(!isOpen);
  }
  const router = useRouter();
  const handleCheckboxChange = (isChecked: boolean) => {
    // Do something with the new checkbox state
  };
  const handleEmergencyInvestment = () => {
    router.push("/EmergencyPages/emergencyInvestmentDashboard");
  };
  const handlesEmergencyPlanForm = () => {
    router.push("/EmergencyPages/emergencyHomepage");
  };

  const [savingEmergencyInvestmentPort, setSavingEmergencyInvestmentPort] =
    useState<SavingEmergencyInvestmentPortData[]>([]);

  const [savingEmergencyPlan, setSavingEmergencyPlan] = useState<
    SavingEmergencyPlan[]
  >([]);

  const [investmentTransactions, setInvestmentTransactions] = useState<
    InvestmentTransaction[]
  >([]);
  const urlServer = "http://localhost:8080/";
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
        setSavingEmergencyPlan(savingEmergency);

        //Fetch Saving Emergency Investment Portfolio
        const savingEmergencyInvestmentPortResponse = await fetch(
          `${urlServer}user/${userProfile.User_ID}/investment/portfolios`,
          {
            credentials: "include",
          }
        );
        const savingEmergencyInvestmentPorts =
          await savingEmergencyInvestmentPortResponse.json();
        setSavingEmergencyInvestmentPort(savingEmergencyInvestmentPorts);
        console.log(
          `${urlServer}investment/${savingEmergencyInvestmentPort[0]?.Portfolio_ID}/transaction`
        );
        //Fetch Investment Port Transaction
        const savingEmergencyTransactionResponse = await fetch(
          `${urlServer}investment/${savingEmergencyInvestmentPort[0]?.Portfolio_ID}/transaction`,
          {
            credentials: "include",
          }
        );
        const investmentTransaction =
          await savingEmergencyTransactionResponse.json();
        setInvestmentTransactions(investmentTransaction);
        console.log("sssssssssss");
        console.log(investmentTransactions);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }
    fetchSavingPlan();
  }, []);
  return (
    <>
      <main className={styles.main}>
        <div style={{ padding: "0 4rem" }} className="w-full xl:w-8/12">
          <Sidebar title="My Sidebar" />
          <div className="bg-gray-50 shadow-2xl">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // backgroundColor: "#FEF5AC",
              }}
              className=" py-2 rounded bg-gradient-to-r from-red-500 via-yellow-400 to-yellow-200"
            >
              <div
                style={{ padding: "0 1rem" }}
                className="font-bold text-black dark:text-gray-500 "
              >
                ประวัติรายการ
              </div>
            </div>
            <div>
              <div
                style={{ maxHeight: "600px", overflow: "auto" }}
                className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
              >
                {!investmentTransactions.length ? (
                  <div>
                    <h1 className="text-black text-center">
                      คุณยังไม่มีประวัติ
                    </h1>
                  </div>
                ) : (
                  <div className="pb-5 px-5">
                    {investmentTransactions.map(
                      (investmentTransaction, index) => (
                        <div key={index}>
                          <TransactionTable
                            title={"my table1"}
                            transaction={investmentTransaction}
                            savingEmergency={savingEmergencyPlan}
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
export default EmergencyInvestmentPortfolioPackage;
