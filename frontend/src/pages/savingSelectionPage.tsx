import React from "react";
import styles from "@/styles/Home.module.css";
import Sidebar from "@/components/Sidebar";
import Body from "@/components/savingSelectionPageButtons";

const SavingSelectionPage = () => {
  return (
    <>
      <Sidebar title="My Sidebar" />
      <main className={styles.main}>
        <div className="w-full xl:w-8/12">
          {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#B2E8FF",
            }}
            className=" py-2 rounded bg-gray-50 dark:bg-gray-800"
          >
            <p
              style={{ padding: "0 1rem" }}
              className="font-bold text-black dark:text-gray-500 "
            >
              การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
            </p>
          </div> */}
          <div
            style={{
            //   backgroundColor: "#1D1D41",
            }}
          >
            <Body title="" />
          </div>
        </div>
      </main>
    </>
  );
};
export default SavingSelectionPage;
