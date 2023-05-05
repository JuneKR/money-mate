import React, { useState } from "react";
import Image from "next/image";
import Tips1 from "@/images/Tips/emergencyKnowledge.png";
import { FormHelperText } from "@mui/material";
type GoalData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
};

type GoalFormProps = GoalData & {
  updateFields: (fields: Partial<GoalData>) => void;
};

export function GoalForm({
  expense,
  period,
  monthlySaving,
  totalBalance,
  updateFields,
}: GoalFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [monthlyExpenseError, setMonthlyExpenseError] = useState("");
  const [monthlySavingError, setMonthlySavingError] = useState("");
  const [totalBalanceError, settotalBalanceError] = useState("");

  /* handle state to display error message */
  const handleMonthlyExpenseChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateFields({ expense: Number(value) })
      setMonthlyExpenseError("");
    } else {
      setMonthlyExpenseError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 20000 บาท");
    }
  };

  const handleMonthlySavingChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateFields({ monthlySaving: Number(value) })
      setMonthlySavingError("");
    } else {
      setMonthlySavingError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 2000 บาท");
    }
  };

  const handleTotalBalanceChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      updateFields({ totalBalance: Number(value) })
      settotalBalanceError("");
    } else {
      settotalBalanceError("กรุณากรอกข้อมูลเฉพาะตัวเลข เช่น 2000 บาท");
    }
  };
  

  return (
    //   <div className="py-20">
    <div className="grid grid-cols-2">
      <div style={{ padding: "0 4rem" }} className="px-4 py-5 rounded lg:px-10">
        <label htmlFor="monthlyExpense" className="block w-full h-auto text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              ค่าใช้จ่ายรายเดือนของคุณ
            </span>
          </div>
          <input
            type="text"
            id="mExpense"
            value={expense}
            onChange={handleMonthlyExpenseChange}
            placeholder="15,000"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: ค่าใช้จ่ายทั้งเดือนโดยรวมทั้งหมดของคุณ
            อาธิเช่นค่านำ้ค่าไฟค่าอาหาร เป็นต้น
          </FormHelperText>
          {/* Display error when user input invalid */}
          {monthlyExpenseError && (
            <p className="text-xs italic text-red-500">{monthlyExpenseError}</p>
          )}
        </label>

        <label htmlFor="monthlyDeposit" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              จำนวนเงินที่จะออมต่อเดือน
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={monthlySaving}
            onChange={handleMonthlySavingChange}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: คุณอยากออมเงินเดือนละเท่าไหร่
          </FormHelperText>
          {/* Display error when user input invalid */}
          {monthlySavingError && (
            <p className="text-xs italic text-red-500">{monthlySavingError}</p>
          )}
        </label>

        <label htmlFor="months" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              จำนวนเดือน
            </span>
          </div>
          <select
            id="months"
            value={period}
            onChange={(e) => updateFields({ period: Number(e.target.value) })}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-sm shadow-2xl cursor-pointer hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          >
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} เดือน
              </option>
            ))}
          </select>

          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: จำนวนเดือนของเงินฉุกเฉินที่ต้องการมี
            ซึ่งตลาดหลักทรัพย์แนะนำให้ 6 - 12 เดือน
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="currentBalance" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              เงินออมทั้งหมดในปัจจุบัน (ถ้ามี)
            </span>
          </div>
          <input
            type="text"
            id="cBalance"
            placeholder="0"
            value={totalBalance}
            onChange={handleTotalBalanceChange}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: เงินทั้งหมดในตอนนี้ที่คุณตั้งใจจะออม
            หรืออาจจะมีอยู่ก่อนแล้ว
          </FormHelperText>
          {/* Display error when user input invalid */}
          {totalBalanceError && (
            <p className="text-xs italic text-red-500">{totalBalanceError}</p>
          )}
        </label>
      </div>
      <div className="px-4 py-5 lg:px-10">
        <div
          style={{ backgroundColor: "#27264E" }}
          className="p-5 rounded-lg shadow-2xl hover:shadow-pink-500/50"
        >
          <Image
            src={Tips1}
            alt="Your Image"
            onClick={() => setShowModal(true)}
            className="w-full h-auto transition duration-300 ease-in-out transform cursor-pointer hover:scale-105 "
          />
        </div>
        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-75"
            onClick={() => setShowModal(false)}
          >
            <div className="w-11/12 max-w-3xl overflow-hidden bg-white rounded-lg max-h-3/4">
              <Image
                src={Tips1}
                alt="Your Image"
                className="w-full h-auto cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
    //   </div>
  );
}
