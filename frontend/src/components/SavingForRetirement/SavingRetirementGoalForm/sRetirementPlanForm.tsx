import { useState, useEffect } from "react";
import Slider1 from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyPlanSliderOption1";
import Slider from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyPlanSliderOption";

type sGoalPlanData = {
  //   planName: string;
  //   targetAmount: number;
  //   period: number;
  //   monthlySaving: number;
  //   initial_saving: number;
  //   startDate: string;
  //   lastUpdate: string;
  //   totalBalance: number;
  //   timeRemaining: number;
  //   dateOfBirth: string;
  //   interestRate: number;
  //   monthlyExpense: number;
  //   ageToRetire: number;
  //   ageToLive: number;
  //   inflationRate: number;
  //   additionalInvestment: number;
  //   progression: string;
  //   riskLevel: number;
  dateOfBirth: string;
  monthlyExpense: number;
  ageToRetire: number;
  ageToLive: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
};

const initialCurrentData: sGoalPlanData = {
  //   planName: "",
  //   targetAmount: 0,
  //   period: 0,
  //   monthlySaving: 0,
  //   initial_saving: 0,
  //   startDate: "",
  //   lastUpdate: "",
  //   totalBalance: 0,
  //   timeRemaining: 0,
  //   dateOfBirth: "",
  //   interestRate: 0,
  //   monthlyExpense: 0,
  //   ageToRetire: 0,
  //   ageToLive: 0,
  //   inflationRate: 0,
  //   additionalInvestment: 0,
  //   progression: "",
  //   riskLevel: 0,
  dateOfBirth: "",
  monthlyExpense: 0,
  ageToRetire: 0,
  ageToLive: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
};

type sGoalPlanFormProps = sGoalPlanData & {
  updateFields: (fields: Partial<sGoalPlanData>) => void;
};

type OptionData = {
  dateOfBirth: string;
  monthlyExpense: number;
  ageToRetire: number;
  ageToLive: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
};

const initialOptionData: OptionData = {
  dateOfBirth: "",
  monthlyExpense: 0,
  ageToRetire: 0,
  ageToLive: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
};

