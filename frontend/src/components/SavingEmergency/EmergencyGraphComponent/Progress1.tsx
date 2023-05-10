import React, { useRef, useEffect } from "react";
import { Progress, ProgressProps } from "@material-tailwind/react";
interface Progress1Props {
  title: string;
  progress: string;
}

const Progress1: React.FC<Progress1Props> = ({ progress, title }) => {
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
          <h1 className="ml-10 text-white">{p}</h1>
        </div>
      </div>
    </div>
  );
};

export default Progress1;
