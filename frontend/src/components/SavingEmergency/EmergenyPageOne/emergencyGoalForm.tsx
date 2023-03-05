import React, { useState } from "react";
import { FormDataprops,CompleteFormstate, Formprops } from "../EmergencyMultiStepProgressbar/emergencyMultiStepProgressbar";
interface EmergencyGoalFormProps extends FormDataprops {
  
}


const EmergencyGoalForm: React.FC<FormDataprops> = ({formData, setFormData}) => {
   
   return (
      <div className="py-20"> 
         <div style={{ width: "100%", height: "100%", padding: "0 4rem" }} className="rounded bg-gray-50 dark:bg-gray-800">
            <form action="">
               <label htmlFor="monthlyExpense" className="block">
                  <span className="block m-1 font-medium text-gray-700 hover:border-b hover:border-gray-800">รายจ่ายรายเดือน</span>
                  <input
                     type="string"
                     id="mExpense"
                     value={formData.mExpense}
                     onChange={(e:React.ChangeEvent<HTMLInputElement>) => setFormData((prevState) => ({...prevState,mExpense: e.target.value,}))}
                     placeholder="15,000"
                     style={{ width: "100%", height: "50px" }}
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
                     onChange={(e)=>setFormData({...formData, months: e.target.value})}
                     value={formData.months}
                     placeholder="6"
                     style={{ width: "100%", height: "50px" }}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" />
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
                     onChange={(e)=>setFormData({...formData, mDeposit: e.target.value})}
                     value={formData.mDeposit}
                     style={{ width: "100%", height: "50px" }}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" />
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
                     onChange={(e)=>setFormData({...formData, cBalance: e.target.value})}
                     value={formData.cBalance}
                     style={{ width: "100%", height: "50px" }}
                     className="block w-full px-3 py-2 text-sm placeholder-gray-500 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 invalid:text-pink-700 invalid:focus:ring-pink-700 invalid:focus:border-pink-700 peer" />
                  <p className="invisible m-1 text-xs text-pink-700 peer-invalid:visible">
                     ข้อมูลไม่ถูกต้อง
                  </p>
               </label>

            </form>
         </div>
      </div>
   );
}

export default EmergencyGoalForm;
