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
  progression: string;
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
  return (
    //   <div className="py-20">
    <div className="grid grid-cols-2">
      <div
        style={{ width: "100%", height: "100%", padding: "0 4rem" }}
        className="rounded"
      >
        <label htmlFor="monthlyExpense" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              วัน/เดือน/ปีเกิด
            </span>
          </div>
          <input
            type="date"
            id="mExpense"
            value={dateOfBirth}
            onChange={(e) => updateFields({ dateOfBirth: e.target.value })}
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className=" transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>
        <label htmlFor="monthlyDeposit" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              ค่าใช้จ่ายคงที่ต่อเดือน
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={monthlyExpense}
            onChange={(e) =>
              updateFields({ monthlyExpense: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className=" transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
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
              อายุที่ตั้งใจจะเกษียณ
            </span>
          </div>
          <input
            type="text"
            id="mDeposit"
            placeholder="1,000"
            value={ageToRetire}
            onChange={(e) =>
              updateFields({ ageToRetire: Number(e.target.value) })
            }
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className=" transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
          >
            หมายถึง: อายุที่คุณตั้งใจว่าจะเกษียณตัวเองหรือไม่ทำงานแล้ว โดยปกติบริษัทจะมีนโยบายของตัวเองโดนทั่วไปแล้วอายุที่เกษียนณจะอยู่ราวๆ 60-65 ปี
          </FormHelperText>
          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
            ข้อมูลไม่ถูกต้อง
          </p>
        </label>

        <label htmlFor="months" className="block text-sm">
          <div>
            <span className="inline-block m-1 text-white font-bold text-xl pb-2">
              อายุที่คาดว่าจะมีอายุอยู่หลังเกษียณ
            </span>
          </div>
          <input
            type="text"
            id="months"
            value={ageToLive}
            onChange={(e) =>
              updateFields({ ageToLive: Number(e.target.value) })
            }
            placeholder="6"
            style={{
              width: "100%",
              height: "50px",
              backgroundColor: "#27264E",
            }}
            className=" transform hover:scale-105 transition duration-300 ease-in-out text-white block w-full px-3 py-2 text-sm placeholder-gray-500 rounded-2xl shadow-2xl shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
          />
          <FormHelperText
            id="my-helper-text"
            className="text-gray-500 hover:text-gray-50 ml-5 text-xs pt-2"
          >
            หมายถึง: อายุที่คุณคาดว่าหลังจากเกษียณแล้วจะมีอายุอีกกี่ปี
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
            หมายถึง: เงินทั้งหมดในตอนนี้ที่คุณตั้งใจจะออมในแผนการออมนี้
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
          className="rounded-lg shadow-2xl p-5 hover:shadow-green-500/50"
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
  );
}
