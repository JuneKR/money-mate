import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import InvestmentCheckBox from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox';
import { useRouter } from 'next/router'

const EmergencyInvestmentPortfolioPackage = () => {
    const router = useRouter()
    const handleCheckboxChange = (isChecked: boolean) => {
        // Do something with the new checkbox state
      };
      const handleEmergencyInvestment = () => {
        router.push('/EmergencyPages/emergencyInvestmentDashboard')
      }
      const handlesEmergencyPlanForm = () => {
        router.push('/EmergencyPages/emergencyHomepage')
      }

    return(
        <>
    <main className={styles.main}>
        <div style={{ width: "100%", height: "100%",padding: "0 4rem"}} className=" ">
            <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
               </p>
            </div>
            <div className='bg-gray-50'>
                <div className='py-5 px-4' >
                <InvestmentCheckBox label="My checkbox label" checked={false} onChange={handleCheckboxChange} title={'InvestmentCheckBox'}/>
                </div>
                <div className='py-5 px-4'>
                <InvestmentCheckBox label="My checkbox label" checked={false} onChange={handleCheckboxChange} title={'InvestmentCheckBox'}/>
                </div>
                <div className='py-5 px-4'>
                <InvestmentCheckBox label="My checkbox label" checked={false} onChange={handleCheckboxChange} title={'InvestmentCheckBox'}/>
                </div>
            </div>
            <div className="flex justify-end py-2">
                <button onClick={handlesEmergencyPlanForm} style={{ width: "209px"}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                        ย้อนกลับ
                </button>
                <button onClick={handleEmergencyInvestment} style={{ width: "209px",backgroundColor: '#B2E8FF'}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                        ถัดไป
                </button>
            </div>
        
        </div>
        
        
    </main>
    </>
    );
};
export default EmergencyInvestmentPortfolioPackage;