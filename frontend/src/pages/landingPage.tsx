import React, { useState } from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/router";
import Progress from "@/components/LandingPageComponents/landingPageProgress";

import Image from "next/image";
import icon1 from "@/images/Icon/กระปุก2.png";
import icon2 from "@/images/Icon/กระปุก3.png";
import icon3 from "@/images/Icon/กระปุก5.png";



interface LandingPageProps {
  index: number;
}
interface RowData {
  data: {
    goalID: string;
    goalName: string;
    goalFunds: string;
    cBalance: string;
    goalProgression: string;
  };
}
const LandingPage: React.FC<LandingPageProps> = ({}) => {
  const [displayData, setdisplayData] = useState<RowData[]>([]);

  function handleNewData(data: RowData) {
    setdisplayData([...displayData, data]);
  }
  function handleDeleteRow(index: LandingPageProps) {
    const newRows = [...displayData];
    // newRows.splice(index, 1);
    setdisplayData(newRows);
  }

  const router = useRouter();
  const handleSavingSelectionPage = () => {
    router.push("/savingSelectionPage");
  };
  const handleLandingPageDetails = () => {
    router.push("/landingPageDetails");
  };

  return (
    <>
      <main className={styles.main}>
        <div style={{ padding: "0 4rem", }} className="w-full xl:w-8/12">
          <Sidebar title="My Sidebar" />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#B2E8FF",
            }}
            className=" py-2 rounded bg-gray-50 dark:bg-gray-800 shadow-2xl "
          >
            <p
              style={{ padding: "0 1rem" }}
              className="font-bold text-black dark:text-gray-500 "
            >
              ภาพรวม
            </p>
          </div>
          <div className="py-5 ">
            <div className="text-black shadow-2xl grid grid-cols-2 rounded-3xl w-full h-full h-24 rounded bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-center item-center py-20 grid grid-rows-2 ">
                <div>
                  <p className="font-bold">เราแนะนำให้คุณสร้างแผนการออมเงิน</p>
                </div>
                <div>
                  <p>สร้างแผนการออมเงินก่อน</p>
                </div>
              </div>
              <div className="flex justify-center item-center py-20">
                <button
                  onClick={handleSavingSelectionPage}
                  className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 text-white font-bold py-2 px-4 rounded"
                >
                  เริ่มสร้างแผนการออมเงินเลย!
                </button>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-full h-full py-2 h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-2xl">
              <div className="px-5 pb-5">
                <div className=" grid grid-cols-2">
                  <div
                    style={{ color: "#085385" }}
                    className="border-b-2 border-gray-500 font-bold py-3"
                  >
                    <p>ความก้าวหน้าการออมเงินของคุณ</p>
                  </div>
                  <div className="flex item-center justify-end border-b-2 border-gray-500 py-3">
                    <p className="text-black">จัดเรียง</p>
                  </div>
                </div>
              </div>
              <div className="pb-5 px-5">
                {displayData.map((row, index) => (
                  <div
                    key={index}
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
                            เงินออมเป้ามายที่ {index + 1}
                          </p>
                          <p className="font-bold flex justify-center item-center">
                            ออมเงินเผื่อฉุกเฉิน
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
                        <p className="font-bold ">100,000 บาท</p>
                        <p className="font-bold ">20,000 บาท</p>
                      </div>
                      <a
                        onClick={handleLandingPageDetails}
                        className="absolute top-3 right-3 flex justify-center item-center cursor-pointer text-black hover:text-blue-800"
                      >
                        ดูข้อมูลเพิ่มเติม &gt;
                      </a>
                    </div>
                  </div>
                ))}
                {/* <div className='text-black'>
                            <button onClick={() => handleNewData({ title: 'New Row', subtitle: 'Subtitle' })}>Add Row</button>
                        </div> */}
              </div>
            </div>
          </div>
          <div className="py-5">
            <div className="w-full h-full py-2 h-24 rounded bg-gray-50 dark:bg-gray-800 shadow-2xl">
              <div className="px-5 pb-5">
                <div className=" grid grid-cols-2">
                  <div
                    style={{ color: "#085385" }}
                    className="border-b-2 border-gray-500 font-bold py-3"
                  >
                    <p>ความก้าวหน้าการลงทุนของคุณ</p>
                  </div>
                  <div className="flex item-center justify-end border-b-2 border-gray-500 py-3">
                    <p className="text-black">จัดเรียง</p>
                  </div>
                </div>
              </div>
              <div className="pb-5 px-5">
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
                        เงินลงทุนเป้ามายที่1
                      </p>
                      <p className="font-bold flex justify-center item-center">
                        เงินลงทุนเพื่อเกษียณ
                      </p>
                    </div>
                  </div>
                  <div className="font-bold py-3">
                    <div>
                      <Image src={icon1} alt="Your Image" className="pb-3" />
                      <Progress title={""} progress={"20%"} />
                    </div>
                  </div>
                  <div className="font-bold py-3 flex justify-center item-center grid grid-rows-2">
                    <p style={{ color: "#085385" }}>จำนวนเงินออมเป้าหมาย</p>
                    <p style={{ color: "#085385" }}>ยอดเงิน</p>
                  </div>
                  <div className="font-bold py-3 grid grid-rows-2 ">
                    <p className="font-bold ">100,000 บาท</p>
                    <p className="font-bold ">20,000 บาท</p>
                  </div>
                  <a
                    onClick={handleLandingPageDetails}
                    className="absolute top-3 right-3 cursor-pointer text-black hover:text-blue-800"
                  >
                    ดูข้อมูลเพิ่มเติม &gt;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default LandingPage;
