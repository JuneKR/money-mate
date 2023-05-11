import React, { useState, useEffect } from "react";

interface SRetirementDashBoardModalFormProps {
  title: string;
  savingRetirement: any;
}

function yearsToYearsMonthsDays(value: string) {
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

const SRetirementDashBoardModalForm: React.FC<
  SRetirementDashBoardModalFormProps
> = ({ title, savingRetirement }) => {
  const targetAmountDisplay = Number(savingRetirement?.TargetAmount);
  const monthlySavingDisplay = Math.round(
    Number(savingRetirement?.MonthlySaving) * -1
  );
  const formattedํargetAmount = targetAmountDisplay?.toLocaleString();
  const formattedMonthlySaving = monthlySavingDisplay?.toLocaleString();
  const [showComplete, setShowComplete] = useState<boolean>(false);

  function checkProgress(savingEmergency: any) {
    if (savingEmergency?.Progression >= 100) {
      setShowComplete(true);
    }
  }
  useEffect(() => {
    checkProgress(savingRetirement);
  }, [savingRetirement]);

  return (
    <div>
      {showComplete ? (
        <div className="p-20 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
          <p className="flex justify-center text-3xl font-bold text-gray-200 animate-bounce item-center">
            การออมเงินสำเร็จแล้ว!
          </p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: "#1D1D41" }}
          className="w-full h-full p-4 pb-10 shadow-2xl rounded-b-2xl"
        >
          <div className="font-bold text-left text-white">
            <h1 className="px-2 pb-5 text-xl">เป้าหมายการออมเงิน</h1>
          </div>
          <div className="grid grid-cols-1 gap-20 p-5 md:grid-cols-2 lg:grid-cols-4">
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl "
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                จำนวนเงิน
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {formattedํargetAmount}
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                เงินออม/ต่อเดือน
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {formattedMonthlySaving} บาท
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                อายุที่ต้องการเกษียณ
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {savingRetirement?.AgeToRetire} ปี
              </div>
            </div>
            <div
              style={{ backgroundColor: "#27264E" }}
              className="p-5 rounded-lg shadow-2xl"
            >
              <div className="flex items-center justify-center pb-2 text-sm font-bold text-white">
                ระยะเวลาคงเหลือ
              </div>
              <div className="flex items-center justify-center text-2xl text-white">
                {yearsToYearsMonthsDays(savingRetirement?.TimeRemaining)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SRetirementDashBoardModalForm;
