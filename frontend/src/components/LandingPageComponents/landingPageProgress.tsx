import React, { useRef, useEffect } from "react";
import { Progress, ProgressProps } from "@material-tailwind/react";
interface LandingPageProgressProps {
  title: string;
  progress: string;
}

const LandingPageProgress: React.FC<LandingPageProgressProps> = ({
  progress,
}) => {
  const p = parseFloat(progress).toFixed(2)
  return (
    <div className="w-full h-full">
      <div
        style={{ backgroundColor: "#3A3B5A" }}
        className="w-full mb-4 rounded-full h-11"
      >
        <div
          className="flex justify-center h-10 font-bold rounded-full item-center"
          style={{
            width: progress,
            backgroundColor: "#64D0F7",
            alignItems: "center",
          }}
        >
          <h1 className="ml-10">{p}</h1>
        </div>
      </div>
    </div>
  );
};

export default LandingPageProgress;
