import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import StepProgressBar from 'react-step-progress';
import "react-step-progress/dist/index.css";
import PageTwo from '@/components/EmergenyPageOne/emergencyGoalForm'
import PageThree from '@/components/EmergenyPageTwo/cEmergencyPlanForm'
import PageFour from '@/components/EmergenyPageThree/sEmergencyPlanForm'
import PageFive from '@/components/EmergenyPageFour/emergencyResultForm'
interface EmergencyMultiStepProgressbarProps  {
  title: string;
  step2Validator: boolean;
  step3Validator: boolean;
  step4Validator: boolean;
  // pageNum: number;
  nextButtonClassName?: string;
  previousButtonClassName?: string;
  
}


const EmergencyMultiStepProgressbar: React.FC<EmergencyMultiStepProgressbarProps> = ({ title,step2Validator,step3Validator,step4Validator,nextButtonClassName,previousButtonClassName}) => {

    const step2Validator2 = () => step2Validator;
    const step3Validator2= () => step3Validator;
    const step4Validator2 = () => step4Validator;
    const onFormSubmit = () => {
        
      }
  
    const step1Content = <h1></h1>;
    const step2Content = <PageTwo title={''}/>;
    const step3Content = <PageThree title={''}/>;
    const step4Content = <PageFour title={''}/>;
    const step5Content = <PageFive title={''}/>;
  
  
    return (
        <div style={{ width: "100%", height: "100%" }} className='text-black'>
        <StepProgressBar
        startingStep={0}
        onSubmit={onFormSubmit}
        previousBtnName="ย้อนกลับ"
        nextBtnName="ถัดไป"

        // finishBtnName="เสร็จสิ้น"
        steps={[
          {
            label: "เลือกเป้าหมาย",
            name: "step 1",
            content: step1Content
          },
          {
            label: "สร้างเป้าหมาย",
            name: "step 2",
            content: step2Content,
            validator: step2Validator2
          },
          {
            label: "ปรับเป้าหมาย",
            name: "step 3",
            content: step3Content,
            validator: step3Validator2
          },
          {
            label: "เลือกแผน",
            name: "Step 4",
            content: step4Content,
            validator: step4Validator2
          },
          {
            label: "ตรวจสอบแผน",
            name: "Step 5",
            content: step5Content
          }
        ]}
        
    
      />
      

      </div>
      
    );
  };
  
  export default EmergencyMultiStepProgressbar;