import React from "react";
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'
import MultiStepProgressBar from '@/components/EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar';
interface CEmergencyPlanFormProps {
  title: string;
}

const CEmergencyPlanForm: React.FC<CEmergencyPlanFormProps> = ({ title }) => {
    const router = useRouter()
    const handleSetEmergencyGoalForm = () => {
       router.push('/setEmergencyGoal')
     }
     const handleSelectEmergencyPlanForm = () => {
        router.push('/selectEmergencyPlanForm')
      }
  return (
    <div style={{ width: "90%", height: "100%" }} className="sm:ml-64">
        <div className="mb-2">
            <div style={{display: "flex", alignItems: "center"}} className="bg-blue-200 h-24 rounded bg-gray-50 dark:bg-gray-800">
               <p style={{ padding: "0 1rem"  }}className="text-2xl text-black dark:text-gray-500">
                  ออมเงินเผื่อฉุกเฉิน หน้า2
               </p>
            </div>
            <div style={{ width: "100%", height: "100%" }} className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                <MultiStepProgressBar title='bar' step2Validator={true} step3Validator={false} step4Validator={false} pageNum={1}/>
            </div>
            
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
                        <div className="p-4">8ปี 9 เดือน</div>
                    </div>    
                </div>
                    
                <div className="text-black rounded bg-gray-50 dark:bg-gray-800 py-6 font-bold">
                    <h1>คุณสามารถปรับเปลี่ยนและเลือกเป้าหมายที่ดูเป็นได้ไปที่สุดสำหรับคุณ</h1>
                </div>
               <form action="">
                  <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            จำนวน เดือน _____6_____9_____12_____
                        </p>
                    </div>
                    <div style={{ width: "100%", height: "100%"}}className="grid grid-cols-4 text-black">
                        <div></div>
                        <div style={{width: "100%", backgroundColor: '#E5F8FF', marginRight: '30px'}} className="py-5 px-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col justify-center">
                                    <div className="mb-4">รายจ่าย/เดือน</div>
                                    <div className="mb-4">เงินเก็บ/เดือน</div>
                                    <div>เงินปัจจุบัน</div>
                                </div>
                                <div>
                                    <input placeholder="15,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="1,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="0" type="text" className="w-full px-4 rounded" />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: "100%", backgroundColor: '#E5F8FF', marginLeft: '30px' }} className="flex items-center justify-center">
                            <label htmlFor="#" className="block">
                                <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">ระยะเวลาออม</span>
                                    <input
                                    type="string"
                                    id="#"
                                    placeholder="8 ปี 9 เดือน"
                                    style={{ width: "100%", height: "50px"}}
                                    className="block w-full text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                                    />
                            </label>
                        </div>
                        <div></div>
                    </div>
                  </div>
                  <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                  <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            จำนวน เดือน _____6_____9_____12_____
                        </p>
                    </div>
                    <div style={{ width: "100%", height: "100%"}}className="grid grid-cols-4 text-black">
                        <div></div>
                        <div style={{width: "100%", backgroundColor: '#E5F8FF', marginRight: '30px'}} className="py-5 px-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col justify-center">
                                    <div className="mb-4">รายจ่าย/เดือน</div>
                                    <div className="mb-4">เงินเก็บ/เดือน</div>
                                    <div>เงินปัจจุบัน</div>
                                </div>
                                <div>
                                    <input placeholder="15,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="1,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="0" type="text" className="w-full px-4 rounded" />
                                </div>
                            </div>
                        </div>
                        <div style={{ width: "100%", backgroundColor: '#E5F8FF', marginLeft: '30px' }} className="flex items-center justify-center">
                            <label htmlFor="#" className="block">
                                <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">ระยะเวลาออม</span>
                                    <input
                                    type="string"
                                    id="#"
                                    placeholder="8 ปี 9 เดือน"
                                    style={{ width: "100%", height: "50px"}}
                                    className="block w-full text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                                    />
                            </label>
                        </div>
                        <div></div>
                    </div>
                  </div>
                  <div className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                    <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <p className="text-2xl text-gray-400 dark:text-gray-500">
                            จำนวน เดือน _____6_____9_____12_____
                        </p>
                    </div>
                    <div style={{ width: "100%", height: "100%"}}className="grid grid-cols-4 text-black">
                        <div></div>
                        <div style={{width: "100%", backgroundColor: '#E5F8FF', marginRight: '30px'}} className="py-5 px-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col justify-center">
                                    <div className="mb-4">รายจ่าย/เดือน</div>
                                    <div className="mb-4">เงินเก็บ/เดือน</div>
                                    <div>เงินปัจจุบัน</div>
                                </div>
                                <div>
                                    <input placeholder="15,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="1,000" type="text" className="w-full mb-4 px-4 rounded" />
                                    <input placeholder="0" type="text" className="w-full px-4 rounded" />
                                </div>
                            </div>
                        </div>

                        <div style={{ width: "100%", backgroundColor: '#E5F8FF', marginLeft: '30px' }} className="flex items-center justify-center">
                            <label htmlFor="#" className="block">
                                <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">ระยะเวลาออม</span>
                                    <input
                                    type="string"
                                    id="#"
                                    placeholder="8 ปี 9 เดือน"
                                    style={{ width: "100%", height: "50px"}}
                                    className="block w-full text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer"
                                    />
                            </label>
                        </div>
                        <div></div>
                    </div>
                  </div>
                  <div className="flex justify-end py-5">
                     <button onClick={handleSetEmergencyGoalForm} style={{ width: "209px",marginRight: "10px"}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                              ย้อนกลับ
                     </button>
                     
                     <button onClick={handleSelectEmergencyPlanForm} style={{ width: "209px", marginLeft: "10px"}}className="px-4 py-2 font-bold text-black bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" type="button">
                              ถัดไป
                     </button>
                  </div>
               </form>
            </div>
        </div>
    </div>
  );
};

export default CEmergencyPlanForm;
