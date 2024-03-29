import React, { useState } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import InvestmentCheckBox from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox';
import { useRouter } from 'next/router'

type PackageData = {
  expense: number;
  period: number;
  monthlySaving: number;
  totalBalance: number;
  timeRemaining: number;
  targetAmount: number;
  riskLevel: number;
  returnRate: number;
};

type PackageProps = PackageData & {
  updateFields: (fields: Partial<PackageData>) => void;
};

const EmergencyInvestmentPortfolioPackage = ({
  expense,
  period,
  monthlySaving,
  totalBalance,
  timeRemaining,
  targetAmount,
  riskLevel,
  returnRate,
  updateFields
}: PackageProps) => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleColumn() {
        setIsOpen(!isOpen);
      }
    const router = useRouter()
    const handleCheckboxChange = (isChecked: boolean) => {
        // Do something with the new checkbox state
      };
      const handleEmergencyInvestment = () => {
        router.push('/EmergencyPages/emergencyInvestmentDashboard')
      }
      const handlesEmergencyPlanForm = () => {
        router.push('/EmergencyPages/emergencyCreateForm')
      }
      
    console.log('Package Expense',expense);
    console.log('Package Risk',riskLevel);
    console.log('Package Returns',returnRate);

    return(
    <>
    <main className={styles.main}>
        <div style={{padding: "0 4rem"}} className="w-full xl:w-8/12">
            <Sidebar title="My Sidebar" />
            <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className="py-2 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
               </p>
            </div>
            <div className='bg-gray-50'>
                <div className='px-4' >
                {/* <InvestmentCheckBox label="My checkbox label" onChange={handleCheckboxChange} title={'InvestmentCheckBox'} portfolioPackage={portfolioPackage} portfolioPackageAllocation={undefined}/> */}
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