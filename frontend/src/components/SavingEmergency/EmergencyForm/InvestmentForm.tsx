import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Slider } from "@mui/material";
import InvestmentSlider from '@/components/SavingEmergency/EmergencyPlanSlider/emergencyInvestmentSlider';
import EmergencyPlanDataTable from "@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable";

type InvestmentData = {
    expense: number;
    period: number;
    monthlySaving: number;
    totalBalance: number;
    timeRemaining: number;
    targetAmount: number;
    riskLevel: number;
    returnRate: number;
}

type InvestmentFormProps = InvestmentData & {
    updateFields: (fields: Partial<InvestmentData>) => void
}

export function InvestmentForm({
    expense,
    period,
    monthlySaving,
    totalBalance,
    timeRemaining,
    targetAmount,
    riskLevel,
    returnRate,
    updateFields
}: InvestmentFormProps) {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(!isHidden);
      };

    const handleCheckboxChange = () => {
        setIsHidden(!isHidden);
    };

    const router = useRouter();

    const handleEmergencyInvestmanet = () => {
        router.push("/EmergencyPages/emergencyInvestmentPortfolioPackage");
    };

    function yearsToYearsMonthsDays(value: string) {
        const totalDays = Number(value) * 365;
        const years = Math.floor(totalDays/365);
        const months = Math.floor((totalDays-(years *365))/30);
        const days = Math.floor(totalDays - (years*365) - (months * 30));
        const result = years + " ปี " + months + " เดือน " + days + " วัน";
        if (isNaN(years) || isNaN(months) || isNaN(days)) {
            return "0 ปี 0 เดือน 0 วัน";
        }
        return result.toString();
    }

    const timeToAchive = yearsToYearsMonthsDays(timeRemaining.toString());

    console.log('Risk Level', riskLevel);

    return (
        <div className="py-20">
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded bg-gray-50 dark:bg-gray-800"
      >
        <div
          style={{ width: "100%", height: "50%", backgroundColor: "#E5F8FF" }}
          className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 text-black font-bold">
            <div className="text-blue-800 hover:text-blue-900 p-4">
              เป้าหมาย
            </div>
            <div className="text-blue-800 hover:text-blue-900 p-4">
              ออมเงินเผื่อฉุกเฉิน
            </div>
            <div className="p-4">คุณต้องมีเงินฉุกเฉิน</div>
            <div className="p-4">{targetAmount}</div>
            <div className="p-4">ระยะเวลาในการออม</div>
            <div className="p-4">{timeToAchive}</div>
            <div className="p-4">จำนวนเดือนที่ต้องการเก็บ</div>
            <div className="p-4">{period} เดือน</div>
            <div className="p-4">เงินเก็บต่อเดือน</div>
            <div className="p-4">{monthlySaving} บาท</div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            style={{ backgroundColor: "#B2E8FF" }}
            className="px-4 rounded-t-lg cursor-pointer flex justify-between items-center border-2 border-black"
            onClick={handleClick}
          >
            <span
              style={{ backgroundColor: "#B2E8FF" }}
              className="text-black rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
            >
              คุณต้องการเพิ่มผลตอบแทนด้วยการลงทุนไหม?
            </span>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!isHidden}
                onChange={handleCheckboxChange}
                className="form-checkbox h-5 w-5 text-gray-600 ml-2"
              />
            </label>
          </div>
          {!isHidden && (
            <div className="py-5">
              <div
                style={{ backgroundColor: "#E5F8FF" }}
                className=" w-full h-full grid grid-cols-2 px-3 py-3"
              >
                <div className="font-bold text-black">
                  <p>ระดับความเสี่ยง</p>
                </div>
                <div className="flex item-center justify-center">
                  <input
                    placeholder="6"
                    type="text"
                    value={riskLevel}
                    className="text-black bg-white border border-gray-500 w-full mb-4 px-4 rounded"
                  />
                </div>
                <div className="font-bold text-black">
                  <p>ผลตอบแทนที่คาดหวัง</p>
                </div>
                <div className="flex item-center justify-center">
                  <input
                    placeholder="7 %"
                    type="text"
                    value={returnRate}
                    className="text-black bg-white border border-gray-500 w-full mb-4 px-4 rounded"
                  />
                  <span>%</span>
                </div>
              </div>
              <form action="">
                <div className="flex flex-col items-center justify-center  w-full h-full gap-20 mb-3 block px-3 py-7 text-sm placeholder-gray-500">
                  <div
                    style={{ backgroundColor: "#E5F8FF" }}
                    className="min-w-64 w-full h-full  px-4 py-6 border border-gray-300 rounded bg-gray-50 dark:bg-gray-800 md:p-8"
                  >
                    <div className="text-black rounded py-2 font-bold">
                      <h1 className="text-center md:text-left">
                        ความเสี่ยงที่คุณสามารถรับได้
                      </h1>
                    </div>
                    <div className="w-full h-24 md:h-32">
                      <InvestmentSlider
                        title="my slidebar" 
                        riskLevel={riskLevel.toString()}
                        onChange={e => {
                            updateFields({ 
                                riskLevel: Number(e.target.value), 
                                returnRate: Number(e.target.value)+1 
                            })
                        }}  
                      />
                    </div>
                    <div className="text-black rounded ">
                      <h1 className="font-bold text-center md:text-left">
                        ความเสี่ยงที่คุณสามารถรับได้
                      </h1>
                      <a href="/" target="_blank" rel="noopener noreferrer" className="block text-center md:text-left">
                        <p className="text-blue-800 hover:text-blue-500">
                          หมายเหตุ: คลิกที่นี่เพื่อประเมินความเสี่ยงของคุณ
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="text-black rounded bg-gray-50 dark:bg-gray-800 py-6 font-bold">
                  <h1>เลือกแผนของคุณด้วยผลตอบแทนที่คุณรับได้</h1>
                </div>
                <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                  <div>
                    <EmergencyPlanDataTable title={"my table1"} />
                  </div>
                </div>
              </form>
              <div className="flex justify-end py-5">
                <button
                  onClick={handleEmergencyInvestmanet}
                  style={{ width: "209px" }}
                  className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none"
                  type="button"
                >
                  สร้างแผนการลงทุน
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
}

export default InvestmentForm;