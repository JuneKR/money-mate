import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import MyPortForm from '@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalMyPortForm/goalMyPortForm';
import { useRouter } from 'next/router'
import Pie from "@/components/SavingForGoal/SavingGoalInvestmentPlan/GoalInvestmentPortfolioPackageComponents/sGoalInvestmentPieChartPortfolio";

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
            <div style={{backgroundColor: '#B2E8FF'}}className="flex justify-center py-2 rounded bg-gray-50 dark:bg-gray-800">
                <p style={{ padding: "0 1rem"  }}className="font-bold text-2xl text-black">
                    พอร์ตการลงทุนของคุณ
                </p>
            </div>
            <div className='bg-white'>
                <div className='grid grid-cols-2 pt-5'>
                    <div>
                        {/* <Pie1 title={'my pie1'}/> */}
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
export default GoalInvestmentPortfilio;