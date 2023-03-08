import React from "react";
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FormDataprops } from "../EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar";
import EmergencyPlanDataTable from '@/components/SavingEmergency/EmergencyPlanGridTable/emargencyPlanGridTable'

interface SEmergencyPlanFormProps {
  title: string;
}

const SEmergencyPlanForm: React.FC<FormDataprops> = ({formData, setFormData}) => {
  const router = useRouter()
  const handleEmergencyInvestmanet = () => {
    router.push('/EmergencyPages/emergencyInvestmentPortfolioPackage')
  }
  
    const marks = [
      {
        value: 1,
        label: '1',
      },
      {
        value: 2,
        label: '2',
      },
      {
        value: 3,
        label: '3',
      },
      {
        value: 4,
        label: '4',
      },
      {
        value: 5,
        label: '5',
      },
      {
        value: 6,
        label: '6',
      },
      {
        value: 7,
        label: '7',
      },
      {
        value: 8,
        label: '8',
      },
    ];
    function valuetext(value: number) {
      return `${value}°C`;
    }
    function valueLabelFormat(value: number) {
      return marks.findIndex((mark) => mark.value === value) + 1;
    }
  return (
    <div className="py-20">
      <div style={{ width: "100%", height: "100%",padding: "0 4rem"  }} className="rounded bg-gray-50 dark:bg-gray-800">
                <div style={{width: "100%", height: "50%",backgroundColor: '#E5F8FF'}} className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                    <div className="grid grid-cols-1 sm:grid-cols-2 text-black font-bold">
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
                    
                
               <form action="">
                  <div style={{width: "100%", height: "100%"}} className="gap-20 mb-3 grid grid-cols-2 block w-full px-3 py-7 text-sm placeholder-gray-500">
                    <div style={{backgroundColor: '#E5F8FF',padding: "0 4rem"}} className="w-full h-full grid grid-cols-1 border border-gray-300 rounded bg-gray-50 dark:bg-gray-800">
                        <div className="text-black rounded py-2 font-bold ">                                    
                          <h1>ความเสี่ยงที่คุณสามารถรับได้</h1>
                        </div>
                      <div style={{width: "100%", height: "100%"}}>
                      <Box sx={{ width: "100%" }}>
                        <Slider
                          aria-label="Temperature"
                          defaultValue={3}
                          getAriaValueText={valuetext}
                          valueLabelFormat={valueLabelFormat}
                          valueLabelDisplay="auto"
                          step={1}
                          marks={marks}
                          min={1}
                          max={8}
                        />
                      </Box>
                    </div>
                      <div className="text-black rounded py-3 ">
                          <h1 className="font-bold">ความเสี่ยงที่คุณสามารถรับได้</h1>
                          <a href=""><p className="text-blue-800 hover:text-blue-500">หมายเหตุ: คลิกที่นี่เพื่อประเมินความเสี่ยงของคุณ</p></a>
                      </div>
                      <label htmlFor="monthlyExpense" className="block">
                          <input
                            type="string"
                            id="mExpense"
                            value={formData.mExpense}
                            onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({...prevState,mExpense: e.target.value,}))}
                            placeholder="15,000"
                            style={{ width: "100%", height: "50px" }}
                            className="block w-full px-3 py-2 text-sm placeholder-gray-500 bg-white border border-gray-500 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" 
                          />
                          <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                            ข้อมูลไม่ถูกต้อง
                          </p>
                      </label>
                    </div>
                    <div style={{backgroundColor: '#E5F8FF', height: '100%', width: '100%'}} className="grid grid-cols-3 border border-gray-300 rounded-md flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
                        <div className="flex items-center justify-center h-24 grid grid-rows-2">
                          <div className="flex items-center justify-center h-24">ระดับความเสี่ยงของคุณ</div>
                          <div className="flex items-center justify-center h-24">4%</div>
                        </div>
                        <div className="flex items-center justify-center h-24">
                          เส้นกั้น
                        </div>
                        <div className="grid grid-rows-2 flex items-center justify-center h-24">
                          <div className="flex items-center justify-center h-24">ผลตอบแทนที่คาดหวัง</div>
                          <div className="flex items-center justify-center h-24">5%</div>
                        </div>
                    </div>
                  </div>
                  <div className="text-black rounded bg-gray-50 dark:bg-gray-800 py-6 font-bold">
                    <h1>เลือกแผนของคุณด้วยผลตอบแทนที่คุณรับได้</h1>
                  </div>
                  <div  className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm">
                    <div>
                     <EmergencyPlanDataTable title={"my table1"}/>
                    </div>
                  </div>
               </form>
               <div className="flex justify-end py-5">
                        <button onClick={handleEmergencyInvestmanet} style={{ width: "209px"}}className="px-4 py-2 font-bold text-black bg-gray-300 rounded shadow hover:bg-gray-400 focus:shadow-outline focus:outline-none" type="button">
                                สร้างแผนการลงทุน
                        </button>
                </div>
            </div>
    </div>
  );
};

export default SEmergencyPlanForm;
