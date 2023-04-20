import React, { useState } from "react";
import Image from "next/image";
import Tips1 from "@/images/Tips/retirementKnowledge.png";
import { FormHelperText } from "@mui/material";

type sRetirementData = {
  planName: string;
  targetAmount: number;
  period: number;
  monthlySaving: number;
  initial_saving: number;
  startDate: string;
  lastUpdate: string;
  totalBalance: number;
  timeRemaining: number;
  dateOfBirth: string;
  interestRate: number;
  monthlyExpense: number;
  ageToRetire: number;
  ageToLive: number;
  inflationRate: number;
  additionalInvestment: number;
  progression: Number;
  riskLevel: number;
};

type sRetirementFormProps = sRetirementData & {
  updateFields: (fields: Partial<sRetirementData>) => void;
};

export function RetirementForm({
  dateOfBirth,
  monthlyExpense,
  ageToRetire,
  ageToLive,
  period,
  monthlySaving,
  totalBalance,
  updateFields,
}: sRetirementFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [expenseWarning, setExpenseWarning] = useState("");
  const [ageToRetireWarning, setAgeToRetireWarning] = useState("");
  const [ageToLiveWarning, setAgeToLiveWarning] = useState("");
  const [totalBalanceWarning, setTotalBalanceWarning] = useState("");
  return (
    //   <div className="py-20">
    <div className="grid grid-cols-2">
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded"
      >
        <label htmlFor="monthlyExpense" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              วัน/เดือน/ปีเกิด
            </span>
          </div>
          <input
            type="date"
            id="mExpense"
            min="01-01-1900"
            max={new Date().toISOString().split("T")[0]}
            pattern="\d{2}-\d{2}-\d{4}"
            value={dateOfBirth}
            onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            กรุณาเช็ค วัน/เดือน/ปีเกิด ของคุณ
          </p>
        </label>
        <label htmlFor="monthlyDeposit" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              ค่าใช้จ่ายคงที่ต่อเดือน
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={monthlyExpense}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                e.target.classList.add("border-red-500");
                setExpenseWarning("ค่าใช้จ่ายต้องใส่เป็นตัวเลขเท่านั้น");
              } else {
                setExpenseWarning("");
                updateFields({ monthlyExpense: Number(e.target.value) });
              }
            }}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          {expenseWarning && (
            <p className="m-1 text-xs text-red-500">{expenseWarning}</p>
          )}
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
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
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              อายุที่ตั้งใจจะเกษียณ
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={ageToRetire}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                e.target.classList.add("border-red-500");
                setAgeToRetireWarning("อายุต้องเป็นตัวเลขเท่านั้น");
              } else {
                setAgeToRetireWarning("");
                updateFields({ ageToRetire: Number(e.target.value) });
              }
            }}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          {ageToRetireWarning && (
            <p className="m-1 text-xs text-red-500">{ageToRetireWarning}</p>
          )}
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: อายุที่คุณตั้งใจว่าจะเกษียณตัวเองหรือไม่ทำงานแล้ว
            โดยปกติบริษัทจะมีนโยบายของตัวเองโดนทั่วไปแล้วอายุที่เกษียนณจะอยู่ราวๆ
            60-65 ปี
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="months" className="block text-sm">
          <div>
            <span className="inline-block pb-2 m-1 text-xl font-bold text-white">
              อายุที่คาดว่าจะมีอายุอยู่หลังเกษียณ
            </span>
          </div>
          <input
            type="text"
            id="months"
            value={ageToLive}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                e.target.classList.add("border-red-500");
                setAgeToLiveWarning("อายุต้องเป็นตัวเลขเท่านั้น");
              } else {
                setAgeToLiveWarning("");
                updateFields({ ageToLive: Number(e.target.value) });
              }
            }}
            placeholder="6"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-sm shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          {ageToLiveWarning && (
            <p className="m-1 text-xs text-red-500">{ageToLiveWarning}</p>
          )}
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: อายุที่คุณคาดว่าหลังจากเกษียณแล้วจะมีอายุอีกกี่ปี
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
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                e.target.classList.add("border-red-500");
                setTotalBalanceWarning("จำนวนเงินต้องเป็นตัวเลขเท่านั้น");
              } else {
                setTotalBalanceWarning("");
                updateFields({ totalBalance: Number(e.target.value) });
              }
            }}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className="block w-full px-3 py-2 text-sm text-white placeholder-gray-500 transition duration-300 ease-in-out transform shadow-2xl hover:scale-105 rounded-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          {totalBalanceWarning && (
            <p className="m-1 text-xs text-red-500">{totalBalanceWarning}</p>
          )}
          <FormHelperText
            id="my-helper-text"
            className="pt-2 ml-5 text-xs text-gray-500 hover:text-gray-50"
          >
            หมายถึง: เงินทั้งหมดในตอนนี้ที่คุณตั้งใจจะออมในแผนการออมนี้
            หรืออาจจะมีอยู่ก่อนแล้ว
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>
      </div>

      <div className="px-4 py-5 lg:px-10">
        <div
          style={{ backgroundColor: "#27264E" }}
          className="p-5 rounded-lg shadow-2xl hover:shadow-green-500/50"
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
  );
}
