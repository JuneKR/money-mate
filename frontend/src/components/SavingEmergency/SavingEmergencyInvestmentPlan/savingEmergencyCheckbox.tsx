import React from 'react';
import { useState } from 'react';
import PiePackage from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolioPackage'
import DropDown1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentDropDownMenu'
import Hiding from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn'
import EmergencyFundsDetailsTablePackage from './EmergencyMyPortForm/emergencyFundsDetailsTablePackage';

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
        setSelectedOption(event.target.value);
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
    console.log('Package at checkbox', portfolioPackage);
    console.log('Package Allocation at checkbox', portfolioPackageAllocation);
    const toggleExpansion = () => setIsExpanded(!isExpanded);

    return (
        <div>
            <div 
                className='py-5'
            >   
                {/* backgroundColor: "#27264E" */}
                {/* backgroundColor: "#1D1D41" */}
                <div style={{ width: "100%", height: "100%", backgroundColor: "#1D1D41"}} className="relative px-4 py-4 text-black border border-gray-500 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="flex justify-end">
                        <input
                            type="radio"
                            name="option"
                            value="option1"
                            checked={selectedOption === 'option1'}
                            onChange={handleOptionChange}
                            className="w-10 h-6 text-indigo-600 transition duration-150 ease-in-out form-radio"
                        />
                    </div>
                    <h1 className='p-5 text-2xl font-bold text-center text-white'>
                        {/* เลือกพอร์ตการลงทุนของคุณ */}
                        {portfolioPackage?.PackageName}
                    </h1>
                    <div 
                        style={{backgroundColor: "#27264E"}} 
                        // className="grid grid-cols-1 py-5 sm:grid-cols-1 lg:grid-cols-3"
                    >   
                        <div 
                            style={{ alignItems: "center" }}
                            className="flex justify-center col-span-1 p-4 item-center"
                        >
                            {portfolioPackage && portfolioPackageAllocation ? (
                                <PiePackage 
                                title={portfolioPackage?.PackageName}
                                portfolioPackageAllocation={portfolioPackageAllocation}
                            />
                            ): (
                                <p>ไม่มีแพ็คเกจการลงทุนตามระดับความเสี่ยงที่ท่านเลือกในขณะนี้</p>
                            )}
                        </div>
                        <div 
                            className="flex justify-center col-span-2 text-white border-blue-500 item-center boder "
                        >
                            <div>
                            {portfolioPackage && portfolioPackageAllocation ? (
                            <EmergencyFundsDetailsTablePackage 
                                title={""}
                                portfolioPackage={portfolioPackage}
                                portfolioPackageAllocation={portfolioPackageAllocation}
                            />
                            ): (
                                <p>ไม่มีแพ็คเกจการลงทุนตามระดับความเสี่ยงที่ท่านเลือกในขณะนี้</p>
                            )}    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
  };
  
  export default SavingEmergencyCheckbox;