import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import MyPortForm from '@/components/SavingForRetirement/SavingRetirementInvestmentPlan/RetirementMyPortForm/retirementMyPortForm';
import { useRouter } from 'next/router'

const GoalInvestmentPortfilio = () => {
    const router = useRouter()
    const handleCheckboxChange = (isChecked: boolean) => {
        // Do something with the new checkbox state
      };
      const handleGoalInvestment = () => {
        router.push('/GoalBasedPages/goalInvestmentDashboard')
      }
      const handlesGoalPlanForm = () => {
        router.push('/GoalBasedPages/goalHomepage')
      }

    return(
        <>
    <main className={styles.main}>
        <div style={{padding: "0 4rem"}} className="w-full xl:w-8/12">
            <Sidebar title="My Sidebar" />
            <div className="flex justify-center py-2 rounded bg-gradient-to-r from-purple-900 to-pink-500">
                <p style={{ padding: "0 1rem"  }}className="text-2xl font-bold text-white">
                    พอร์ตการลงทุนของคุณ
                </p>
            </div>
            <div style={{ backgroundColor: "#1D1D41" }} className='shadow-2xl'>
                <div className='flex justify-center pt-5'>
                    <div className='text-white'>
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
export default GoalInvestmentPortfilio;