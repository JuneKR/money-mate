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
  return (
    //   <div className="py-20">
    <div className="grid grid-cols-2">
      <div style={{ padding: "0 4rem" }} className="rounded py-5 px-4 lg:px-10">
        <label htmlFor="monthlyExpense" className="block text-sm w-full h-auto">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              ค่าใช้จ่ายรายเดือนของคุณ
            </span>
          </div>
          <input
            type="text"
            id="mExpense"
            value={expense}
            onChange={(e) => updateFields({ expense: Number(e.target.value) })}
            placeholder="15,000"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          
          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
          >
            หมายถึง: ค่าใช้จ่ายทั้งเดือนโดยรวมทั้งหมดของคุณ
            อาธิเช่นค่านำ้ค่าไฟค่าอาหาร เป็นต้น
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="monthlyDeposit" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              จำนวนเงินที่จะออมต่อเดือน
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={monthlySaving}
            onChange={(e) =>
              updateFields({ monthlySaving: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
          >
            หมายถึง: คุณอยากออมเงินเดือนละเท่าไหร่
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="months" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
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
            className="cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          >
            {[...Array(12)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} เดือน
              </option>
            ))}
          </select>

          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
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
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              เงินออมทั้งหมดในปัจจุบัน (ถ้ามี)
            </span>
          </div>
          <input
            type="text"
            id="cBalance"
            placeholder="0"
            value={totalBalance}
            onChange={(e) =>
              updateFields({ totalBalance: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
          >
            หมายถึง: เงินทั้งหมดในตอนนี้ที่คุณตั้งใจจะออม
            หรืออาจจะมีอยู่ก่อนแล้ว
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>
      </div>
      <div className="py-5 px-4 lg:px-10">
        <div
          style={{ backgroundColor: "#27264E" }}
          className="rounded-lg shadow-2xl p-5 hover:shadow-pink-500/50"
        >
          <Image
            src={Tips1}
            alt="Your Image"
            onClick={() => setShowModal(true)}
            className="w-full h-auto cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out "
          />
        </div>
        {showModal && (
          <div
            className="fixed z-50 inset-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-75"
            onClick={() => setShowModal(false)}
          >
            <div className="w-11/12 max-w-3xl max-h-3/4 overflow-hidden bg-white rounded-lg">
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
