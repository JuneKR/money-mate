import React from "react";

interface GoalInvestmentDashBoardModalFormProps {
  title: string;
  savingGoal: any;
  savingInvestmentPort: any;
}

const GoalInvestmentDashBoardModalForm: React.FC<GoalInvestmentDashBoardModalFormProps> = 
({ title, savingGoal, savingInvestmentPort }) => {

  const targetAmountDisplay = Number(savingGoal.TargetAmount);
  const monthlySavingDisplay = Number(savingGoal.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <div>
        <div style={{backgroundColor: "#1D1D41"}} className="p-2 rounded-b-2xl w-full h-full pb-2 shadow-2xl ">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 p-2 justify-items-center items-center">
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg text-center">
                {formattedํargetAmount} บาท
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingGoal.TimePeriod} เดือน
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                เงินลงทุน/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                ความเสี่ยงที่รับได้
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingInvestmentPort?.RiskSpectrum === undefined ? "-" : savingInvestmentPort?.RiskSpectrum}
              </div>
            </div>
            <div>
              <div className="text-white text-align-center font-bold text-md flex items-center justify-center font-bold text-center">
                ผลตอบแทนที่คาดหวัง
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingInvestmentPort?.ReturnRate === undefined ? "-" : savingInvestmentPort?.ReturnRate}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default GoalInvestmentDashBoardModalForm;