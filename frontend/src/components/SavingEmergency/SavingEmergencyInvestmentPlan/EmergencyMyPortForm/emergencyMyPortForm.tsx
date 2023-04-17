import React, { useState, useEffect } from "react";
import DropDownPolicy from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentDropDownPolicy"
import DropDownFund from "@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentDropDownFund"

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

const EmergencyMyPortForm = () => {
  const urlServer = "http://localhost:8080/"
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [userProfile, setUserProfile] = useState();
  const [savingEmergencyPlan, setSavingEmergencyPlan] = useState();
  const [investmentPortfolio, setInvestmentPortfolio] = useState();
  const [investmentPortfolioAllocation, setInvestmentPortfolioAllocation] = useState([]);
  const [investmentAmount, setInvestmentAmount] = useState(0);
  const [investmentAmountError, setInvestmentAmountError] = useState("");
  const [transactionType, setTransactionType] = useState("");
  const [selectedPolicyDesc, setSelectedPolicyDesc] = useState("");
  const [selectedFundAbbr, setSelectedFundAbbr] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfileResponse = await profileResponse.json();
        setUserProfile(userProfile);

        //Fetch Saving Emergency Plan
        const savingEmergencyResponse = await fetch(
          `${urlServer}user/${userProfileResponse.User_ID}/saving/emergency`,
          {
            credentials: "include",
          }
        );
        const savingEmergency = await savingEmergencyResponse.json();
        setSavingEmergencyPlan(savingEmergency);

        //Fetch Saving Emergency Investment Portfolio
        const emergencyInvestmentReponse = await fetch(
          `${urlServer}emergency/${savingEmergency.Emergency_ID}/investment/portfolio`,
          {
            credentials: "include",
          }
        );
        const emergencyInvestmentPortfolio = await emergencyInvestmentReponse.json();
        setInvestmentPortfolio(emergencyInvestmentPortfolio);

        //Fetch Investment Portfolio Allocation
        const portfolioResponse = await fetch(`${urlServer}investment/portfolio/${emergencyInvestmentPortfolio.Portfolio_ID}/allocation`, {
          credentials: "include",
        });
        const investmentPortfolioAllocation = await portfolioResponse.json();
        setInvestmentPortfolioAllocation(investmentPortfolioAllocation);


      } catch (error) {
        console.log("Fetching Saving Plan Error: ", error);
      }
    }

    fetchData();
  }, []);

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
  };
  
  const handleBuyClick = () => {
    setTransactionType("buy");
  };
  
  const handleSellClick = () => {
    setTransactionType("sell");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPolicyDesc || !selectedFundAbbr) {
      alert('กรุณากดเลือกประเภทกองทุนและกองทุน');
    } else {
      if (transactionType === "buy" && investmentAmount !== 0) {
        const transactionData = {
          policyDesc: selectedPolicyDesc,
          fundAbbrName: selectedFundAbbr,
          amount: investmentAmount,
          type: transactionType || "buy"
        }
        alert('ซื้อกองทุนสำเร็จแล้ว!');
        createEmergencyTransaction(urlServer, investmentPortfolio, transactionData);

        // console.log('User: ', userProfile);
        // console.log('Selected Policy: ', selectedPolicyDesc);
        // console.log('Selected Fund: ', selectedFundAbbr);
        // console.log('Amount of buying: ', investmentAmount);
      }
      else if (transactionType === "sell" && investmentAmount !== 0) {
        const transactionData = {
          policyDesc: selectedPolicyDesc,
          fundAbbrName: selectedFundAbbr,
          amount: investmentAmount,
          type: transactionType || "sell"
        }
        alert('ขายกองทุนสำเร็จแล้ว!');
        createEmergencyTransaction(urlServer, investmentPortfolio, transactionData);

        // console.log('Selected Policy: ', selectedPolicyDesc);
        // console.log('Selected Fund: ', selectedFundAbbr);
        // console.log('Amount of selling: ', investmentAmount);
      }
      else {
        alert('กรุณากรอกจำนวนเงิน');
      }
    }
  };

  const createEmergencyTransaction = async (urlServer: string, investmentPortfolio: any, transactionData: any) => {

    const moment = require('moment-timezone');
    const now = moment().tz('Asia/Bangkok');
    const currentDatetime = now.format('YYYY-MM-DD HH:mm:ss');
    
    const emergencyTransactionData = {
      transaction_date: currentDatetime,
      policy_desc: transactionData.policyDesc,
      fund_abbr_name: transactionData.fundAbbrName,
      amount: transactionData.amount,
      type: transactionData.type
    };

    try {
      const response = await fetch(`${urlServer}emergency/investment/portfolio/${investmentPortfolio.Portfolio_ID}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emergencyTransactionData),
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
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          ประเภทกองทุนรวม
        </label>
        <DropDownPolicy 
          title={"ประเภทกองทุนรวม"} 
          investmentPortfolioAllocation={investmentPortfolioAllocation}
          handlePolicyDescSelection={handlePolicyDescSelection}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          สินทรัพย์ที่ลงทุน
        </label>
        <DropDownFund 
          title={"สินทรัพย์ที่ลงทุน"} 
          investmentPortfolioAllocation={investmentPortfolioAllocation}
          handleFundAbbrSelection={handleFundAbbrSelection}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
          จำนวนเงิน
        </label>
        <input
          className="bg-white appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                        style={{ width: "209px",marginRight: "10px", backgroundColor: '#B2E8FF'}} 
                        className="px-4 py-2 font-bold text-black rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" 
                        type="submit"
                        value="buy"
                        onClick={handleBuyClick}
                      >
                        ซื้อหน่วยลงทุน
                     </button>
                     <button 
                        style={{ width: "209px", marginLeft: "10px", backgroundColor: '#FF8C73'}} 
                        className="px-4 py-2 font-bold text-black rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" 
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

export default EmergencyMyPortForm;
