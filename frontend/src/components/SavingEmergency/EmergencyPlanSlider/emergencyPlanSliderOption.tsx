import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import "react-step-progress/dist/index.css";
interface EmergencyPlanSliderOptionProps {
  title: string;
  months: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmergencyPlanSliderOption: React.FC<EmergencyPlanSliderOptionProps> = ({
  title,
  months,
  onChange,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(Number(months));
  const marks = [
    {
      value: 1,
      label: "1 เดือน",
    },
    {
      value: 2,
      label: "2 เดือน",
    },
    {
      value: 3,
      label: "3 เดือน",
    },
    {
      value: 4,
      label: "4 เดือน",
    },
    {
      value: 5,
      label: "5 เดือน",
    },
    {
      value: 6,
      label: "6 เดือน",
    },
    {
      value: 7,
      label: "7 เดือน",
    },
    {
      value: 8,
      label: "8 เดือน",
    },
    {
      value: 9,
      label: "9 เดือน",
    },
    {
      value: 10,
      label: "10 เดือน",
    },
    {
      value: 11,
      label: "11 เดือน",
    },
    {
      value: 12,
      label: "12 เดือน",
    },
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
    console.log(value);
    marks.findIndex((mark) => mark.value === value) + 1;
    return value;
  }

  return (
    <div style={{ width: "100%" }} className="text-black">
      <Box sx={{ width: "100%" }}>
        <Slider
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
          step={3}
          marks={marks}
          min={1}
          max={12}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
};

export default EmergencyPlanSliderOption;
