import React from 'react';
import { useState } from 'react';
import Pie1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1'
import DropDown1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentDropDownMenu'
import Hiding from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn'


type PortfolioPackageData = {
    Package_ID: number;
    PackageName: string;
    LastUpdate: string;
    RiskSpectrum: number;
    InvestmentType: string;
    ReturnRate: number;
  };

interface SavingEmergencyCheckboxProps  {
  title: string;
  label: string;
//   checked: boolean;
  onChange: (isChecked: boolean) => void;
  portfolioPackage: PortfolioPackageData
  portfolioPackageAllocation: any;
}

const SavingEmergencyCheckbox: React.FC<SavingEmergencyCheckboxProps> = ({ 
    title, 
    label, 
    // checked, 
    onChange, 
    portfolioPackage, 
    portfolioPackageAllocation
}) => {

    const [selectedOption, setSelectedOption] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption('Target Value',event.target.value);
        console.log(event.target.value);
        if (selectedOption === 'option1') {
            console.log('Selected',selectedOption);
            onChange(true);
        }
        else {
            console.log('Unselect',selectedOption);
            onChange(false);
        }
    };
    
    const toggleExpansion = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <div className='py-5'>
                <div style={{ width: "100%", height: "100%", backgroundColor: '#E5F8FF'}} className="text-black relative px-4 py-4 rounded bg-gray-50 dark:bg-gray-800 border border-gray-500">
                    <div className="flex justify-end">
                        <input
                            type="radio"
                            name="option"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                        />
                    </div>
                    <h1 className='font-bold'>เลือกพอร์ตการลงทุนของคุณ</h1>
                    <div 
                        style={{backgroundColor: "#1D1D41"}} className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 py-5"
                    >
                        <div 
                            style={{ alignItems: "center" }}
                            className="col-span-1 flex justify-center item-center"
                        >
                            <Pie1 
                                title={portfolioPackage?.PackageName}
                            />
                        </div>
                        <div 
                            className="flex justify-center item-center boder border-blue-500 col-span-2 "
                        >
                            <div>
                            {portfolioPackageAllocation?.map((data: any) => (
                                <Hiding
                                    title={data.PolicyDesc}
                                    packageAllocation={data} 
                                />
                            ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <p>ผลตอบแทนที่คาดหวัง {portfolioPackage?.ReturnRate}%</p>
                    </div>
                </div>
            </div>
        </div>  
    );
  };
  
  export default SavingEmergencyCheckbox;