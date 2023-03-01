import React, { useRef, useEffect } from 'react';
import { useState } from "react";
import StepProgressBar from 'react-step-progress';
import "react-step-progress/dist/index.css";

interface EmergencyMultiStepProgressbarProps {
  title: string;
  step2Validator: boolean;
  step3Validator: boolean;
  step4Validator: boolean;
  pageNum: number;
}

const EmergencyMultiStepProgressbar: React.FC<EmergencyMultiStepProgressbarProps> = ({ title,step2Validator,step3Validator,step4Validator,pageNum }) => {

    const step2Validator2 = () => step2Validator;
    const step3Validator2= () => step3Validator;
    const step4Validator2 = () => step4Validator;
    const onFormSubmit = () => {
        
      }
  
    const step1Content = <h1></h1>;
    const step2Content = <h1></h1>;
    const step3Content = <h1></h1>;
    const step4Content = <h1></h1>;
  
    return (
        <div style={{ width: "90%", height: "100%" }} className='text-black'>
        <StepProgressBar
        startingStep={pageNum}
        onSubmit={onFormSubmit}
        steps={[
          {
            label: "Step 1",
            name: "step 1",
            content: step1Content
          },
          {
            label: "Step 2",
            name: "step 2",
            content: step2Content,
            validator: step2Validator2
          },
          {
            label: "Step 3",
            name: "step 3",
            content: step3Content,
            validator: step3Validator2
          },
          {
            label: "Step 4",
            name: "Step 4",
            content: step4Content,
            validator: step4Validator2
          }
        ]}
      />
      

      </div>
      
    );
  };
  
  export default EmergencyMultiStepProgressbar;