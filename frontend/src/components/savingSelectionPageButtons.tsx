import React from "react";
import { useRouter } from "next/router";
import SavingsIcon from "@mui/icons-material/Savings";
import FlagIcon from "@mui/icons-material/Flag";
import ElderlyIcon from "@mui/icons-material/Elderly";

interface SavingSelectionPageProps {
  title: string;
}
const styles = {
  largeIcon: {
    width: 60,
    height: 60,
  },
};
const SavingSelectionPage: React.FC<SavingSelectionPageProps> = ({ title }) => {
  const router = useRouter();
  const handleEmergencyHomepage = () => {
    router.push("/EmergencyPages/emergencyCreateForm");
  };
  const handleSavingGoalHomepage = () => {
    router.push("/GoalBasedPages/goalBasedCreateForm");
  };
  const handleSavingRetirementHomepage = () => {
    router.push("/RetirementPages/retirementCreateForm");
  };
  return (
    <div className="w-full h-full">
      <div>
        <div className="mb-3 grid grid-rows-3">
          <button onClick={handleEmergencyHomepage} className="transform hover:scale-105 transition duration-300 ease-in-out">
            <div>
              <div className="flex items-center justify-center h-24 rounded-lg bg-purple-400 hover:bg-blue-400 transition delay-150 shadow-2xl">
                <div className="text-3xl font-bold text-white">
                  ออมเงินเผื่อฉุกเฉิน
                </div>
              </div>
            </div>
          </button>
          <button onClick={handleSavingGoalHomepage} className="transform hover:scale-105 transition duration-300 ease-in-out">
            <div>
              <div className="flex items-center justify-center h-24 rounded-lg bg-purple-600 hover:bg-blue-600 transition delay-150 shadow-2xl">
                <div className="text-3xl font-bold text-white">
                  ออมเงินเพื่อเป้าหมาย
                </div>
              </div>
            </div>
          </button>
          <button onClick={handleSavingRetirementHomepage} className="transform hover:scale-105 transition duration-300 ease-in-out">
            <div>
              <div className="flex items-center justify-center h-24 rounded-lg bg-purple-800 hover:bg-blue-800 transition delay-150 shadow-2xl">
                <div className="text-3xl font-bold text-white">
                  ออมเงินเพื่อเกษียณ
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavingSelectionPage;
