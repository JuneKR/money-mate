import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import MultiStepProgressBar from '@/components/EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar';


const Homepage = () => {

    return(
        <>
    <main className={styles.main}>
        <Sidebar title="My Sidebar" />
        <Navbar title="My Navbar" />
        <div style={{ width: "100%", height: "100%",padding: "0 4rem"}} className="sm:ml-64 ">
        
            <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                  ออมเงินเผื่อฉุกเฉิน
               </p>
            </div>
            <div style={{ width: "100%", height: "100%" }} className="py-4 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <MultiStepProgressBar title='bar' step2Validator={true} step3Validator={true} step4Validator={true}/>
            </div>
        
        </div>
        
        
    </main>
    </>
    );
};
export default Homepage;