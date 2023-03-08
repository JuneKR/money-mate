import React from 'react';
import { useRouter } from 'next/router';
interface SavingSelectionPageProps  {
  title: string;
}


const SavingSelectionPage: React.FC<SavingSelectionPageProps> = ({ title}) => {
  const router = useRouter()
  const handleEmergencyHomepage = () => {
     router.push('/EmergencyPages/emergencyHomepage')
   }
    return (
        <div style={{ width: "100%"}}>
            <div className="p-4 dark:border-gray-700 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-3 lg-grid-cols-3 gap-3 mb-3">
                  <div className=" border-2 border-gray-500 rounded-sm flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <button onClick = {handleEmergencyHomepage} className="text-2xl text-black dark:text-gray-500">Emergency</button>
                  </div>
                  <div className=" border-2 border-gray-500 rounded-sm flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <button className="text-2xl text-black dark:text-gray-500">Goal-Based</button>
                  </div>
                  <div className=" border-2 border-gray-500 rounded-sm flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                   <button className="text-2xl text-black dark:text-gray-500">Retirement</button>
                  </div>
               </div>
            </div>
         </div>
        
    );
  };
  
  export default SavingSelectionPage;