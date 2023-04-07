import React, { useRef, useEffect } from "react";
import { Progress, ProgressProps } from "@material-tailwind/react";
interface Progress1Props {
  title: string;
  progress: string;
}

const Progress1: React.FC<Progress1Props> = ({ progress, title }) => {
  return (
    <div className="w-full h-full">
      <div
        style={{ backgroundColor: "#3A3B5A" }}
        className="w-full rounded-full h-11 mb-4"
      >
        
        <div
          className="h-10 rounded-full flex justify-center item-center font-bold"
          style={{
            width: progress,
            backgroundColor: "#64D0F7",
            alignItems: "center",
          }}
        >
          <h1 className="ml-10">{progress}</h1>
        </div>
      </div>
    </div>
  );
};

export default Progress1;
