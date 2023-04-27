import React, { useRef, useEffect } from "react";
import { useState } from "react";

interface EmergencyInvestmentDropDownFundProps {
  title: string;
  investmentPortfolioAllocation: any[];
  handleFundAbbrSelection: any;
}

const EmergencyInvestmentDropDownFund: React.FC<
  EmergencyInvestmentDropDownFundProps
> = (props) => {
  const { title, investmentPortfolioAllocation, handleFundAbbrSelection } =
    props;
  const [selectedItem, setSelectedItem] = useState("default");

  useEffect(() => {
    // set default value after component has mounted
    // setSelectedItem(investmentPortfolioAllocation[0]?.FundAbbrName || "");
  }, [investmentPortfolioAllocation]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
    handleFundAbbrSelection(event.target.value);
  };

  return (
    <div className="relative">
      <select
        style={{
          width: "100%",
          height: "50px",
          backgroundColor: "#27264E",
        }}
        className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400"
        value={selectedItem}
        onChange={handleSelect}
      >
        <option value="default">เลือกกองทุน</option>
        {Array.from(investmentPortfolioAllocation).map((item) => (
          <option key={item.id} value={item.id}>
            {item.FundAbbrName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EmergencyInvestmentDropDownFund;
