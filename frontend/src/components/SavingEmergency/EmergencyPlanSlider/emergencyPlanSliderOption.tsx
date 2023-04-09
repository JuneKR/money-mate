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
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "",
    },
    {
      value: 5,
      label: "",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "",
    },
    {
      value: 8,
      label: "",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "",
    },
    {
      value: 11,
      label: "",
    },
    {
      value: 12,
      label: "12",
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
          className="text-white appearance-none h-3 w-full cursor-pointer slider-thumb-green focus:outline-none"
          aria-label="Temperature"
          defaultValue={sliderValue}
          getAriaValueText={valuetext}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={3}
          max={12}
          onChange={handleSliderChange}
        />
      </Box>
    </div>
  );
};

export default EmergencyPlanSliderOption;
