import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import MyPortForm from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyMyPortForm/emergencyMyPortForm'
import { useRouter } from 'next/router'
import Pie1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1'


const EmergencyInvestmentPortfilio = () => {
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
        <div style={{padding: "0 4rem"}} className="w-full h-full">
            <Sidebar title="My Sidebar" />
            <div style={{backgroundColor: '#B2E8FF'}}className="flex justify-center py-2 rounded bg-gray-50 dark:bg-gray-800">
                <p style={{ padding: "0 1rem"  }}className="font-bold text-2xl text-black dark:text-gray-500">
                    My Investment Portfolio
                </p>
            </div>
            <div className='bg-white'>
                <div className='grid grid-cols-2 pt-5'>
                    <div>
                        <Pie1 title={'my pie1'}/>
                    </div>
                    <div className='text-black'>
                        ข้อมูลกองทุน
                    </div>
                </div>
                <MyPortForm/>
                
            </div>
            
        
        </div>
        
        
    </main>
    </>
    );
};
export default EmergencyInvestmentPortfilio;