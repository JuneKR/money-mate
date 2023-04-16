import React from "react";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import "react-step-progress/dist/index.css";
interface EmergencyPlanSliderOption1Props {
  title: string;
  months: string;
  disabled?: boolean;
}

const EmergencyPlanSliderOption1: React.FC<EmergencyPlanSliderOption1Props> = ({
  title,
  months,
  disabled,
}) => {
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
  function valuetext(value: number) {
    return `${value}°C`;
  }
  function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }
  const currentval = Number(months);
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ width: "100%",color: "white", }}>
        <Slider
        sx={{
          "& .MuiSlider-markLabel": {
            color: "white",
          },
        }}
          className="appearance-none h-3 w-full cursor-pointer slider-thumb-green focus:outline-none"
          aria-label="Temperature"
          defaultValue={currentval}
          getAriaValueText={valuetext}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          step={1}
          marks={marks}
          min={1}
          max={12}
          disabled={disabled}
        />
      </Box>
    </div>
  );
};

export default EmergencyPlanSliderOption1;
