import React from 'react';
import ReactSlider from "react-slider";
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import "react-step-progress/dist/index.css";
interface EmergencyPlanSliderOption3Props  {
  title: string;
}


const EmergencyPlanSliderOption3: React.FC<EmergencyPlanSliderOption3Props> = ({title}) => {
  const marks = [
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '',
    },
    {
      value: 5,
      label: '',
    },
    {
      value: 6,
      label: '6',
    },
    {
      value: 7,
      label: '',
    },
    {
      value: 8,
      label: '',
    },
    {
      value: 9,
      label: '9',
    },
    {
      value: 10,
      label: '',
    },
    {
      value: 11,
      label: '',
    },
    {
      value: 12,
      label: '12',
    },
  ];
  function valuetext(value: number) {
    return `${value}°C`;
  }
  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
    return (
        <div style={{ width: "100%"}} className='text-black'>
            {/* <ReactSlider
            className="customSlider"
            trackClassName="customSlider-track" 
            thumbClassName="customSlider-thumb"
            marks={20}
            min={0}
            max={100}
            /> */}
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Temperature"
                defaultValue={12}
                getAriaValueText={valuetext}
                valueLabelFormat={valueLabelFormat}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={3}
                max={12}
              />
            </Box>
            
        </div>
        
    );
  };
  
  export default EmergencyPlanSliderOption3;