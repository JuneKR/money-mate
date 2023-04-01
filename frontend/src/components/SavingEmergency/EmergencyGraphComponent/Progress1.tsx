import React, { useRef, useEffect } from 'react';
import { Progress, ProgressProps } from '@material-tailwind/react';
interface Progress1Props {
    title: string;
}

const Progress1: React.FC<Progress1Props> = (props) => {
    const progress = 50;

    
    return (
      <div className='w-full h-full'>
            <div className="w-full bg-gray-200 rounded h-10 mb-4 dark:bg-gray-700">
                <div className="h-10 rounded dark:bg-gray-300" style={{width: progress, backgroundColor: "#FEF5AC"}}></div>
            </div>
      </div>
    );
};

export default Progress1;