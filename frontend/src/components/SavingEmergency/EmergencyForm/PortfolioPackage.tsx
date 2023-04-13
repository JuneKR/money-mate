import React, { useState, useMemo, useEffect } from 'react';
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
  handlePackageSelection: any;
};

const initialPortfolioPackage = {
    Package_ID: 1,
    PackageName: "",
    LastUpdate: "",
    RiskSpectrum: 1,
    InvestmentType: "",
    ReturnRate: 0
}

export function PortfolioPackage ({
  expense,
  period,
  monthlySaving,
  totalBalance,
  timeRemaining,
  targetAmount,
  riskLevel,
  returnRate,
  updateFields,
  handlePackageSelection
}: PackageProps) {

    const urlServer = "http://localhost:8080/";
    const [portfolioPackage, setPortfolioPackage] = useState(initialPortfolioPackage);
    const [portfolioPackageAllocation, setPortfolioPackageAllocation] = useState([]);
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = (isSelected: boolean) => {
        // Do something with the new checkbox state
        console.log('isSelect',isSelected);
        handlePackageSelection(!isSelected);
    };

    useEffect(() => {
        // Fetch One Portfolio Pacakge by Risk Spectrum
        async function fetchPortfolioPackage() {
          try {
            // Fetch User Profile
            const packageResponse = await fetch(`${urlServer}portfolio/package/risk-spectrum/${riskLevel}`, {
              credentials: "include",
            });
            const portfolioPackage = await packageResponse.json();
            if (packageResponse.ok) {
                console.log(portfolioPackage);
                // Set Portfolio Package
                setPortfolioPackage(portfolioPackage);
            } 
            else {
                const errorData = await packageResponse.json();
                console.log(errorData);
            }
            console.log('Package Details:', portfolioPackage);
          } catch (error) {
            console.log("fetch Package Error: ", error);
          }
        }

        // Fetch Portfolio Package Allocation by Package ID
        async function fetchPortfolioPackageAllocation() {
            try {
              // Fetch User Profile
              const packageResponse = await fetch(`${urlServer}portfolio/package/${portfolioPackage.Package_ID}/allocations`, {
                credentials: "include",
              });
              const packageAllocation = await packageResponse.json();
              if (packageResponse.ok) {
                  console.log(portfolioPackage);
                  // Set Portfolio Package Allocation
                  setPortfolioPackageAllocation(packageAllocation);
              } 
              else {
                  const errorData = await packageResponse.json();
                  console.log(errorData);
              }
              console.log('Package Details:', portfolioPackage);
            } catch (error) {
              console.log("fetch Package Error: ", error);
            }
        }

        fetchPortfolioPackage();
        fetchPortfolioPackageAllocation()
    }, []);

    return (
        <>
        <main className={styles.main}>
            <div style={{padding: "0 4rem"}} className="w-full xl:w-8/12">
                <Sidebar title="My Sidebar" />
                <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                   <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                    การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน
                   </p>
                </div>
                <div className='bg-gray-50'>
                    <div className='px-4' >
                    <InvestmentCheckBox 
                        label="My checkbox label" 
                        // checked={false} 
                        onChange={handleCheckboxChange} 
                        title={'InvestmentCheckBox'}
                        portfolioPackage={portfolioPackage}
                        portfolioPackageAllocation={portfolioPackageAllocation}
                    />
                    </div>
                </div>
                <div className="flex justify-end py-2">
                </div>
            </div>
        </main>
        </>
    )
}

export default PortfolioPackage