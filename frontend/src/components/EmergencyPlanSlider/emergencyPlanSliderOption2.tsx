import React from 'react';
import ReactSlider from "react-slider";
import "react-step-progress/dist/index.css";
import PageTwo from '@/components/EmergenyPageOne/emergencyGoalForm'
import PageThree from '@/components/EmergenyPageTwo/cEmergencyPlanForm'
import PageFour from '@/components/EmergenyPageThree/sEmergencyPlanForm'
import PageFive from '@/components/EmergenyPageFour/emergencyResultForm'
interface EmergencyPlanSliderOption2Props  {
  title: string;
}


const EmergencyPlanSliderOption2: React.FC<EmergencyPlanSliderOption2Props> = ({title}) => {

    return (
        <div style={{ width: "100%"}} className='text-black'>
            <ReactSlider
            className="customSlider"
            trackClassName="customSlider-track" 
            thumbClassName="customSlider-thumb"
            marks={20}
            min={0}
            max={100}
            />
            
        </div>
        
    );
  };
  
  export default EmergencyPlanSliderOption2;