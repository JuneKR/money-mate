import React from "react";
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import MultiStepProgressBar from '@/components/EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar';
interface EmergencyGoalFormProps {
  title: string;
}

const EmergencyGoalForm: React.FC<EmergencyGoalFormProps> = ({ title }) => {
   const router = useRouter()
   const handleChooseEmergencyPlanForm = () => {
      router.push('/chooseEmergencyPlanForm')
    }
  return (
    <div style={{ width: "90%", height: "100%" }} className="sm:ml-64">
        <div className="mb-2">
            <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                  ออมเงินเผื่อฉุกเฉิน
               </p>
            </div>
            <div style={{ width: "100%", height: "100%" }} className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
               <MultiStepProgressBar title='bar' step2Validator={true} step3Validator={false} step4Validator={false} pageNum={0}/>
            </div>
            <div style={{ width: "100%", height: "800px",padding: "0 4rem"  }} className="rounded bg-gray-50 dark:bg-gray-800">
               <form action="">
                  <label htmlFor="monthlyExpense" className="block">
                     <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">รายจ่ายรายเดือน</span>
                     <input
                     type="string"
                     id="mExpense"
                     placeholder="15,000"
                     style={{ width: "100%", height: "50px"}}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                     />
                     <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                     ข้อมูลไม่ถูกต้อง
                     </p>
                  </label>
                  <label htmlFor="months" className="block">
                     <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">จำนวนเดือนที่ต้องการเก็บ</span>
                     <input
                     type="string"
                     id="months"
                     placeholder="6"
                     style={{ width: "100%", height: "50px"}}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                     />
                     <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                     ข้อมูลไม่ถูกต้อง
                     </p>
                  </label>
                  <label htmlFor="monthlyDeposit" className="block">
                     <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">เงินเก็บ/เดือน</span>
                     <input
                     type="string"
                     id="mDeposit"
                     placeholder="1,000"
                     style={{ width: "100%", height: "50px"}}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                     />
                     <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                     ข้อมูลไม่ถูกต้อง
                     </p>
                  </label>
                  <label htmlFor="currentBalance" className="block">
                     <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">เงินปัจจุบัน</span>
                     <input
                     type="string"
                     id="cBalance"
                     placeholder="0"
                     style={{ width: "100%", height: "50px"}}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                     />
                     <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                     ข้อมูลไม่ถูกต้อง
                     </p>
                  </label>
                  <div className="flex justify-end">
                     <button style={{ width: "209px",marginRight: "10px"}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                              ย้อนกลับ
                     </button>
                     
                     <button onClick={handleChooseEmergencyPlanForm} style={{ width: "209px", marginLeft: "10px"}}className="px-4 py-2 font-bold text-black bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" type="button">
                              ถัดไป
                     </button>
                  </div>
               </form>
            </div>
        </div>
    </div>
  );
};

export default EmergencyGoalForm;
