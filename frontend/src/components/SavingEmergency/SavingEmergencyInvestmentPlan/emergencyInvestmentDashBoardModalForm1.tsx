import React from "react";

interface EmergencyInvestmentDashBoardModalForm1Props {
  title: string;
  savingEmergency: any;
  savingInvestmentPort: any;
}

const EmergencyInvestmentDashBoardModalForm1: React.FC<EmergencyInvestmentDashBoardModalForm1Props> = 
({ title, savingEmergency, savingInvestmentPort }) => {

  const targetAmountDisplay = Number(savingEmergency.TargetAmount);
  const monthlySavingDisplay = Number(savingEmergency.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <div>
        <div style={{backgroundColor: "#1D1D41"}} className="p-4 rounded-b-2xl w-full h-full pb-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center items-center">
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {formattedํargetAmount} บาท
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                ระยะเวลา
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingEmergency.TimeRemaining} เดือน
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingEmergency.TimePeriod} เดือน
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold text-center">
                เงินลงทุนต่อเดือน
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold text-center">
                ความเสี่ยงที่รับได้
              </div>
              <div className="flex items-center justify-center text-white font-bold text-lg">
                {savingInvestmentPort?.RiskSpectrum === undefined ? "-" : savingInvestmentPort?.RiskSpectrum}
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-md flex items-center justify-center font-bold text-center">
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

export default EmergencyInvestmentDashBoardModalForm1;