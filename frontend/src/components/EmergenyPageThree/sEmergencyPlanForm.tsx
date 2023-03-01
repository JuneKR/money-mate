import React from "react";
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import MultiStepProgressBar from '@/components/EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar';
interface SEmergencyPlanFormProps {
  title: string;
}

const SEmergencyPlanForm: React.FC<SEmergencyPlanFormProps> = ({ title }) => {
    const router = useRouter()
    const handleChooseEmergencyPlanForm = () => {
       router.push('/chooseEmergencyPlanForm')
     }
     const handleConFirmEmergencyGoal = () => {
        router.push('/confirmEmergencyGoal')
      }
  return (
    <div className="py-6">
      <div style={{ width: "100%", height: "100%",padding: "0 4rem"  }} className="rounded bg-gray-50 dark:bg-gray-800">
                <div style={{width: "100%", height: "50%",backgroundColor: '#E5F8FF'}} className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-2 text-black font-bold">
                        <div className="text-blue-800 hover:text-blue-900 p-4">เป้าหมาย</div>
                        <div className="text-blue-800 hover:text-blue-900 p-4">ออมเงินเผื่อฉุกเฉิน</div>
                        <div className="p-4">คุณต้องมีเงินฉุกเฉิน</div>
                        <div className="p-4">100,000</div>
                        <div className="p-4"> จำนวนเดือนที่ต้องการเก็บ</div>
                        <div className="p-4">6</div>
                        <div className="p-4">ระยะเวลาในการออม</div>
                        <div className="p-4">5 ปี</div>
                        <div className="p-4">ระดับความเสี่ยง</div>
                        <div className="p-4">2 ปี</div>
                        <div className="p-4">ผลตอบแทนที่คาดหวัง</div>
                        <div className="p-4">4%</div>
                    </div>    
                </div>
                    
                <div className="text-black rounded bg-gray-50 dark:bg-gray-800 py-6 font-bold">
                    <h1>ความเสี่ยงที่คุณสามารถรับได้</h1>
                </div>
               <form action="">
                  <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            กราฟกับตัวเลื่อนเดะคอยเอามาใส่ยังไม่ได้ไปหา component
                        </p>
                    </div>
                  </div>
                  <div className="text-black rounded bg-gray-50 dark:bg-gray-800 py-6 font-bold">
                    <h1>เลือกแผนของคุณด้วยผลตอบแทนที่คุณรับได้</h1>
                  </div>
                  <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            Table from Backend
                        </p>
                    </div>
                  </div>
                  {/* <div className="flex justify-end py-5">
                     <button onClick={handleChooseEmergencyPlanForm} style={{ width: "209px",marginRight: "10px"}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                              ย้อนกลับ
                     </button>
                     
                     <button onClick={handleConFirmEmergencyGoal} style={{ width: "209px", marginLeft: "10px"}}className="px-4 py-2 font-bold text-black bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" type="button">
                              ถัดไป
                     </button>
                  </div> */}
               </form>
            </div>

    </div>
  );
};

export default SEmergencyPlanForm;
