import React, { useState, useEffect } from "react";
import DropDownFund from "../RetirementInvestmentPortfolioPackageComponents/retirementInvestmentDropDownFund";
import { IMutualFund, IPortfolioItem, initialMutualFund, initialPortfolioItem } from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyMyPortForm";

interface FormValues {
  name: string;
  email: string;
  message: string;
}

const initialFormValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const RetirementMyPortForm = () => {
  const urlServer = "http://localhost:8080/"
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [userProfile, setUserProfile] = useState();
  const [savingRetirementPlan, setSavingRetirementPlan] = useState();
  const [investmentPortfolio, setInvestmentPortfolio] = useState();
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentAmountError, setInvestmentAmountError] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [selectedPolicyDesc, setSelectedPolicyDesc] = useState("");
  const [selectedFundAbbr, setSelectedFundAbbr] = useState("default");
  const [selectedMutualFund, setSelectedMutualFund] = useState<IMutualFund>(initialMutualFund);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<IPortfolioItem>(initialPortfolioItem);

  const formattedDate = new Date(selectedMutualFund.LastUpdate).toLocaleDateString('th-TH');

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfileResponse = await profileResponse.json();
        setUserProfile(userProfile);

        //Fetch Saving Retirement Plan
        const savingRetirementResponse = await fetch(
          `${urlServer}user/${userProfileResponse.User_ID}/saving/retirement`,
          {
            credentials: "include",
          }
        );
        const savingRetirement = await savingRetirementResponse.json();
        setSavingRetirementPlan(savingRetirement);

        //Fetch Saving Retirement Investment Portfolio
        const retirementInvestmentReponse = await fetch(
          `${urlServer}retirement/${savingRetirement.Retirement_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const retirementInvestmentPortfolio = await retirementInvestmentReponse.json();
        setInvestmentPortfolio(retirementInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(`${urlServer}investment/portfolio/${retirementInvestmentPortfolio.Portfolio_ID}/allocation`, {
          credentials: "include",
        });
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);
      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, [userProfile]);

  useEffect(() => {
    async function fetchMutualFundData() {
      try {
        // Fetch Mutual Fund By Abbr Name
        const mutualFundResponse = await fetch(
          `${urlServer}mutual/fund/abbr/${selectedFundAbbr}`,
          {
            credentials: "include",
          }
        );
        if (mutualFundResponse.ok) {
          const mutualFund = await mutualFundResponse.json();
          setSelectedMutualFund(mutualFund);
        } else {
          throw new Error(`Request failed with status ${mutualFundResponse.status}`);
        }
      } catch (error) {
        console.log("Fetching Mutual Fund Error: ", error);
      }
    }

    if (selectedFundAbbr !== 'default') {
      fetchMutualFundData();
    }
  }, [selectedFundAbbr]);

  const handleInvestmentAmountChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setInvestmentAmount(Number(value));
      setInvestmentAmountError("");
    } else {
      setInvestmentAmountError("กรุณากรอกข้อมูลเฉพาะตัวเลข");
    }
  };

  const handlePolicyDescSelection = (selected: string) => {
    setSelectedPolicyDesc(selected);
  };

  const handleFundAbbrSelection = (selected: string) => {
    setSelectedFundAbbr(selected);
    // set a selected portfolio item for display in mutual fund section
    const filteredPortfolioItem = investmentPortfolioAllocation.find(item => item.FundAbbrName === selected) || initialPortfolioItem;
    setSelectedPortfolioItem(filteredPortfolioItem);
  };
  
  const handleBuyClick = () => {
    setTransactionType("buy");
  };
  
  const handleSellClick = () => {
    setTransactionType("sell");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFundAbbr === "default") {
      alert("กรุณากดเลือกกองทุน");
    } else {
      if (transactionType === "buy" && investmentAmount !== 0 && investmentAmount >= selectedMutualFund.MinimumInvestmentAmount) {
        const transactionData = {
          policyDesc: selectedPolicyDesc,
          fundAbbrName: selectedFundAbbr,
          amount: investmentAmount,
          type: transactionType || "buy"
        }
        alert('ซื้อกองทุนสำเร็จแล้ว!');
        createRetirementTransaction(
          urlServer, 
          investmentPortfolio, 
          transactionData,
          selectedMutualFund
        );
        window.location.reload();
      }
      else if (transactionType === "sell" && investmentAmount !== 0 && investmentAmount <= selectedPortfolioItem.TotalHoldingValue) {
        const transactionData = {
          policyDesc: selectedPolicyDesc,
          fundAbbrName: selectedFundAbbr,
          amount: investmentAmount,
          type: transactionType || "sell"
        }
        alert('ขายกองทุนสำเร็จแล้ว!');
        createRetirementTransaction(
          urlServer, 
          investmentPortfolio, 
          transactionData,
          selectedMutualFund
        );
        window.location.reload();
      }
      else {
        alert('กรุณากรอกจำนวนเงิน');
      }
    }
  };

  const createRetirementTransaction = async (
    urlServer: string, 
    investmentPortfolio: any, 
    transactionData: any,
    mutualFund: any
  ) => {

    const moment = require('moment-timezone');
    const now = moment().tz('Asia/Bangkok');
    const currentDatetime = now.format('YYYY-MM-DD HH:mm:ss');
    
    const retirementTransactionData = {
      transaction_date: currentDatetime,
      policy_desc: transactionData.policyDesc,
      fund_abbr_name: transactionData.fundAbbrName,
      amount: transactionData.amount,
      type: transactionData.type,
      current_holding_units: (transactionData.amount/mutualFund.NAV),
      total_holding_value: transactionData.amount
    };

    try {
      const response = await fetch(`${urlServer}retirement/investment/portfolio/${investmentPortfolio.Portfolio_ID}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(retirementTransactionData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }

      const responseData = await response.json();
      console.log(`Successfully add investment transaction by portfolio id ${investmentPortfolio.Portfolio_ID}`,responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=' py-5 px-5'>
      {/* <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          ประเภทกองทุนรวม
        </label>
        <DropDownPolicy 
          title={"ประเภทกองทุนรวม"} 
          investmentPortfolioAllocation={investmentPortfolioAllocation}
          handlePolicyDescSelection={handlePolicyDescSelection}
        />
      </div> */}
      <div className="mb-4">
        <label className="text-white block text-gray-700 font-bold mb-2" htmlFor="email">
          สินทรัพย์ที่ลงทุน
        </label>
        <DropDownFund 
          title={"สินทรัพย์ที่ลงทุน"} 
          investmentPortfolioAllocation={investmentPortfolioAllocation}
          handleFundAbbrSelection={handleFundAbbrSelection}
        />
      </div>
      {selectedMutualFund !== initialMutualFund && selectedFundAbbr !== 'default' && (
        <div className="mb-4">
          <label className="text-white block mb-2 font-bold " htmlFor="email">
            รายละเอียดข้อมูลกองทุน
          </label>
          <div
            style={{
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400"
          >
            <p className="font-bold">
              {selectedMutualFund.FundAbbrName}
            </p>
            <p className="pb-2 border-b">
              {selectedMutualFund.FundName}
            </p>
            <p className="pt-2">NAV ({formattedDate}): {selectedMutualFund.NAV}</p>
            <p>มูลค่าขั้นต่ำซื้อครั้งแรก: {selectedMutualFund.MinimumInvestmentAmount} บาท</p>
            <p className="pb-2">มูลค่าขั้นต่ำซื้อครั้งถัดไป: {selectedMutualFund.MinimumAdditionalAmount} บาท</p>
          </div>
        </div>
      )}
      {selectedMutualFund !== initialMutualFund && selectedFundAbbr !== 'default' && (
        <div className="mb-4">
        <label className="text-white block mb-2 font-bold " htmlFor="email">
          ข้อมูลกองทุนที่ถือในพอร์ตการลงทุนของคุณ
        </label>
          <div
              style={{
                backgroundColor: "#27264E",
              }}
              className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400"
            >
            <p className="pb-2 border-b" >
              {selectedMutualFund.FundAbbrName} ที่ถืออยู่ในพอร์ตปัจจุบัน
            </p>
            <p className="pt-2">จำนวนหน่วยที่มีอยู่ทั้งหมด: {selectedPortfolioItem.CurrentHoldingUnits} หน่วย</p>
            <p>มูลค่าที่มีอยู่ทั้งหมด: {selectedPortfolioItem.TotalHoldingValue} บาท</p>
          </div>
        </div>
      )}
      <div className="mb-4">
        <label className="text-white block text-gray-700 font-bold mb-2" htmlFor="message">
          จำนวนเงิน
        </label>
        <input
          style={{
            width: "100%",
            height: "50px",
            backgroundColor: "#27264E",
          }}
          className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400"
          id=""
          type="text"
          placeholder="1,000 บาท"
          name="text" 
          value={investmentAmount}
          onChange={handleInvestmentAmountChange }
        />
        {/* Display error when use input invalid */}
        {investmentAmountError && (
          <p className="text-red-500 text-xs italic">{investmentAmountError}</p>
        )}
      </div>
      <div className="flex items-center justify-end">
        <div className="flex justify-end py-2">
                <div className="py-5">
                     <button 
                        style={{
                          width: "209px",
                          marginRight: "10px",
                          backgroundColor: "#6259E8",
                        }}
                        className="px-4 py-2 font-bold text-white rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" 
                        type="submit"
                        value="buy"
                        onClick={handleBuyClick}
                      >
                        ซื้อหน่วยลงทุน
                     </button>
                     <button 
                        style={{
                          width: "209px",
                          marginLeft: "10px",
                          backgroundColor: "#93878D",
                        }}
                        className="px-4 py-2 font-bold text-white rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" 
                        type="submit"
                        value="sell"
                        onClick={handleSellClick}
                      >
                        ขายหน่วยลงทุน
                     </button>
                  </div>
            </div>
      </div>
    </form>
  );
};

export default RetirementMyPortForm;
