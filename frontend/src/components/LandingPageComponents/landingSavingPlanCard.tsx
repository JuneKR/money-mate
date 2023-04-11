import React, { useRef, useEffect } from "react";
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";



interface SavingPlan {
  PlanName: string;
  TargetAmount: number;
  TimePeriod: string;
  TotalBalance: number;
  Progression: number;
  User_ID: number;
}

interface LandingSavingPlanCardProps {
  // key: any;
  saving: SavingPlan;
}

const LandingSavingPlanCard: React.FC<LandingSavingPlanCardProps> = (props) => {
  const { saving } = props;

  return (
    <div className="pb-5 px-5">
      <div
        // key={index}
        style={{ alignItems: "center", backgroundColor: "#27264E" }}
        className="pb-5 relative text-white  shadow-2xl"
      >
        <div
          style={{ alignItems: "center" }}
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white gap-5 py-10 px-3"
        >
          <div className="py-3 px-3 ">
            <div>
              <p className="text-gray-200 pb-2 text-sm">
                {/* เงินออมเป้ามายที่ {index + 1} */}
                ชื่อเป้าหมายเงินออม
              </p>
            </div>
            <div
              style={{ backgroundColor: "#6259E8" }}
              className="px-3 py-3 rounded-lg"
            >
              <p className="font-bold flex justify-center item-center text-xl">
                {/* ออมเงินเผื่อฉุกเฉิน */}
                {saving.PlanName}
              </p>
            </div>
          </div>
          <div className="font-bold py-3">
            <div>
              <Image src={icon1} alt="Your Image" className="pb-3" />
              <Progress title={""} progress={`${saving.Progression}%`} />
              {/* <Progress title={""} progress={"90%"} /> */}
            </div>
          </div>
          <div className="font-bold py-3 flex justify-center item-center grid grid-rows-2">
            <p>จำนวนเงินออมเป้าหมาย</p>
            <p>ยอดเงิน</p>
          </div>
          <div className="font-bold py-3 grid grid-rows-2 text-xl">
            <p className="font-bold flex justify-center item-center">
              {/* 100,000 บาท */}
              {saving.TargetAmount}
            </p>
            <p className="font-bold flex justify-center item-center">
              {/* 20,000 บาท */}
              {saving.TotalBalance}
            </p>
          </div>
          <a
            // onClick={}
            className="absolute top-3 right-3 flex justify-center item-center cursor-pointer text-white hover:text-blue-800"
          >
            ดูข้อมูลเพิ่มเติม &gt;
          </a>
        </div>
      </div>
    </div>
  );
};

export default LandingSavingPlanCard;
