import { useState } from "react";

interface GoalAccordionProps {
  savingPlan: any;
  investmentPortfolio: any;
  portfolioItem: any;
  portfolioPackage: any;
  portfolioPackageAllocation: any;
}

const GoalAccordion: React.FC<GoalAccordionProps> = (props) => {
  const { savingPlan, investmentPortfolio, portfolioItem, portfolioPackage, portfolioPackageAllocation } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
      <div 
        className="w-full"
      >
        <button
          className="shadow-2xl flex items-center justify-between w-full py-5 pl-4 pr-2 text-lg font-medium text-left rounded-md hover:scale-105"
          onClick={toggleAccordion}
          style={{ backgroundColor: "#27264E" }}
        >
          <span className="text-white">กองทุนรวม{portfolioItem.PolicyDesc}</span>
          <svg
            className={`text-white w-5 h-5 ml-2 transition-transform transform ${
              isOpen ? '-rotate-180' : ''
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        {isOpen && (
          <div 
            className="px-4 py-2 text-base text-gray-600 bg-gray-100 rounded-b-md"
            style={{ backgroundColor: "#3A3B5A" }}
          >
            <div className="grid grid-cols-3 p-3 text-white">
              <p>{portfolioItem.FundAbbrName} <br/>(NAV {portfolioItem.CurrentHoldingUnits} หน่วย)</p>
              <p>{portfolioItem.AllocationRatio}%/{portfolioPackageAllocation.AllocationRatio}%</p>
              <p>{portfolioItem.TotalHoldingValue}/{(savingPlan.TargetAmount*portfolioPackageAllocation.AllocationRatio)/100} บาท</p>
            </div>
          </div>
        )}
      </div>
    );
  };

export default GoalAccordion;