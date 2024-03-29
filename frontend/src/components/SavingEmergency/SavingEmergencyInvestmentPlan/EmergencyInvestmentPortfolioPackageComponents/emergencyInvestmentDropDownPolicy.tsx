import React, { useRef, useEffect } from "react";
import { useState } from "react";

interface EmergencyInvestmentDropDownPolicyProps {
  title: string;
  investmentPortfolioAllocation: any[];
  handlePolicyDescSelection: any;
}

const EmergencyInvestmentDropDownPolicy: React.FC<
  EmergencyInvestmentDropDownPolicyProps
> = (props) => {
  const { title, investmentPortfolioAllocation, handlePolicyDescSelection } =
    props;
  const filteredPolicyDescs = Array.from(investmentPortfolioAllocation).filter(
    (item, index, arr) => {
      // Filter out items that have already been processed
      if (arr.findIndex((i) => i.PolicyDesc === item.PolicyDesc) === index) {
        // Keep items where the PolicyDesc value is unique
        return true;
      }
      return false;
    }
  );
  const [selectedItem, setSelectedItem] = useState("");

  useEffect(() => {
    // setSelectedItem(filteredPolicyDescs[0]?.PolicyDesc || "");
  }, [filteredPolicyDescs]);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
    handlePolicyDescSelection(event.target.value);
  };

  // console.log('Default Item in Policy Menu: ', selectedItem);

  return (
    <div className="w-full">
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
          <option value="default">เลือกประเภทกองทุนรวม</option>
          {filteredPolicyDescs.map((item) => (
            <option key={item.PolicyDesc} value={item.PolicyDesc}>{item.PolicyDesc}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.293 7.293a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L10 9.414l-7.293 7.293a1 1 0 01-1.414-1.414l7-7a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EmergencyInvestmentDropDownPolicy;
