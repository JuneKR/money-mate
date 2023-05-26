import { useState, useEffect } from "react";
import Slider1 from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyPlanSliderOption1";
import Slider from "@/components/SavingEmergency/EmergencyPlanSlider/emergencyPlanSliderOption";

type PlanData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  targetAmount: number;
  timeRemaining: number;
};

const initialCurrentData: PlanData = {
  expense: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
};

type PlanFormProps = PlanData & {
  updateFields: (fields: Partial<PlanData>) => void;
};

type OptionData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
};

const initialOptionData: OptionData = {
  expense: 0,
  period: 0,
  monthlySaving: 0,
  totalBalance: 0,
  timeRemaining: 0,
  targetAmount: 0,
};

export function PlanForm({
  expense,
  period,
  monthlySaving,
  totalBalance,
  targetAmount,
  timeRemaining,
  updateFields,
}: PlanFormProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [optionMonthlyExpenseError, setOptionMonthlyExpenseError] = useState("");
  const [optionMonthlySavingError, setOptionMonthlySavingError] = useState("");
  const [optionTotalBalanceError, setOptionTotalBalanceError] = useState("");
  const [currentState, setCurrentState] = useState(initialCurrentData);
  const currentForm = {
    expense,
    period,
    monthlySaving,
    totalBalance,
    timeRemaining,
    targetAmount,
  };
  const [optionState, setOptionState] = useState(initialOptionData);
  const optionForm = {
    expense,
    period,
    monthlySaving,
    totalBalance,
    timeRemaining,
    targetAmount,
  };
  const tvmCalculator = require("tvm-calculator");

  /* handle state to display error message */
  const handleOptionMonthlyExpenseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateOptionFields({ expense: Number(value) })
      setOptionMonthlyExpenseError("");
    } else {
      setOptionMonthlyExpenseError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 20000 บาท");
    }
  };

  const handleOptionMonthlySavingChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateOptionFields({ monthlySaving: Number(value) })
      setOptionMonthlySavingError("");
    } else {
      setOptionMonthlySavingError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 20000 บาท");
    }
  };

  const handleOptionTotalBalanceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateOptionFields({ totalBalance: Number(value) })
      setOptionTotalBalanceError("");
    } else {
      setOptionTotalBalanceError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 20000 บาท");
    }
  };

  function multiply(x: string, y: string): string {
    const numX = Number(x);
    const numY = Number(y);
    if (Number.isNaN(numX) || Number.isNaN(numY)) {
      return "Invalid input";
    }
    const result = numX * numY;
    return result.toString();
  }

  function divided(x: string, y: string): string {
    const numX = Number(x);
    const numY = Number(y);
    if (Number.isNaN(numX) || Number.isNaN(numY)) {
      return "Invalid input";
    }
    const result = numX / numY / 12;
    return result.toString();
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

  function futureValue(
    pvInput: number,
    pmInputt: number,
    rateInput: number,
    nperInput: number,
  ) {
    // nper: Number of Periods (Default unit is Month) 
    // change year to month by multiply 12
    const nperMonths = nperInput * 12;
    const futureValueResult = tvmCalculator.calcFV({
      pv: -pvInput,
      pmt: -pmInputt,
      rate: rateInput,
      nper: nperMonths,
    });
    return futureValueResult;
  }

  function calculateFutureTargetAmountValue(targetAmount: number, years: number) {
    const inflationRate = 3;
    let futureTargetAmount = targetAmount;

    if (years >= 1) {
      futureTargetAmount = futureValue(targetAmount, 0, inflationRate, years);
    }
    return futureTargetAmount;
  }

  // Parent State
  let emergencyFund = multiply(expense.toString(), period.toString());
  const targetEmergencyFund = Number(emergencyFund) - totalBalance;
  const years = divided(
    targetEmergencyFund.toString(),
    monthlySaving.toString()
  );

  // Current Plan State
  const currentEmergencyFund = multiply(
    currentState.expense.toString(),
    currentState.period.toString()
  );
  const currentTargetEmergencyFund = Number(currentEmergencyFund) - currentState.totalBalance;
  const currentYears = divided(
    currentTargetEmergencyFund.toString(),
    currentState.monthlySaving.toString()
  );

  // Option Plan State
  const optionEmergencyFund = multiply(
    optionState.expense.toString(),
    optionState.period.toString()
  );
  const optionTargetEmergencyFund =
    Number(optionEmergencyFund) - optionState.totalBalance;
  const optionYears = divided(
    optionTargetEmergencyFund.toString(),
    optionState.monthlySaving.toString()
  );

  // Set time to achieve (Old)
  const timeToAchive = yearsToYearsMonthsDays(years);
  const currentTimeToAchive = yearsToYearsMonthsDays(currentYears);
  const optionTimeToAchive = yearsToYearsMonthsDays(optionYears);

  // Set future value of target goal
  const futureTargetAmount = calculateFutureTargetAmountValue(targetEmergencyFund, Number(years));
  const currentFutureTargetAmount = calculateFutureTargetAmountValue(currentTargetEmergencyFund, Number(currentYears));
  const optionFutureTargetAmount = calculateFutureTargetAmountValue(optionTargetEmergencyFund, Number(optionYears));
  
  // Find Future value 


  const yearsToAchieveGoal = divided(
    futureTargetAmount.toString(),
    monthlySaving.toString()
  );

  const currentYearsToAchieveGoal = divided(
    currentFutureTargetAmount.toString(),
    currentState.monthlySaving.toString()
  );

  const optionYearsToAchieveGoal = divided(
    optionFutureTargetAmount.toString(),
    optionState.monthlySaving.toString()
  );
  

  // Set time to achieve (New)  
  // const timeToAchive = yearsToYearsMonthsDays(years);
  // const currentTimeToAchive = yearsToYearsMonthsDays(currentYears);
  // const optionTimeToAchive = yearsToYearsMonthsDays(optionYears);

  console.log('Years', years);
  console.log('Years to Achieve Goal', yearsToAchieveGoal);
  console.log('Future Target Amount', futureTargetAmount);
  console.log('Current Future Target Amount', currentFutureTargetAmount);
  console.log('Option Future Target Amount', optionFutureTargetAmount);

  /*
    todolist 
    [/] 1. calculate future value of target amount with inflation rate
    [] 2. recalculate time to achieve of goal
   */

  // Once user click on checkbox
  const handleClick = () => {
    setIsHidden(!isHidden);
    setOptionState(optionForm);
    setCurrentState(currentForm);
  };

  const handleCheckboxChange = () => {
    setIsHidden(!isHidden);
  };

  function updateCurrentFields(fields: Partial<PlanData>) {
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
      // updateCurrentFields({ targetAmount: Number(currentEmergencyFund) });
      // updateCurrentFields({ timeRemaining: Number(currentYears) });
      updateCurrentFields({ timeRemaining: Number(currentFutureTargetAmount) });
      updateCurrentFields({ targetAmount: currentFutureTargetAmount });

      updateFields({
        expense: currentState.expense,
        period: currentState.period,
        monthlySaving: currentState.monthlySaving,
        totalBalance: currentState.totalBalance,
        // targetAmount: currentState.targetAmount,
        targetAmount: currentFutureTargetAmount,
        // timeRemaining: currentState.timeRemaining,
        timeRemaining: Number(currentYearsToAchieveGoal)
      });
    } else if (selectedOption === "option2") {
      // Update the Option Plan State
      // updateOptionFields({ targetAmount: Number(optionEmergencyFund) });
      // updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ timeRemaining: Number(optionYearsToAchieveGoal) });
      updateOptionFields({ targetAmount: optionFutureTargetAmount });

      updateFields({
        expense: optionState.expense,
        period: optionState.period,
        monthlySaving: optionState.monthlySaving,
        totalBalance: optionState.totalBalance,
        // targetAmount: optionState.targetAmount,
        targetAmount: optionFutureTargetAmount,
        // timeRemaining: optionState.timeRemaining,
        timeRemaining: Number(optionYearsToAchieveGoal)
      });
    } else {
      // Update the Option Plan State
      // updateOptionFields({ targetAmount: Number(optionEmergencyFund) });
      // updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ timeRemaining: Number(optionYearsToAchieveGoal) });
      updateOptionFields({ targetAmount: optionFutureTargetAmount });

      // Update the Current Plan State
      // updateCurrentFields({ timeRemaining: Number(currentYears) });
      // updateCurrentFields({ targetAmount: Number(currentEmergencyFund) });
      updateCurrentFields({ timeRemaining: Number(currentYearsToAchieveGoal) });
      updateCurrentFields({ targetAmount: currentFutureTargetAmount });
    }

    // Check the Checkbox is hidden or not to set parent state
    if (isHidden) {
      // Update the Parent Plan State
      // updateFields({ timeRemaining: Number(years) });
      // updateFields({ targetAmount: Number(emergencyFund) });
      updateFields({ timeRemaining: Number(yearsToAchieveGoal) });
      updateFields({ targetAmount: futureTargetAmount });
    }
  }, [
    selectedOption,
    isHidden,
  ]);
  
  const emergencyFund2 = Number(emergencyFund);
  const monthlySaving2 = Number(monthlySaving);
  const formattedEmergencyFund = emergencyFund2.toLocaleString();
  const formattedFutureEmergencyFund = futureTargetAmount.toLocaleString();
  const formattedMonthlySaving = monthlySaving2.toLocaleString();

  return (
    <>
      <div style={{ padding: "0 4rem" }}>
        <div
          style={{ height: "50%", backgroundColor: "#27264E" }}
          className="flex items-center justify-center w-full h-24 rounded shadow-2xl bg-gray-50"
        >
          <div className="grid grid-cols-1 font-bold text-white md:grid-cols-2">
            <div className="p-4 text-lg">เป้าหมาย</div>
            <div className="p-4 text-lg">ออมเงินเผื่อฉุกเฉิน</div>
            <div className="p-4">คุณต้องมีเงินออมฉุกเฉินทั้งหมด: </div>
            <div className="p-4">{formattedEmergencyFund} บาท</div>
            <div className="p-4">ระยะเวลาทั้งหมดในการออม</div>
            <div className="p-4">{timeToAchive}</div> 
            {Number(years)>= 1 && (
              <>
                <div className="p-4">คุณต้องมีเงินออมฉุกเฉินทั้งหมดหลังปรับเงินเฟ้อ: </div>
                <div className="p-4">{formattedFutureEmergencyFund} บาท</div>
                <div className="p-4">ระยะเวลาทั้งหมดในการออมหลังปรับเงินเฟ้อ</div>
                <div className="p-4">{yearsToYearsMonthsDays(timeRemaining.toString())}</div> 
              </>
            )}

            <div className="p-4"> จำนวนเดือนที่ต้องการออม</div>
            <div className="p-4">{period} เดือน</div>
            <div className="p-4">จำนวนเงินที่จะออมต่อเดือน</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            className="flex items-center justify-between px-4 transition duration-300 ease-in-out delay-150 transform bg-indigo-500 border-2 border-black rounded-t-lg cursor-pointer hover:scale-105 hover:bg-blue-500"
            onClick={handleClick}
          >
            <span className="py-2 text-lg font-bold text-white rounded">
              คุณสามารถปรับเปลี่ยนและเลือกเป้าหมายที่ดูเป็นได้ไปที่สุดสำหรับคุณ
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
            <div
              className="p-10 shadow-2xl"
              style={{ backgroundColor: "#27264E" }}
            >
              <div className="pb-5">
                <p className="font-bold text-white text-md">
                  Tips: ลองปรับเปลี่ยนตัวแปร
                  เพื่อหาระยะเวลาออมที่เหมาะสมสำหรับคุณ
                </p>
              </div>
              <form action="">
                <div
                  style={{ opacity: 0.6 }}
                  className="block w-full px-3 py-2 text-sm placeholder-gray-500 transition duration-300 ease-in-out transform border border-gray-300 rounded-md shadow-sm shadow-2xl hover:scale-105"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                      className="w-10 h-6 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    />
                  </div>

                  <div className="px-20 pb-5">
                    <p className="flex justify-center pb-3 text-2xl font-bold text-white bg-indigo-500 rounded-full shadow-2xl item-center">
                      แผนการออมปัจจุบันของคุณ

                    </p>
                    
                  </div>

                  <div className="flex items-center justify-center h-24 px-5 rounded-full">
                    <Slider1
                      title="my slidebar1"
                      months={currentState.period.toString()}
                      disabled={true}
                    />
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-2"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="pb-5 mb-4 font-bold text-white">
                            ค่าใช้จ่าย/เดือน
                          </div>
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออม/เดือน
                          </div>
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออมทั้งหมดในปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={currentState.expense}
                              type="text"
                              readOnly
                              // onChange={e => updateFields({ expense: Number(e.target.value) })}
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="1,000"
                              value={currentState.monthlySaving}
                              // onChange={e => updateFields({ monthlySaving: Number(e.target.value) })}
                              readOnly
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={currentState.totalBalance}
                              readOnly
                              // onChange={e => updateFields({ totalBalance: Number(e.target.value) })}
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
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
                      className="mb-4 rounded-lg sm:ml-2 md:ml-0 md:mb-0"
                    >
                      <div className="flex items-center justify-center">
                        <label htmlFor="#" className="block">
                          <span className="flex items-center justify-center block py-5 m-1 font-bold text-white">
                            ระยะเวลาออม
                          </span>
                          <input
                            type="string"
                            id="#"
                            value={currentTimeToAchive}
                            readOnly
                            placeholder=""
                            style={{
                              width: "100%",
                              backgroundColor: "#27264E",
                            }}
                            className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: 25 }}
                  className="block w-full px-3 py-2 text-sm placeholder-gray-500 transition duration-300 ease-in-out transform border border-gray-300 rounded-md shadow-sm shadow-2xl hover:scale-105"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                      className="w-10 h-6 text-indigo-600 transition duration-150 ease-in-out form-radio"
                    />
                  </div>

                  <div className="px-20">
                    <p className="flex justify-center pb-3 text-2xl font-bold text-white rounded-full shadow-2xl item-center bg-gradient-to-r from-purple-900 to-pink-500">
                      แผนการออมเงินทางเลือก
                    </p>
                  </div>

                  <div className="flex items-center justify-center h-24 px-5">
                    <Slider
                      title="my slidebar"
                      months={optionState.period.toString()}
                      onChange={(e) => {
                        updateOptionFields({ period: Number(e.target.value) });
                      }}
                    />
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-2"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 rounded-lg sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="pb-5 mb-4 font-bold text-white">
                            ค่าใช้จ่าย/เดือน
                          </div>
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออมเดือน
                          </div>
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออมทั้งหมดปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={optionState.expense}
                              onChange={handleOptionMonthlyExpenseChange}
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                            {/* Display error when user input invalid */}
                            {optionMonthlyExpenseError && (
                              <p className="text-xs italic text-red-500">{optionMonthlyExpenseError}</p>
                            )}
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="1,000"
                              value={optionState.monthlySaving}
                              onChange={handleOptionMonthlySavingChange}
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                            {/* Display error when user input invalid */}
                            {optionMonthlySavingError && (
                              <p className="text-xs italic text-red-500">{optionMonthlySavingError}</p>
                            )}
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="0"
                              value={optionState.totalBalance}
                              onChange={handleOptionTotalBalanceChange}
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                            {/* Display error when user input invalid */}
                            {optionTotalBalanceError && (
                              <p className="text-xs italic text-red-500">{optionTotalBalanceError}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      style={{ width: "100%", backgroundColor: "#3A3B5A" }}
                      className="mb-4 rounded-lg sm:ml-2 md:ml-0 md:mb-0"
                    >
                      <div className="flex items-center justify-center">
                        <label htmlFor="#" className="block ">
                          <span className="flex items-center justify-center block py-5 m-1 font-bold text-white">
                            ระยะเวลาออม
                          </span>
                          <input
                            type="string"
                            id="#"
                            value={optionTimeToAchive}
                            readOnly
                            placeholder="8 ปี 9 เดือน"
                            style={{
                              width: "100%",
                              backgroundColor: "#27264E",
                            }}
                            className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          />
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
