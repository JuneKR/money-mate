import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import MultiStepProgressBar from '@/components/SavingEmergency/EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar';


const EmergencyHomepage = () => {

    return(
        <>
    <main className={styles.main}>
        <div style={{ width: "100%", height: "100%",padding: "0 4rem"}} className=" ">
            <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
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
export default EmergencyHomepage;