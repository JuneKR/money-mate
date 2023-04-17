import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InvestmentSlider from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyInvestmentSlider";
import { time } from "console";

type InvestmentData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
  riskLevel: number;
  returnRate: number;
  selected: boolean;
};

type InvestmentFormProps = InvestmentData & {
  updateFields: (fields: Partial<InvestmentData>) => void;
  handleInvestmentSelection: any;
};

export const initialPackage = {
  Package_ID: 1,
  PackageName: "",
  LastUpdate: "",
  RiskSpectrum: 1,
  InvestmentType: "กองทุนรวม",
  ReturnRate: 0,
};

export const initialPlanData = {
  Emergency_ID: 1,
  PlanName: "",
  TargetAmount: 0,
  TimePeriod: 0,
  MonthlySaving: 0,
  StartDate: "",
  LastUpdate: "",
  TotalBalance: 0,
  TimeRemaining: 0,
  MonthlyExpense: 0,
  Progression: 0,
};

export function InvestmentForm({
  expense,
  period,
  monthlySaving,
  totalBalance,
  timeRemaining,
  targetAmount,
  riskLevel,
  returnRate,
  updateFields,
  handleInvestmentSelection,
}: InvestmentFormProps) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);

  // Max User Risk Torelance
  const [selectRiskTorelance, setSelectRiskTorelance] = useState(0);
  const tvmCalculator = require("tvm-calculator");

  function numberPeriods(
    pvInput: number,
    fvInput: number,
    pmInputt: number,
    rateInput: number
  ) {
    const remainTimeTvmResult = tvmCalculator.calcNPer({
      pv: -pvInput,
      fv: fvInput,
      pmt: -pmInputt,
      rate: rateInput,
    });
    return remainTimeTvmResult;
  }

  const initialTableData = [
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          0
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 0,
      returnRate: 0,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          2
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 1,
      returnRate: 2,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          3
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 2,
      returnRate: 3,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          4
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 3,
      returnRate: 4,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          5
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 4,
      returnRate: 5,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          6
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 5,
      returnRate: 6,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          7
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 6,
      returnRate: 7,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          8
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 7,
      returnRate: 8,
      selected: false,
    },
    {
      expense: Number(expense),
      period: Number(period),
      monthlySaving: Number(monthlySaving),
      totalBalance: Number(totalBalance),
      timeRemaining:
        numberPeriods(
          Number(totalBalance),
          Number(targetAmount),
          Number(monthlySaving),
          9
        ) / 12,
      targetAmount: Number(targetAmount),
      riskLevel: 8,
      returnRate: 9,
      selected: false,
    },
  ];

  const [tableData, setTableData] =
    useState<InvestmentData[]>(initialTableData);
  const [selectedTable, setSelectedTable] = useState({
    expense: 0,
    period: 0,
    monthlySaving: 0,
    totalBalance: 0,
    timeRemaining: 0,
    targetAmount: 0,
    riskLevel: 0,
    returnRate: 0,
  });

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

  const timeToAchive = yearsToYearsMonthsDays(timeRemaining.toString());

  const urlServer = "http://localhost:8080/";
  const [defaultOption, setDefaultOption] = useState({
    expense: expense | 0,
    period: period | 0,
    monthlySaving: monthlySaving | 0,
    totalBalance: totalBalance | 0,
    timeRemaining:
      numberPeriods(
        Number(totalBalance),
        Number(targetAmount),
        Number(monthlySaving),
        0
      ) / 12,
    targetAmount: targetAmount | 0,
    riskLevel: riskLevel | 0,
    returnRate: returnRate | 0,
  });
  const [selectedOption, setSelectedOption] = useState(0);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        // Fetch User Profile
        const profileResponse = await fetch(urlServer + "user/profile", {
          credentials: "include",
        });
        const userProfile = await profileResponse.json();
      } catch (error) {
        console.log("fetch User Profile Error: ", error);
      }
    }

    // Update Parent Component State
    if (selectedOption === 0) {
      updateFields(defaultOption);
    } else {
      updateFields(selectedTable);
    }

    fetchUserProfile();
  }, [selectedOption]);

  
  const handleClick = () => {
    setIsHidden(!isHidden);
  };

  const handleCheckboxChange = () => {
    setIsHidden(!isHidden);
    handleInvestmentSelection(isHidden);
  };

  const handleRadioChange = (index: number) => {
    const newData = tableData.map((data, i) => {
      if (i === index) {
        setSelectedTable(data);
        setSelectedOption(index + 1);
        console.log("Selected Data:", data);
        console.log("Selected Option:", index+1);
        // Set Selected Risk Spectrum Option
        // Update Parent Field
        updateFields(data);
        return { ...data, selected: true };
      } else {
        return { ...data, selected: false };
      }
    });
    setTableData(newData);
  };

  const targetAmount2 = Number(targetAmount);
  const monthlySaving2 = Number(monthlySaving);
  const formatTargetAmount2 = targetAmount2.toLocaleString();
  const formattedMonthlySaving = monthlySaving2.toLocaleString();

  return (
    <div>
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded-lg"
      >
        <div
          style={{ width: "100%", height: "50%", backgroundColor: "#27264E" }}
          className="shadow-2xl w-full flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 text-white font-bold">
            <div className="text-white p-4">เป้าหมาย</div>
            <div className="text-white p-4">ออมเงินเผื่อฉุกเฉิน</div>
            <div className="text-lg p-4">คุณต้องมีเงินออมฉุกเฉินทั้งหมด</div>
            <div className="text-lg p-4">{formatTargetAmount2} บาท</div>
            <div className="p-4">ระยะเวลาทั้งหมดในการออม</div>
            <div className="p-4">{timeToAchive}</div>
            <div className="p-4">จำนวนเดือนที่ต้องการออม</div>
            <div className="p-4">{period} เดือน</div>
            <div className="p-4">จำนวนเงินที่จะออมต่อเดือน</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            style={{ backgroundColor: "#6259E8" }}
            className="transform hover:scale-105 transition duration-300 ease-in-out px-4 rounded-t-lg cursor-pointer flex justify-between items-center border-2 border-black"
            onClick={handleClick}
          >
            <span
              style={{ backgroundColor: "#6259E8" }}
              className="text-white text-lg rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
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
            <div className="py-5 ">
              <div
                style={{ backgroundColor: "#27264E" }}
                className="shadow-2xl w-full h-full grid grid-cols-2 p-5"
              >
                <div className="font-bold text-white text-lg pb-3">
                  <p>ระดับความเสี่ยง (1-8)</p>
                </div>
                <div className="flex item-center justify-center pb-3">
                  <div className="font-bold text-xl text-white block w-full px-3 py-2 text-sm  rounded-lg placeholder:text-white">
                    {riskLevel}
                  </div>
                </div>
                <div className="font-bold text-white text-lg">
                  <p>ผลตอบแทนที่คาดหวัง</p>
                </div>
                <div className="flex item-center justify-center pb-3">
                  <div className="font-bold text-xl text-white block w-full px-3 py-2 text-sm  rounded-lg placeholder:text-white">
                    {returnRate} %
                  </div>
                </div>
              </div>
              <form action="">
                <div className="flex flex-col items-center justify-center  w-full h-full gap-20 mb-3 block px-3 py-7 text-lg text-white">
                  <div
                    style={{ backgroundColor: "#27264E" }}
                    className="shadow-2xl min-w-64 w-full h-full px-4 py-6 rounded-lg md:p-8"
                  >
                    <div className="text-black rounded py-2 font-bold">
                      <h1 className="text-center md:text-left text-white">
                        ความเสี่ยงที่คุณสามารถรับได้
                      </h1>
                    </div>
                    <div className="w-full h-24 md:h-32 pt-5">
                      <InvestmentSlider
                        title="my slidebar"
                        riskLevel={riskLevel.toString()}
                        onChange={(e) => {
                          updateFields({
                            riskLevel: Number(e.target.value),
                            returnRate: Number(e.target.value) + 1,
                          });
                          setSelectRiskTorelance(riskLevel);
                        }}
                      />
                    </div>
                    <div className="text-black rounded ">
                      <h1 className="font-bold text-center md:text-left text-white">
                        หากไม่ทราบระดับความเสี่ยงของตนเองโปรดทำแบบประเมินความเสี่ยง
                      </h1>
                      <a
                        // href=""
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center md:text-left"
                      >
                        <p className="text-white hover:text-blue-300 ">
                          หมายเหตุ: คลิกที่นี่เพื่อประเมินความเสี่ยงของคุณ
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#6259E8" }}
                  className="text-black rounded-lg font-bold"
                >
                  <h1 className="text-white text-lg rounded py-2 font-bold">
                    เลือกแผนของคุณด้วยผลตอบแทนที่คุณรับได้
                  </h1>
                </div>
                <div
                  style={{ backgroundColor: "#27264E" }}
                  className="block w-full px-3 py-2 rounded-md shadow-2xl"
                >
                  <div className="flex justify-center item-center">
                    <table className="table-fixed text-black">
                      <thead>
                        <tr className=" text-lg">
                          <th className="px-4 py-2 text-white font-bold text-lg">
                            ออมเงินต่อเดือน
                          </th>
                          <th className="px-4 py-2 text-white font-bold text-lg">
                            ความเสี่ยง
                          </th>
                          <th className="px-4 py-2 text-white font-bold text-lg">
                            ผลตอบแทน
                          </th>
                          <th className="px-4 py-2 text-white font-bold text-lg">
                            ระยะเวลา
                          </th>
                          <th className="px-4 py-2 text-white font-bold text-lg">
                            เลือก
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-lg">
                        {initialTableData.map(
                          (data, index) => (
                            // data.riskLevel <= selectedRiskLevel && (
                            <tr key={index}>
                              {/* <td className="px-4 py-2 text-white font-bold text-lg"> */}
                              <td
                                className={
                                  data.riskLevel <= selectRiskTorelance
                                    ? "bg-blue-400"
                                    : "px-4 py-2 text-white font-bold text-lg"
                                }
                              >
                                {data.monthlySaving}
                              </td>
                              <td className="px-4 py-2 text-white font-bold text-lg">
                                {data.riskLevel}
                              </td>
                              <td className="px-4 py-2 text-white font-bold text-lg">
                                {data.returnRate}%
                              </td>
                              <td className="px-4 py-2 text-white font-bold text-lg">
                                {yearsToYearsMonthsDays(
                                  data.timeRemaining.toString()
                                )}
                              </td>
                              <td className="px-4 py-2">
                                <input
                                  type="radio"
                                  name="option"
                                  value={index + 1}
                                  // checked={data.selected}
                                  className="form-radio h-6 w-10 text-indigo-600 transition duration-150 ease-in-out"
                                  onChange={() => {
                                    handleRadioChange(index);
                                  }}
                                />
                              </td>
                            </tr>
                          )
                          // )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestmentForm;
