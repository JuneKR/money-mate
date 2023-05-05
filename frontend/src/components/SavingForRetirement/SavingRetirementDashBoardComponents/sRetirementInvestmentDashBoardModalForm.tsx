import React from "react";

interface SRetirementInvestmentDashBoardModalFormProps {
  title: string;
  savingRetirement: any;
  savingInvestmentPort: any;
}

const SRetirementInvestmentDashBoardModalForm: React.FC<SRetirementInvestmentDashBoardModalFormProps> = 
({ title, savingRetirement, savingInvestmentPort }) => {

  const targetAmountDisplay = Number(savingRetirement?.TargetAmount);
  const monthlySavingDisplay = Math.round(Number(savingRetirement?.MonthlySaving));
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <div>
        <div style={{backgroundColor: "#1D1D41"}} className="p-4 w-full h-full pb-6 shadow-2xl rounded-b-2xl ">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-5 justify-items-center items-center">
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {formattedํargetAmount} บาท
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                ระยะเวลา
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingRetirement?.TimeRemaining} เดือน
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                เงินลงทุน/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md">
                ความเสี่ยงที่รับได้
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingInvestmentPort?.RiskSpectrum === undefined ? "-" : savingInvestmentPort?.RiskSpectrum}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-center font-bold text-white text-md text-center">
                ผลตอบแทนที่คาดหวัง
              </div>
              <div className="flex items-center justify-center text-lg font-bold text-white">
                {savingInvestmentPort?.ReturnRate === undefined ? "-" : savingInvestmentPort?.ReturnRate}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default SRetirementInvestmentDashBoardModalForm;