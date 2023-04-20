import React, { useState, useEffect } from "react";

interface EmergencyInvestmentDropdownProps {
  title: string;
}

const EmergencyInvestmentDropdown: React.FC<
  EmergencyInvestmentDropdownProps
> = ({ title }) => {
  const [isHidden, setIsHidden] = useState(true);
  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  const handleCheckboxChange = () => {
    setIsHidden(!isHidden);
  };
  return (
    <div className="relative py-8 ">
      <div
        style={{ backgroundColor: "#6259E8" }}
        className="px-4 py-4 rounded-lg cursor-pointer flex justify-between items-center border-2 border-black grid grid-cols-4"
        onClick={handleClick}
      >
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={!isHidden}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-gray-600 ml-2"
          />
        </label>
        <span
          style={{ backgroundColor: "#6259E8" }}
          className="text-white text-lg rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
        >
          กองทุนรวมผสม
        </span>
        <span
          style={{ backgroundColor: "#6259E8" }}
          className="text-white text-lg rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
        >
          10%/20%
        </span>
        <span
          style={{ backgroundColor: "#6259E8" }}
          className="text-white text-lg rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
        >
          10,000/20,000
        </span>
      </div>
      {!isHidden && (
        <div className="py-5 ">กองทุน 1 2 3</div>
      )}
    </div>
  );
};

export default EmergencyInvestmentDropdown;
