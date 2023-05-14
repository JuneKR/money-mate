import React, { useRef, useEffect } from "react";
import { Progress, ProgressProps } from "@material-tailwind/react";
interface LandingPageProgressProps {
  title: string;
  progress: string;
}

const LandingPageProgress: React.FC<LandingPageProgressProps> = ({
  progress,
}) => {
  const percentage = (parseFloat(progress) * 100) / 100; // calculate percentage
  const p = percentage.toFixed(2); // format to two decimal places
  return (
    <div className="w-full h-full">
      <div
        style={{ backgroundColor: "#3A3B5A" }}
        className="w-full mb-4 rounded-full h-11"
      >
        <div
          className="flex justify-center h-10 font-bold rounded-full item-center"
          style={{
            width: percentage <= 100 ? `${percentage}%` : "100%", // set width based on percentage up to a maximum of 100%
            backgroundColor: "#64D0F7",
            alignItems: "center",
          }}
        >
          <h1 className="ml-10 text-white">
            {Number(p) <= 100 ? `${p}%` : "100%"}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPageProgress;
