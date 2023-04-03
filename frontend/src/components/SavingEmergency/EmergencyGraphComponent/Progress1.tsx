import React from "react";
interface Progress1Props {
  title: string;
  progress: string;
}

const Progress1: React.FC<Progress1Props> = ({ progress, title }) => {
  return (
    <div >
      <div className="w-full bg-gray-200 rounded h-10 mb-4 dark:bg-gray-700">
        <div
          className="h-10 rounded dark:bg-gray-300 text-black flex item-center justify-center"
          style={{ width: progress, backgroundColor: "#FEF5AC"}}
        >
          {" "}
          {progress}
        </div>
      </div>
    </div>
  );
};

export default Progress1;
