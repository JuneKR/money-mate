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
  const currentTargetEmergencyFund =
    Number(currentEmergencyFund) - currentState.totalBalance;
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

  //   console.log("Parent State", { timeRemaining, targetAmount });
  //   console.log("Current Plan", currentState);
  //   console.log("Option Plan", optionState);

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
      updateCurrentFields({ timeRemaining: Number(currentYears) });
      updateCurrentFields({ targetAmount: Number(currentEmergencyFund) });

      updateFields({
        expense: currentState.expense,
        period: currentState.period,
        monthlySaving: currentState.monthlySaving,
        totalBalance: currentState.totalBalance,
        targetAmount: currentState.targetAmount,
        timeRemaining: currentState.timeRemaining,
      });
    } else if (selectedOption === "option2") {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ targetAmount: Number(optionEmergencyFund) });

      updateFields({
        expense: optionState.expense,
        period: optionState.period,
        monthlySaving: optionState.monthlySaving,
        totalBalance: optionState.totalBalance,
        targetAmount: optionState.targetAmount,
        timeRemaining: optionState.timeRemaining,
      });
    } else {
      // Update the Option Plan State
      updateOptionFields({ timeRemaining: Number(optionYears) });
      updateOptionFields({ targetAmount: Number(optionEmergencyFund) });

      // Update the Current Plan State
      updateCurrentFields({ timeRemaining: Number(currentYears) });
      updateCurrentFields({ targetAmount: Number(currentEmergencyFund) });
    }

    // Check the Checkbox is hidden or not to set parent state
    if (isHidden) {
      // Update the Parent Plan State
      updateFields({ timeRemaining: Number(years) });
      updateFields({ targetAmount: Number(emergencyFund) });
    }
  }, [
    isHidden,
    selectedOption,
    currentYears,
    currentEmergencyFund,
    optionYears,
    optionEmergencyFund,
    selectedOption,
  ]);
  const emergencyFund2 = Number(emergencyFund);
  const monthlySaving2 = Number(monthlySaving);
  const formattedEmergencyFund = emergencyFund2.toLocaleString();
  const formattedMonthlySaving = monthlySaving2.toLocaleString();
  // console.log(formattedEmergencyFund)
  // console.log(formattedMonthlySaving)
  return (
    <>
      <div style={{ padding: "0 4rem" }}>
        <div
          style={{ height: "50%", backgroundColor: "#27264E" }}
          className="shadow-2xl w-full flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 text-white font-bold">
            <div className="text-lg p-4">เป้าหมาย</div>
            <div className="text-lg p-4">ออมเงินเผื่อฉุกเฉิน</div>
            <div className="p-4">คุณต้องมีเงินฉุกเฉิน: </div>
            <div className="p-4">{formattedEmergencyFund} บาท</div>
            <div className="p-4">ระยะเวลาในการออม</div>
            <div className="p-4">{timeToAchive}</div>
            <div className="p-4"> จำนวนเดือนที่ต้องการเก็บ</div>
            <div className="p-4">{period} เดือน</div>
            <div className="p-4">เงินเก็บต่อเดือน</div>
            <div className="p-4">{formattedMonthlySaving} บาท</div>
          </div>
        </div>
        <div className="relative py-8 ">
          <div
            style={{ backgroundColor: "#6259E8" }}
            className="px-4 rounded-t-lg cursor-pointer flex justify-between items-center border-2 border-black"
            onClick={handleClick}
          >
            <span
              style={{ backgroundColor: "#6259E8" }}
              className="text-white text-lg rounded bg-gray-50 dark:bg-gray-800 py-2 font-bold"
            >
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
                  className="shadow-2xl block w-full px-3  py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option1"
                      checked={selectedOption === "option1"}
                      onChange={handleOptionChange}
                      className="form-radio h-6 w-10 text-indigo-600 transition duration-150 ease-in-out"
                    />
                  </div>

                  {/* <div style={{ width: "10%", backgroundColor: '#FEF5AC'}} className="rounded border border-gray-500 flex item-center justify-center py-2"> */}
                  <p className="text-white font-bold text-2xl pb-3">
                    แผนปัจจุบันของคุณ
                  </p>
                  {/* </div> */}

                  <div className="flex items-center justify-center h-24 px-5">
                    <Slider1
                      title="my slidebar1"
                      months={currentState.period.toString()}
                      disabled={true}
                    />
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
                            รายจ่าย/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินเก็บ/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินปัจจุบัน
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
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
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
                              className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
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
                            className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: 25 }}
                  className="shadow-2xl block w-full px-3  py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm"
                >
                  <div className="flex justify-end">
                    <input
                      type="radio"
                      name="option"
                      value="option2"
                      checked={selectedOption === "option2"}
                      onChange={handleOptionChange}
                      className="form-radio h-6 w-10 text-indigo-600 transition duration-150 ease-in-out"
                    />
                  </div>

                  <p className="text-white font-bold text-2xl pb-3">
                    แผนทางเลือก
                  </p>

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
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-5 text-black p-5"
                  >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                      className="p-5 mb-4 sm:mr-2 md:mr-0 md:mb-0 md:col-span-1 shoadow-2xl rounded-lg"
                    >
                      <div className="grid grid-cols-2 gap-4 pt-5">
                        <div className="flex flex-col justify-center">
                          <div className="mb-4 pb-5 text-white font-bold">
                            รายจ่าย/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินเก็บ/เดือน
                          </div>
                          <div className="mb-4 pb-5 text-white font-bold">
                            เงินปัจจุบัน
                          </div>
                        </div>
                        <div>
                          <div className="pb-5">
                            <input
                              placeholder="15,000"
                              value={optionState.expense}
                              onChange={(e) =>
                                updateOptionFields({
                                  expense: Number(e.target.value),
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
                            className="text-white block w-full px-3 py-2 text-sm  rounded-lg shadow-2xl placeholder:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
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
