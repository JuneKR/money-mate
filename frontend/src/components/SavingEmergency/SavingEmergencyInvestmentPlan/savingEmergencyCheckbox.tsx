import React from 'react';
import { useState } from 'react';
import Pie1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentPieChartPortfolio1'
import DropDown1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyInvestmentPortfolioPackageComponents/emergencyInvestmentDropDownMenu'
import Hiding1 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn1'
import Hiding2 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn2'
import Hiding3 from '@/components/SavingEmergency/SavingEmergencyInvestmentPlan/EmergencyHidingColumn/emergencyHidingColumn3'

interface SavingEmergencyCheckboxProps  {
  title: string;
  label: string;
  checked: boolean;
  onChange: (isChecked: boolean) => void;
}


const SavingEmergencyCheckbox: React.FC<SavingEmergencyCheckboxProps> = ({ title, label, checked, onChange}) => {

      const [selectedOption, setSelectedOption] = useState('');
      const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setSelectedOption(event.target.value);
      };
    const [isExpanded, setIsExpanded] = useState(false);
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
                    <div className=' w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='flex justify-center item-center boder border-blue-500 grid grid-cols-2'>
                            <h1 className='font-bold'>เลือกพอร์ตการลงทุนของคุณ</h1>
                            <Pie1 title={'my pie1'}/>
                        </div>
                        <div className='flex justify-center item-center boder border-blue-500'>
                            <div>
                            <Hiding1 title={''}/>
                            <Hiding2 title={''}/>
                            <Hiding3 title={''}/>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
            <div>
                <div style={{ width: "100%", height: "100%", backgroundColor: '#E5F8FF'}} className="text-black relative px-4 py-4 rounded bg-gray-50 dark:bg-gray-800 border border-gray-500">
                    <div className="flex justify-end">
                        <input
                            type="radio"
                            name="option"
                            value="option2"
                            checked={selectedOption === 'option2'}
                            onChange={handleOptionChange}
                        />
                    </div>
                    <div className=' w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='flex justify-center item-center boder border-blue-500 grid grid-cols-2'>
                            <h1 className='font-bold'>เลือกพอร์ตการลงทุนของคุณ</h1>
                            <Pie1 title={'my pie1'}/>
                        </div>
                        <div className='flex justify-center item-center boder border-blue-500'>
                            <div>
                            <Hiding1 title={''}/>
                            <Hiding2 title={''}/>
                            <Hiding3 title={''}/>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
            <div className='py-5'>
                <div style={{ width: "100%", height: "100%", backgroundColor: '#E5F8FF'}} className="text-black relative px-4 py-4 rounded bg-gray-50 dark:bg-gray-800 border border-gray-500">
                    <div className="flex justify-end">
                        <input
                            type="radio"
                            name="option"
                            value="option3"
                            checked={selectedOption === 'option3'}
                            onChange={handleOptionChange}
                        />
                    </div>
                    <div className=' w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                        <div className='flex justify-center item-center boder border-blue-500 grid grid-cols-2'>
                            <h1 className='font-bold'>เลือกพอร์ตการลงทุนของคุณ</h1>
                            <Pie1 title={'my pie1'}/>
                        </div>
                        <div className='flex justify-center item-center boder border-blue-500'>
                            <div>
                            <Hiding1 title={''}/>
                            <Hiding2 title={''}/>
                            <Hiding3 title={''}/>
                            </div>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>
        
        
    );
  };
  
  export default SavingEmergencyCheckbox;