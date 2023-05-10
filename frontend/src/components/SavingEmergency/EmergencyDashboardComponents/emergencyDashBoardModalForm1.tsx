import React from "react";

interface EmergencyDashBoardModalForm1Props {
  title: string;
  savingEmergency: any;
}

function yearsToYearsMonthsDays(value: string) {
  // const values = Number(value) / 12;
  const totalDays = Number(value) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }
  return result.toString();
}

const EmergencyDashBoardModalForm1: React.FC<EmergencyDashBoardModalForm1Props> = ({ title, savingEmergency }) => {

  const targetAmountDisplay = Number(savingEmergency?.TargetAmount);
  const monthlySavingDisplay = Number(savingEmergency?.MonthlySaving);
  const formattedํargetAmount = targetAmountDisplay.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay.toLocaleString();

  return (
    <div>
        <div style={{backgroundColor: "#1D1D41"}} className="p-4 rounded-b-2xl w-full h-full pb-10 shadow-2xl ">
          <div className="flex justify-end">
          </div>
          <div className="text-left text-white font-bold">
            <h1  className="px-2 text-xl pb-5">
              เป้าหมายการออมเงิน
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 p-5">
            <div style={{backgroundColor: "#27264E"}} className="shadow-2xl rounded-lg p-5">
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {formattedํargetAmount}
              </div>
            </div>
            <div style={{backgroundColor: "#27264E"}}className="shadow-2xl rounded-lg p-5">
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                ระยะเวลาคงเหลือ
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {yearsToYearsMonthsDays(savingEmergency?.TimeRemaining)} 
              </div>
            </div>
            <div style={{backgroundColor: "#27264E"}} className="shadow-2xl rounded-lg p-5">
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                จำนวนเดือน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {savingEmergency?.TimePeriod} เดือน
              </div>
            </div>
            <div style={{backgroundColor: "#27264E"}}className="shadow-2xl rounded-lg p-5">
              <div className="flex items-center justify-center text-white font-bold text-sm pb-2">
                เงินออม/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-white text-2xl">
                {formattedMonthlySaving} บาท
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default EmergencyDashBoardModalForm1;
