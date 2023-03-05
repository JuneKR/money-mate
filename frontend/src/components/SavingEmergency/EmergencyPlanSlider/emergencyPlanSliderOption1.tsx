import React from 'react';
import ReactSlider from "react-slider";
import "react-step-progress/dist/index.css";
interface EmergencyPlanSliderOption1Props  {
  title: string;
}


const EmergencyPlanSliderOption1: React.FC<EmergencyPlanSliderOption1Props> = ({ title}) => {

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
  
  export default EmergencyPlanSliderOption1;