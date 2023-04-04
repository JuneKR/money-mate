import Sidebar from '@/components/Sidebar'
import styles from '@/styles/Home.module.css'
import React, { FormEvent, useState } from 'react';
import { Stepper, StepLabel, Step, Box } from '@mui/material';
import { useMultistepForm } from '@/components/SavingEmergency/EmergencyForm/useMultistepForm';
import { GoalForm } from '@/components/SavingEmergency/EmergencyForm/GoalForm';
import { PlanForm } from '@/components/SavingEmergency/EmergencyForm/PlanForm';
import InvestmentForm from '@/components/SavingEmergency/EmergencyForm/InvestmentForm';

type FormData = {
    expense: number;
    period: number;
    monthlySaving: number;
    totalBalance: number;
    timeRemaining: number;
    targetAmount: number;
}

const initialData: FormData = {
    expense: 0, 
    period: 0,
    monthlySaving: 0,
    totalBalance: 0,
    timeRemaining: 0,
    targetAmount: 0
}

const emergencyCreateForm = () => {

    const [data, setData] = useState(initialData)

    function updateFields(fields: Partial<FormData>) {
        setData(prev => {
          return { ...prev, ...fields }
        })
    }

    const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <GoalForm {...data} updateFields={updateFields} />,
      <PlanForm {...data} updateFields={updateFields} />,
      <InvestmentForm {...data} updateFields={updateFields} />,
    ])

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        if (!isLastStep) return next()
        alert("Successful Account Creation")
    }

    return (
    <main className={styles.main}>
            <div
                style={{ width: "100%", height: "100%",padding: "0 4rem"}}
                className="rounded bg-gray-50 dark:bg-gray-800"
            >
                <Sidebar title="My Sidebar" />
                <div style={{display: "flex", alignItems: "center",backgroundColor: '#B2E8FF'}} className=" py-2 rounded bg-gray-50 dark:bg-gray-800">
                    <p style={{ padding: "0 1rem"  }}className="font-bold text-black dark:text-gray-500 ">
                        ออมเงินเผื่อฉุกเฉิน
                    </p>
                </div>
                {/* <div style={{ width: "100%", height: "100%" }} className="py-4 flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800 center-stepper"> */}
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={currentStepIndex}>
                            <Step>
                                <StepLabel>เลือกเป้าหมาย</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>สร้างเป้าหมาย</StepLabel>
                            </Step>
                            <Step>
                                <StepLabel>ตรวจสอบและเลือกแผน</StepLabel>
                            </Step>
                        </Stepper>
                    </Box>     
                {/* </div> */}
                <form onSubmit={onSubmit}>
                    {step}
                    <div
                        style={{marginTop: "1rem", display: "flex", gap: ".5rem", justifyContent: "flex-end",}}
                    >
                        {!isFirstStep && (
                            <button 
                                type="button" 
                                onClick={back}
                                className="px-4 py-2 font-bold text-white bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" 
                            >
                                Back
                            </button>
                        )}
                        <button 
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-blue-300 rounded shadow hover:bg-blue-500 focus:shadow-outline focus:outline-none" 
                        >
                            {isLastStep ? "Finish" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
    </main>
    )
}

export default emergencyCreateForm;