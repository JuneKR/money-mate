import React, { useRef, useEffect } from 'react';
import Progress from "@/components/LandingPageComponents/landingPageProgress";
import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";

interface SavingPlan {
    PlanName: string,
    TargetAmount: number,
    TimePeriod: string,
    TotalBalance: number,
    Progression: number,
    User_ID: number
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
            style={{ alignItems: "center" }}
            className="pb-5 relative text-black border border-gray-200 "
          >
            <div
              style={{ alignItems: "center" }}
              className="relative grid grid-cols-4 text-black border border-black  "
            >
              <div className="font-bold py-3 ">
                <div className="px-3 ">
                  <p
                    style={{ color: "#085385" }}
                    className="flex justify-center item-center"
                  >
                    {/* เงินออมเป้ามายที่ {index + 1} */}
                    ชื่อเป้าหมายเงินออม
                  </p>
                  <p className="font-bold flex justify-center item-center">
                    {/* ออมเงินเผื่อฉุกเฉิน */}
                    { saving.PlanName }
                  </p>
                </div>
              </div>
              <div className="font-bold py-3">
                <div>
                  <Image
                    src={icon1}
                    alt="Your Image"
                    className="pb-3"
                  />
                  <Progress title={""} progress={"90%"} />
                </div>
              </div>
              <div className="font-bold py-3 flex justify-center item-center grid grid-rows-3">
                <div></div>
                <p style={{ color: "#085385" }}>จำนวนเงินออมเป้าหมาย</p>
                <p style={{ color: "#085385" }}>ยอดเงิน</p>
              </div>
              <div className="font-bold py-3 grid grid-rows-3 ">
                <p className="font-bold ">
                    {/* 100,000 บาท */}
                    { saving.TargetAmount }
                </p>
                <p className="font-bold ">
                    {/* 20,000 บาท */}
                    { saving.TotalBalance }
                </p>
              </div>
              <a
                // onClick={}
                className="absolute top-3 right-3 flex justify-center item-center cursor-pointer text-black hover:text-blue-800"
              >
                ดูข้อมูลเพิ่มเติม &gt;
              </a>
            </div>
          </div>
      </div>
    );
}

export default LandingSavingPlanCard;