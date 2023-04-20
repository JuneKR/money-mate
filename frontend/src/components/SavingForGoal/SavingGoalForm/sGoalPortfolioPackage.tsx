import React, { useState, useMemo, useEffect } from 'react';
import styles from '@/styles/Home.module.css'
import Sidebar from '@/components/Sidebar'
import InvestmentCheckBox from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/savingEmergencyCheckbox';
import { useRouter } from 'next/router'

type PackageData = {
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
    Package_ID: 0,
    PackageName: "",
    LastUpdate: "",
    RiskSpectrum: 1,
    InvestmentType: "",
    ReturnRate: 0
}

export function PortfolioPackage ({
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
        // Fetch Portfolio Pacakge by Risk Spectrum
        async function fetchPortfolioPackageData() {
          try {
            if (riskLevel) {
              // Fetch Portfolio Package
              console.log('Risk Before Fetch', riskLevel);
              const packageResponse = await fetch(`${urlServer}portfolio/package/risk-spectrum/${riskLevel}`, {
                credentials: "include",
              });
              const portfolioPackage = await packageResponse.json();

              if (portfolioPackage && portfolioPackage.Package_ID) {
                setPortfolioPackage(portfolioPackage);
                console.log('Package Details:', portfolioPackage);  

                // Fetch Portfolio Package Allocation
                const packageAllocationResponse = await fetch(`${urlServer}portfolio/package/${portfolioPackage.Package_ID}/allocations`, {
                  credentials: "include",
                });
                const packageAllocation = await packageAllocationResponse.json();
                if (packageAllocation) {
                  setPortfolioPackageAllocation(packageAllocation);
                  console.log('Package Allocation Details:', packageAllocation);
                } else {
                  console.log("Package allocation not found");
                }
              }
            }
          } catch (error) {
            console.log("fetch Package Data Error: ", error);
          }
        }

        fetchPortfolioPackageData()
    }, []);

    return (
        <>
        <main 
          // className={styles.main}
        >
            <div>
                <Sidebar title="My Sidebar" />
                <div 
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#6259E8",
                  }}
                  className=" py-2 rounded bg-gray-50"
                >
                  <p 
                    style={{ padding: "0 1rem"  }}
                    className="font-bold text-white text-2xl"
                  >
                    {/* การลงทุนสำหรับเงินออมเผื่อฉุกเฉิน */}
                    เลือกพอร์ตการลงทุนของคุณ
                   </p>
                </div>
                <div 
                  className='bg-gray-50'
                >
                    <div
                      style={{ backgroundColor: "#1D1D41" }}
                    >
                    {portfolioPackage && portfolioPackageAllocation && portfolioPackageAllocation.length > 0 ? (
                      <InvestmentCheckBox 
                        label="My checkbox label" 
                        onChange={handleCheckboxChange} 
                        title={'InvestmentCheckBox'}
                        portfolioPackage={portfolioPackage}
                        portfolioPackageAllocation={portfolioPackageAllocation}
                      />
                    ) : (
                      <div 
                        className="flex justify-center items-center h-full p-20"
                      >
                        <p className="text-white text-3xl">ไม่มีแพ็คเกจการลงทุนตามระดับความเสี่ยงที่ท่านเลือกในขณะนี้</p>
                      </div>
                    )}
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default PortfolioPackage