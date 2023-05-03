import { useState } from "react";

const GoalAccordion: React.FC = () => {
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
        <span className="text-white">กองทุนรวมผสม</span>
        <span className="text-white">10%/20%</span>
        <span className="text-white">10,000/20,000</span>
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
            <p>ABFC</p>
            <p>50%/100%</p>
            <p>5,000/10,000</p>
          </div>
          <div className="grid grid-cols-3 p-3 text-white">
            <p>BBL</p>
            <p>50%/100%</p>
            <p>5,000/10,000</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalAccordion;