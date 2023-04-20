import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box';
import "react-step-progress/dist/index.css";
interface EmergencyInvestmentSliderProps  {
  title: string;
  riskLevel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const EmergencyInvestmentSlider: React.FC<EmergencyInvestmentSliderProps> = ({ title, riskLevel, onChange}) => {
  const [sliderValue, setSliderValue] = useState<number>(Number(riskLevel));
  const marks = [
    {
      value: 1,
      label: 'ระดับที่ 1',
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
      label: 'ระดับที่ 8',
    }
  ];

  function handleSliderChange(event: Event, value: number | number[]) {
    const newValue = value as number;
    setSliderValue(newValue);
    onChange({
      target: {
        value: newValue.toString(),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  function valuetext(value: number) {
    return `${value}°C`;
  }

  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  return (
      <div style={{ width: "100%"}} className='text-black'>
          <Box sx={{ width: "100%" }}>
            <Slider
              // key={sliderValue}
              sx={{
                "& .MuiSlider-markLabel": {
                  color: "white",
                },
              }}
              className="text-white appearance-none h-3 w-full cursor-pointer slider-thumb-green focus:outline-none"
              aria-label="Temperature"
              defaultValue={sliderValue}
              getAriaValueText={valuetext}
              valueLabelFormat={valueLabelFormat}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={8}
              onChange={handleSliderChange}
            />
          </Box>
      </div>  
  );
};

export default EmergencyInvestmentSlider;