export function SRetirementPlanForm({
  dateOfBirth,
  monthlyExpense,
  ageToRetire,
  ageToLive,
  period,
  monthlySaving,
  totalBalance,
  timeRemaining,
  targetAmount,
  updateFields,
}: sGoalPlanFormProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentState, setCurrentState] = useState(initialCurrentData);
  const currentForm = {
    dateOfBirth,
    monthlyExpense,
    ageToRetire,
    ageToLive,
    period,
    monthlySaving,
    totalBalance,
    timeRemaining,
    targetAmount,
  };
  const [optionState, setOptionState] = useState(initialOptionData);
  const optionForm = {
    dateOfBirth,
    monthlyExpense,
    ageToRetire,
    ageToLive,
    period,
    monthlySaving,
    totalBalance,
    timeRemaining,
    targetAmount,
  };

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
  const tvmCalculator = require("tvm-calculator");

  function retirementPmtValue(
    pvInput: number,
    nperInput: number,
    fvInput: number,
    rateInput: number
  ) {
    const remainTimeTvmResult = tvmCalculator.calcPMT({
      pv: -pvInput,
      nper: nperInput,
      fv: fvInput,
      rate: rateInput,
    });
    return remainTimeTvmResult;
  }

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

  //   Parent State
  const exactExpense = monthlyExpense * 2.0; //รายจ่าย * เงินเฟ้อ 2%
  const retirementFund = exactExpense * ((ageToLive - ageToRetire) * 12); //เป้าหมายเงินทุนเกษียณทั้งหมด
  const rePeriod = (ageToRetire - age) * 12;

  const retirementMonthlySaving = retirementPmtValue(
    Number(totalBalance),
    rePeriod,
    retirementFund,
    2
  );

  const rePeriodPlan = numberPeriods(
    Number(totalBalance),
    retirementFund,
    -retirementMonthlySaving,
    0
  );
  console.log("rePeriodPlan ", rePeriodPlan / 12);

  // Current Plan State
  const currentExactExpense = currentState.monthlyExpense * 2.0; //รายจ่าย * เงินเฟ้อ 2%
  const currentRetirementFund =
    currentExactExpense *
    ((currentState.ageToLive - currentState.ageToRetire) * 12); //เป้าหมายเงินทุนเกษียณทั้งหมด
  const currentRePeriod = (currentState.ageToRetire - age) * 12;
  const currentRetirementMonthlySaving =
    retirementPmtValue(
      Number(currentState.totalBalance),
      currentRePeriod,
      currentRetirementFund,
      2
    ) * -1;
  const currentRePeriodPlan = numberPeriods(
    Number(currentState.totalBalance),
    currentRetirementFund,
    currentRetirementMonthlySaving,
    0
  );

  // Option Plan State
  const optionExactExpense = optionState.monthlyExpense * 2.0;
  const optionRetirementFund =
    optionExactExpense *
    ((optionState.ageToLive - optionState.ageToRetire) * 12);
  const optionRePeriod = (optionState.ageToRetire - age) * 12;
  const optionRetirementMonthlySaving =
    retirementPmtValue(
      Number(optionState.totalBalance),
      optionRePeriod,
      optionRetirementFund,
      2
    ) * -1;

  const optionRePeriodPlan = numberPeriods(
    Number(optionState.totalBalance),
    optionRetirementFund,
    optionRetirementMonthlySaving,
    0
  );
  //   console.log(
  //     "rePeriodPlan",
  //     totalBalance,
  //     retirementFund,
  //     retirementMonthlySaving
  //   );
  //   console.log(
  //     "optionRePeriodPlan: ",
  //     optionRePeriodPlan,
  //     optionState.totalBalance,
  //     optionRetirementFund,
  //     optionRetirementMonthlySaving
  //   );

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

  //   console.log("Parent State", {
  //     dateOfBirth,
  //     monthlyExpense,
  //     ageToRetire,
  //     ageToLive,
  //     period,
  //     monthlySaving,
  //     totalBalance,
  //     timeRemaining,
  //     targetAmount,
  //   });
  //     console.log("Current Plan", currentState);
  //     console.log("Option Plan", optionState);

  console.log("rePeriodPlan", rePeriodPlan);
  console.log("currentRePeriodPlan", currentRePeriodPlan);
  console.log("optionRePeriodPlan", optionRePeriodPlan);
  // Once user click on checkbox
  const handleClick = () => {
    setIsHidden(!isHidden);
    setOptionState(optionForm);
    setCurrentState(currentForm);
  };

  const handleCheckboxChange = () => {
    setIsHidden(!isHidden);
  };

  function updateCurrentFields(fields: Partial<sGoalPlanData>) {
    setCurrentState((prev) => {
      return { ...prev, ...fields };
    });
  }

  function updateOptionFields(fields: Partial<OptionData>) {
    setOptionState((prev) => {
      return { ...prev, ...fields };
    });
  }

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    // Check the selected option to fetch the apis and update the parent state
    if (selectedOption === "option1") {
      // Update the Current Plan State
      updateCurrentFields({ timeRemaining: Number(currentRePeriodPlan) });
      updateCurrentFields({ targetAmount: Number(currentRetirementFund) });
    //   updateCurrentFields({ period: Number(currentRePeriodPlan) });

      updateFields({
        dateOfBirth: currentState.dateOfBirth,
        monthlyExpense: currentState.monthlyExpense,
        ageToRetire: currentState.ageToRetire,
        ageToLive: currentState.ageToLive,
        period: currentState.period,
        monthlySaving: currentState.monthlySaving,
        totalBalance: currentState.totalBalance,
        timeRemaining: currentState.timeRemaining,
        targetAmount: currentState.targetAmount,
      });
    } else if (selectedOption === "option2") {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionRePeriodPlan)});
      updateOptionFields({ targetAmount: Number(optionRetirementFund) });
    //   updateOptionFields({ period: Number(optionRePeriodPlan) });
      updateOptionFields({ monthlySaving: Number(optionRetirementMonthlySaving)});
      updateFields({
        dateOfBirth: optionState.dateOfBirth,
        monthlyExpense: optionState.monthlyExpense,
        ageToRetire: optionState.ageToRetire,
        ageToLive: optionState.ageToLive,
        period: optionState.period,
        monthlySaving: optionState.monthlySaving,
        totalBalance: optionState.totalBalance,
        timeRemaining: optionState.timeRemaining,
        targetAmount: optionState.targetAmount,
      });
    } else {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionRePeriodPlan) });
      updateOptionFields({ targetAmount: Number(optionRetirementFund) });
    //   updateOptionFields({ period: Number(optionRePeriodPlan) });
      updateOptionFields({ monthlySaving: Number(optionRetirementMonthlySaving)});

      // Update the Current Plan State
      updateCurrentFields({ timeRemaining: Number(currentRePeriod) });
      updateCurrentFields({ targetAmount: Number(currentRetirementFund) });
      updateCurrentFields({ period: Number(currentRePeriodPlan) });
      updateCurrentFields({ monthlySaving: Number(currentRetirementMonthlySaving)});
    }

    // Check the Checkbox is hidden or not to set parent state
    if (isHidden) {
      // Update the Parent Plan State
      updateFields({ timeRemaining: Number(rePeriodPlan) });
      updateFields({ targetAmount: Number(retirementFund) });
    //   updateFields({ period: Number(rePeriodPlan) });
      updateFields({ monthlySaving: Number(retirementMonthlySaving)});
      //   updateFields({ ageToLive: Number(retirementFund)});
    }
  }, [
    isHidden,
    selectedOption,
    currentRetirementFund,
    currentState.targetAmount,
    optionState.targetAmount,
    selectedOption,
  ]);

  const reFund = Number(targetAmount);
  const monthlySaving2 = Number(retirementMonthlySaving) * -1;
  const formattedReFund = reFund.toLocaleString();
  const formattedMonthlySaving = monthlySaving2.toLocaleString();

  return (
    <>
      <div style={{ padding: "0 4rem" }}>
        <div
          style={{ height: "50%", backgroundColor: "#27264E" }}
          className="shadow-2xl w-full flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 text-white font-bold">
            <div className="text-lg p-4">เป้าหมาย:</div>
            <div className="text-lg p-4">ออมเงินเพื่อเกษียณอายุ</div>
            <div className="p-4">จำนวนเงินเป้าหมายที่ต้องเก็บ: </div>
            <div className="p-4">{formattedReFund} บาท</div>
            <div className="p-4">จำนวนเงินที่ต้องออมต่อเดือน:</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
            <div className="p-4"> ปัจจุบันคุณอายุ:</div>
            <div className="p-4"> {age} ปี</div>
            <div className="p-4"> อยากเกษียณตอนอายุ:</div>
            <div className="p-4"> {ageToRetire} ปี</div>
            <div className="p-4"> คุณมีเวลาในการทำแผนการออมให้สำเร็จ:</div>
            <div className="p-4"> {ageToRetire - age} ปี</div>
            <div className="p-4"> ระยะเวลาทั้งหมดที่ใช้ในการออมเงิน:</div>
            <div className="p-4">
              {yearsToYearsMonthsDays((timeRemaining / 12).toString())}
            </div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            className=" transform hover:scale-105 transition duration-300 ease-in-out px-4 rounded-t-lg cursor-pointer flex justify-between items-center border-2 border-black  bg-gradient-to-r from-purple-900 to-green-500 hover:bg-blue-500 transition delay-150"
            onClick={handleClick}
          >
            <span className="text-white text-lg rounded py-2 font-bold">
              คุณสามารถปรับเปลี่ยนและเลือกเป้าหมายที่ดูเป็นได้ไปที่สุดสำหรับคุณ
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
            <div
              className="p-10 shadow-2xl"
              style={{ backgroundColor: "#27264E" }}
            >
              <div className="pb-5">
                <p className="text-white font-bold text-md">
                  Tips: ลองปรับเปลี่ยนตัวแปร
                  เพื่อหาระยะเวลาออมที่เหมาะสมสำหรับคุณ
                </p>
              </div>
              <form action="">
                <div
                  style={{ opacity: 0.6 }}
                  className=" transform hover:scale-105 transition duration-300 ease-in-out shadow-2xl block w-full px-3  py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                      className="form-radio h-6 w-10 text-indigo-600 transition duration-150 ease-in-out animate-bounce mt-2 cursor-pointer"
                    />
                  </div>

                  <div className="px-20 pb-5">
                    <p className="flex item-center justify-center text-white font-bold text-2xl pb-3 bg-indigo-500 rounded-full shadow-2xl">
                      แผนการออมปัจจุบันของคุณ
                    </p>
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 text-black p-5"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="mb-4 pb-5 text-white font-bold">
                            ค่าใช้จ่าย/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            อายุที่ต้องใจเกษียณ
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินออม/ต่อเดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินออมทั้งหมดในปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={currentState.monthlyExpense}
                              type="text"
                              readOnly
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="1,000"
                              value={currentState.ageToRetire}
                              readOnly
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={currentRetirementMonthlySaving}
                              onChange={(e) =>
                                updateOptionFields({
                                  totalBalance: Number(e.target.value),
                                })
                              }
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={currentState.totalBalance}
                              readOnly
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{
                        width: "100%",
                        backgroundColor: "#3A3B5A",
                      }}
                      className="mb-4 sm:ml-2 md:ml-0 md:mb-0 rounded-lg"
                    >
                      <div className="flex items-center justify-center">
                        <label htmlFor="#" className="block">
                          <span className="block m-1 text-white font-bold flex items-center justify-center py-5">
                            ระยะเวลาออม
                          </span>
                          <div
                            style={{
                              width: "100%",
                              backgroundColor: "#27264E",
                            }}
                            className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          >
                            {yearsToYearsMonthsDays((currentState.period / 12).toString())}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: 25 }}
                  className=" transform hover:scale-105 transition duration-300 ease-in-out shadow-2xl block w-full px-3  py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm "
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                      className="form-radio h-6 w-10 text-indigo-600 transition duration-150 ease-in-out animate-bounce mt-2 cursor-pointer"
                    />
                  </div>

                  <div className="px-20">
                    <p className="flex item-center justify-center text-white bg-gradient-to-r from-purple-900 to-green-500 font-bold text-2xl pb-3 rounded-full shadow-2xl ">
                      แผนการออมเงินทางเลือก
                    </p>
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 text-black p-5"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl rounded-lg"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="mb-4 pb-5 text-white font-bold">
                            ค่าใช้จ่าย/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            อายุที่ต้องการเกษียณ
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินออม/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินออมทั้งหมดในปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={optionState.monthlyExpense}
                              onChange={(e) =>
                                updateOptionFields({
                                  monthlyExpense: Number(e.target.value),
                                })
                              }
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="1,000"
                              value={optionState.ageToRetire}
                              onChange={(e) =>
                                updateOptionFields({
                                  ageToRetire: Number(e.target.value),
                                })
                              }
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={optionState.monthlySaving}
                              onChange={(e) =>
                                updateOptionFields({
                                  monthlySaving: Number(e.target.value),
                                })
                              }
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={optionState.totalBalance}
                              onChange={(e) =>
                                updateOptionFields({
                                  totalBalance: Number(e.target.value),
                                })
                              }
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{ width: "100%", backgroundColor: "#3A3B5A" }}
                      className="mb-4 sm:ml-2 md:ml-0 md:mb-0 rounded-lg"
                    >
                      <div className="flex items-center justify-center">
                        <label htmlFor="#" className="block ">
                          <span className="block m-1 text-white font-bold flex items-center justify-center py-5">
                            ระยะเวลาออม
                          </span>
                          <div
                            style={{
                              width: "100%",
                              backgroundColor: "#27264E",
                            }}
                            className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          >
                            {yearsToYearsMonthsDays((optionState.timeRemaining / 12).toString())}
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
