import React from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import "react-step-progress/dist/index.css";
interface EmergencyPlanSliderOption1Props  {
  title: string;
  months: string;
  disabled?: boolean;
}


const EmergencyPlanSliderOption1: React.FC<EmergencyPlanSliderOption1Props> = ({ title, months, disabled}) => {
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
  const currentval = Number(months);
    return (
        <div style={{ width: "100%"}} className='text-black'>
            <Box sx={{ width: "100%" }}>
              <Slider
                aria-label="Temperature"
                defaultValue={currentval}
                getAriaValueText={valuetext}
                valueLabelFormat={valueLabelFormat}
                valueLabelDisplay="auto"
                step={1}
                marks={marks}
                min={3}
                max={12}
                disabled={disabled}
              />
            </Box>
            
        </div>
        
    );
  };
  
  export default EmergencyPlanSliderOption1;