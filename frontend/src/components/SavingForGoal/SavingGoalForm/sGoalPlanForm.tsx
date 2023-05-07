import { useState, useEffect } from "react";

type sGoalPlanData = {
  planName: string;
  targetAmount: number;
  period: number;
  timeRemaining: number;
  monthlySaving: number;
  totalBalance: number;
};

const initialCurrentData: sGoalPlanData = {
  planName: "",
  targetAmount: 0,
  period: 0,
  timeRemaining: 0,
  monthlySaving: 0,
  totalBalance: 0,
};

type sGoalPlanFormProps = sGoalPlanData & {
  updateFields: (fields: Partial<sGoalPlanData>) => void;
};

type OptionData = {
  planName: string;
  targetAmount: number;
  period: number;
  timeRemaining: number;
  monthlySaving: number;
  totalBalance: number;
};

const initialOptionData: OptionData = {
  planName: "",
  targetAmount: 0,
  period: 0,
  timeRemaining: 0,
  monthlySaving: 0,
  totalBalance: 0,
};

export function PlanForm({
  planName,
  targetAmount,
  period,
  timeRemaining,
  monthlySaving,
  totalBalance,
  updateFields,
}: sGoalPlanFormProps) {
  const [isHidden, setIsHidden] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [optionTimePeriodError, setOptionTimePeriodError] = useState("");
  const [optionTotalBalanceError, setOptionTotalBalanceError] = useState("");
  const [currentState, setCurrentState] = useState(initialCurrentData);
  const currentForm = {
    planName,
    targetAmount,
    period,
    timeRemaining,
    monthlySaving,
    totalBalance,
  };
  const [optionState, setOptionState] = useState(initialOptionData);
  const optionForm = {
    planName,
    targetAmount,
    period,
    timeRemaining,
    monthlySaving,
    totalBalance,
  };

  /* handle state to display error message */
  const handleOptionTimePeriodChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateOptionFields({ period: Number(value) })
      setOptionTimePeriodError("");
    } else {
      setOptionTimePeriodError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 12 เดือน");
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
    if (numY === 0) {
      return "Cannot divide by zero";
    }
    const result = numX / numY / 12;
    return result.toString();
  }

  //   Parent State
  const targetGoalFund = targetAmount - totalBalance;
  // Finding the monthly saving for user
  const targetMonthlySaving = Math.floor((targetGoalFund/period));
  const years = divided(targetGoalFund.toString(), targetMonthlySaving.toString());
  console.log('Monthly Saving',targetMonthlySaving);
  console.log('Target Goal Fund',targetGoalFund);
  console.log('Year',years);

  const currentTargetGoalFund = currentState.targetAmount - currentState.totalBalance;
  const currentTargetMonthlySaving = Math.floor((currentTargetGoalFund/currentState.period));
  const currentYears = divided(
    currentTargetGoalFund.toString(),
    currentTargetMonthlySaving.toString()
  );

  const optionTargetGoalFund = optionState.targetAmount - optionState.totalBalance;
  const optionTargetMonthlySaving = optionState.period !== 0 ? 
  Math.floor((optionTargetGoalFund/optionState.period)) : 
  0;

  const optionYears = divided(
    optionTargetGoalFund.toString(),
    optionTargetMonthlySaving.toString()
  );

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

  // Set time to achieve
  const timeToAchive = yearsToYearsMonthsDays(years);
  const currentTimeToAchive = yearsToYearsMonthsDays(currentYears);
  const optionTimeToAchive = yearsToYearsMonthsDays(optionYears);
  // console.log('Option Time 2 Achieve', optionTimeToAchive);

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
      updateCurrentFields({ timeRemaining: Number(currentYears) });
      updateCurrentFields({ monthlySaving: Number(currentTargetMonthlySaving) });
      // updateCurrentFields({ targetAmount: Number(currentState.targetAmount) });

      updateFields({
        planName: currentState.planName,
        period: currentState.period,
        monthlySaving: currentState.monthlySaving,
        totalBalance: currentState.totalBalance,
        targetAmount: currentState.targetAmount,
        timeRemaining: currentState.timeRemaining,
      });
    } else if (selectedOption === "option2") {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ monthlySaving: Number(optionTargetMonthlySaving)});
      // updateOptionFields({ targetAmount: Number(optionState.targetAmount) });

      updateFields({
        planName: optionState.planName,
        period: optionState.period,
        monthlySaving: optionState.monthlySaving,
        totalBalance: optionState.totalBalance,
        targetAmount: optionState.targetAmount,
        timeRemaining: optionState.timeRemaining,
      });
    } else {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ monthlySaving: Number(optionTargetMonthlySaving)});

      // Update the Current Plan State
      updateCurrentFields({ timeRemaining: Number(currentYears) });
      updateCurrentFields({ monthlySaving: Number(currentTargetMonthlySaving) });
    }

    // Check the Checkbox is hidden or not to set parent state
    if (isHidden) {
      // Update the Parent Plan State
      updateFields({ timeRemaining: Number(years) });
      updateFields({ monthlySaving: Number(targetMonthlySaving) });
    }
  }, [
    isHidden,
    selectedOption,
    currentYears,
    currentTargetMonthlySaving,
    currentState.monthlySaving,
    optionYears,
    optionTargetMonthlySaving,
    optionState.monthlySaving,
    currentState.period, 
    currentState.planName, 
    currentState.targetAmount, 
    currentState.timeRemaining, 
    currentState.totalBalance, 
    optionState.period, 
    optionState.planName, 
    optionState.targetAmount, 
    optionState.timeRemaining, 
    optionState.totalBalance, 
    targetMonthlySaving, 
    updateFields,
    years
  ]);

  const sGoalFund2 = Number(targetAmount);
  const monthlySaving2 = Number(monthlySaving);
  const formattedSGoalFund = sGoalFund2.toLocaleString();
  const formattedMonthlySaving = monthlySaving2.toLocaleString();

  return (
    <>
      <div style={{ padding: "0 4rem" }}>
        <div
          style={{ height: "50%", backgroundColor: "#27264E" }}
          className="flex items-center justify-center w-full h-24 rounded shadow-2xl bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 font-bold text-white md:grid-cols-2">
            <div className="p-4 text-lg">เป้าหมาย</div>
            <div className="p-4 text-lg">ออมเงินเพื่อ{planName}</div>
            <div className="p-4">จำนวนเงินเป้าหมาย: </div>
            <div className="p-4">{formattedSGoalFund} บาท</div>
            {/* <div className="p-4">จำนวนเงินที่จะออมต่อเดือน</div> */}
            <div className="p-4">จำนวนเงินที่ต้องออมต่อเดือน</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
            {/* <div className="p-4"> ใส่จำนวนเดือนที่ต้องการ</div> */}
            <div className="p-4">ระยะเวลาในการออม</div>
            <div className="p-4">{period} เดือน (~{timeToAchive})</div>
            {/* <div className="p-4">ระยะเวลาคงเหลือ</div>
            <div className="p-4">{timeToAchive}</div> */}
            <div className="p-4">จำนวนเงินในปัจจุบัน</div>
            <div className="p-4">{totalBalance}</div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            className="flex items-center justify-between px-4 transition duration-300 ease-in-out delay-150 transform border-2 border-black rounded-t-lg cursor-pointer hover:scale-105 bg-gradient-to-r from-purple-900 to-red-500"
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
                      className="w-10 h-6 mt-2 text-indigo-600 transition duration-150 ease-in-out cursor-pointer form-radio animate-bounce"
                    />
                  </div>

                  <div className="px-20 pb-5">
                    <p className="flex justify-center pb-3 text-2xl font-bold text-white bg-indigo-500 rounded-full shadow-2xl item-center">
                      แผนการออมปัจจุบันของคุณ
                    </p>
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 gap-5 p-5 text-black sm:grid-cols-2 md:grid-cols-2"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="pb-5 mb-4 font-bold text-white">
                            ระยะเวลาในการออม (เดือน) 
                          </div>
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออมทั้งหมดในปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={currentState.period}
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
                              placeholder="0"
                              value={currentState.totalBalance}
                              readOnly
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
                            {/* ระยะเวลาออม */}
                            จำนวนเงินออม/เดือน
                          </span>
                          <input
                            type="string"
                            id="#"
                            value={currentTargetMonthlySaving.toLocaleString()}
                            readOnly
                            placeholder="10,000 บาท"
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
                      className="w-10 h-6 mt-2 text-indigo-600 transition duration-150 ease-in-out cursor-pointer form-radio animate-bounce"
                    />
                  </div>

                  <div className="px-20">
                    <p className="flex justify-center pb-3 text-2xl font-bold text-white rounded-full shadow-2xl item-center bg-gradient-to-r from-purple-900 to-red-500 ">
                      แผนการออมเงินทางเลือก
                    </p>
                  </div>

                  <div
                    style={{ width: "100%", height: "100%" }}
                    className="grid grid-cols-1 gap-5 p-5 text-black sm:grid-cols-2 md:grid-cols-2"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 rounded-lg sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="pb-5 mb-4 font-bold text-white">
                            ระยะเวลาในการออม (เดือน)
                          </div>
                          
                          <div className="pb-5 mb-4 font-bold text-white">
                            เงินออมทั้งหมดปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="12 เดือน"
                              value={optionState.period}
                              onChange={handleOptionTimePeriodChange}
                              type="text"
                              style={{
                                width: "100%",
                                backgroundColor: "#27264E",
                              }}
                              className="block w-full px-3 py-2 text-sm text-white rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                            />
                            {/* Display error when user input invalid */}
                            {optionTimePeriodError && (
                              <p className="text-xs italic text-red-500">{optionTimePeriodError}</p>
                            )}
                          </div>
                          <div className="pb-5">
                            <input
                              placeholder="1000 บาท"
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
                            {/* ระยะเวลาออม */}
                            จำนวนเงินออม/เดือน
                          </span>
                          <input
                            type="string"
                            id="#"
                            // value={optionTimeToAchive}
                            value={optionTargetMonthlySaving.toLocaleString()}
                            readOnly
                            // placeholder="8 ปี 9 เดือน"
                            placeholder="10,000 บาท"
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
