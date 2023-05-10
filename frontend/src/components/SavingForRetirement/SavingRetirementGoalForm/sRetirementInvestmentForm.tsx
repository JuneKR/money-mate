import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InvestmentSlider from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyInvestmentSlider";
import { urlServer } from "@/API";

type ReInvestmentData = {
  dateOfBirth: string;
  ageToRetire: number;
  ageToLive: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
  riskLevel: number;
  returnRate: number;
  selected: boolean;
};

type sRetirementInvestmentFormProps = ReInvestmentData & {
  updateFields: (fields: Partial<ReInvestmentData>) => void;
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
  dateOfBirth: "",
  ageToRetire: 0,
  ageToLive: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
  riskLevel: 0,
  returnRate: 0,
};

export function SRetirementInvestment({
  dateOfBirth,
  targetAmount,
  period,
  monthlySaving,
  ageToRetire,
  ageToLive,
  totalBalance,
  timeRemaining,
  riskLevel,
  returnRate,
  updateFields,
  handleInvestmentSelection,
}: sRetirementInvestmentFormProps) {
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(true);

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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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
      dateOfBirth: dateOfBirth,
      ageToRetire: Number(ageToRetire),
      ageToLive: Number(ageToLive),
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

  console.log(
    "initialTableData",
    initialTableData[1].timeRemaining,
    initialTableData[1].targetAmount,
    initialTableData[1].monthlySaving,
    initialTableData[1].returnRate
  );
  // console.log(numberPeriods(0, 3600000, -6700, 9) / 12);
  const [tableData, setTableData] =
    useState<ReInvestmentData[]>(initialTableData);

  const [selectedTable, setSelectedTable] = useState({
    dateOfBirth: "",
    ageToRetire: 0,
    ageToLive: 0,
    period: 0,
    monthlySaving: 0,
    totalBalance: 0,
    timeRemaining: 0,
    targetAmount: 0,
    riskLevel: 0,
    returnRate: 0,
  });
  function findAge(dateOfBirth: string): number {
    const [year, month, day] = dateOfBirth.split("-");
    const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
    const ageInMilliseconds = Date.now() - birthDate.getTime();
    const ageInYears = Math.floor(
      ageInMilliseconds / 1000 / 60 / 60 / 24 / 365
    );
    return ageInYears;
  }

  const age = findAge(dateOfBirth);
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

  const [defaultOption, setDefaultOption] = useState({
    // expense: expense | 0,
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
        // console.log(userProfile);
        const uID = userProfile.User_ID;
        // setuID(uID);
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
  }, [
    selectedOption,
    defaultOption, 
    selectedTable, 
    updateFields
  ]);

  const handleClick = () => {
    setIsHidden(!isHidden);
    handleInvestmentSelection(isHidden);
  };

  const handleCheckboxChange = () => {
    setIsHidden(!isHidden);
    handleInvestmentSelection(isHidden);
  };

  const handleRadioChange = (index: number) => {
    const newData = tableData.map((data, i) => {
      if (i === index) {
        console.log("New Data:", data);
        setSelectedTable(data);
        setSelectedOption(index + 1);
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
  const timeRemaining2 = ageToRetire - age;

  return (
    <div>
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded-lg"
      >
        <div
          style={{ width: "100%", height: "50%", backgroundColor: "#27264E" }}
          className="flex items-center justify-center w-full h-24 rounded shadow-2xl bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 font-bold text-white sm:grid-cols-2">
            <div className="p-4 text-lg">เป้าหมาย</div>
            <div className="p-4 text-lg">ออมเงินเพื่อเกษียณอายุ</div>
            <div className="p-4">จำนวนเงินเป้าหมายที่ต้องเก็บ: </div>
            <div className="p-4">{formatTargetAmount2} บาท</div>
            <div className="p-4">จำนวนเงินที่ต้องออมต่อเดือน:</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
            <div className="p-4"> ปัจจุบันคุณอายุ:</div>
            <div className="p-4"> {age} ปี</div>
            <div className="p-4"> อยากเกษียณตอนอายุ:</div>
            <div className="p-4"> {ageToRetire} ปี</div>
            <div className="p-4"> คุณมีเวลาในการทำแผนการออมให้สำเร็จ:</div>
            <div className="p-4">{timeRemaining2} ปี</div>
            <div className="p-4"> ระยะเวลาทั้งหมดที่ใช้ในการออมเงิน:</div>
            <div className="p-4">
              {yearsToYearsMonthsDays((timeRemaining).toString())} เดือน
            </div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            className="flex items-center justify-between px-4 transition duration-300 ease-in-out transform border-2 border-black rounded-t-lg cursor-pointer bg-gradient-to-r from-purple-900 to-green-500 hover:scale-105"
            onClick={handleClick}
          >
            <span className="py-2 text-lg font-bold text-white rounded">
              คุณต้องการเพิ่มผลตอบแทนด้วยการลงทุนไหม?
            </span>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={!isHidden}
                onChange={handleCheckboxChange}
                className="w-5 h-5 ml-2 text-gray-600 form-checkbox"
              />
            </label>
          </div>
          {!isHidden && (
            <div className="py-5 ">
              <div
                style={{ backgroundColor: "#27264E" }}
                className="grid w-full h-full grid-cols-2 p-5 shadow-2xl"
              >
                <div className="pb-3 text-lg font-bold text-white">
                  <p>ระดับความเสี่ยง (1-8)</p>
                </div>
                <div className="flex justify-center pb-3 item-center">
                  <div className="block w-full px-3 py-2 text-sm text-xl font-bold text-white rounded-lg placeholder:text-white">
                    {riskLevel}
                  </div>
                </div>
                <div className="text-lg font-bold text-white">
                  <p>ผลตอบแทนที่คาดหวัง</p>
                </div>
                <div className="flex justify-center pb-3 item-center">
                  <div className="block w-full px-3 py-2 text-sm text-xl font-bold text-white rounded-lg placeholder:text-white">
                    {returnRate} %
                  </div>
                </div>
              </div>
              <form action="">
                <div className="flex flex-col items-center justify-center block w-full h-full gap-20 px-3 mb-3 text-lg text-white py-7">
                  <div
                    style={{ backgroundColor: "#27264E" }}
                    className="w-full h-full px-4 py-6 rounded-lg shadow-2xl min-w-64 md:p-8"
                  >
                    <div className="py-2 font-bold text-black rounded">
                      <h1 className="text-center text-white md:text-left">
                        ความเสี่ยงที่คุณสามารถรับได้
                      </h1>
                    </div>
                    <div className="w-full h-24 pt-5 md:h-32">
                      <InvestmentSlider
                        title="my slidebar"
                        riskLevel={riskLevel.toString()}
                        onChange={(e) => {
                          updateFields({
                            riskLevel: Number(e.target.value),
                            returnRate: Number(e.target.value) + 1,
                          });
                          setSelectRiskTorelance(Number(e.target.value));
                        }}
                      />
                    </div>
                    <div className="text-black rounded ">
                      <h1 className="font-bold text-center text-white md:text-left">
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
                  className="font-bold text-black rounded-lg bg-gradient-to-r from-purple-900 to-green-500"
                >
                  <h1 className="py-2 text-lg font-bold text-white rounded">
                    เลือกแผนของคุณด้วยผลตอบแทนที่คุณรับได้
                  </h1>
                </div>
                <div
                  style={{ backgroundColor: "#27264E" }}
                  className="block w-full px-3 py-2 rounded-md shadow-2xl"
                >
                  <div className="flex justify-center item-center">
                    <table className="text-black table-fixed">
                      <thead>
                        <tr className="text-lg ">
                          <th className="px-4 py-2 text-lg font-bold text-white">
                            ออมเงินต่อเดือน
                          </th>
                          <th className="px-4 py-2 text-lg font-bold text-white">
                            ความเสี่ยง
                          </th>
                          <th className="px-4 py-2 text-lg font-bold text-white">
                            ผลตอบแทน
                          </th>
                          <th className="px-4 py-2 text-lg font-bold text-white">
                            ระยะเวลา
                          </th>
                          <th className="px-4 py-2 text-lg font-bold text-white">
                            เลือก
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-lg">
                        {initialTableData.map((data, index) => (
                          <tr
                            key={index}
                            className={
                              data.riskLevel <= selectRiskTorelance
                                ? "transform hover:scale-105 transition duration-300 ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
                                : "opacity-50"
                            }
                          >
                            <td className="px-4 py-2 text-lg font-bold text-white">
                              {data.monthlySaving}
                            </td>
                            <td className="px-4 py-2 text-lg font-bold text-white">
                              {data.riskLevel}
                            </td>
                            <td className="px-4 py-2 text-lg font-bold text-white">
                              {data.returnRate}%
                            </td>
                            <td className="px-4 py-2 text-lg font-bold text-white">
                              {yearsToYearsMonthsDays(
                                data.timeRemaining.toString()
                              )}
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="radio"
                                name="option"
                                value={index + 1}
                                disabled={data.riskLevel > selectRiskTorelance}
                                // checked={data.selected}
                                className="w-10 h-6 text-indigo-600 transition duration-150 ease-in-out form-radio"
                                onChange={() => {
                                  handleRadioChange(index);
                                }}
                              />
                            </td>
                          </tr>
                        ))}
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

export default SRetirementInvestment;
