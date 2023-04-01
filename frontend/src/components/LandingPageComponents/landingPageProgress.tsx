import React, { useRef, useEffect } from 'react';
import { Progress, ProgressProps } from '@material-tailwind/react';
interface LandingPageProgressProps {
    title: string;
    progress: string
}

const LandingPageProgress: React.FC<LandingPageProgressProps> = ({progress}) => {
    

    
    return (
      <div className='w-full h-full'>
            {/* <Progress 
            value={progress} 
            color="blue" 
            label="Completed" 
            style={{width: '100%', height: '100%'}}
            className="bg-gray-200"
            /> */}
            <div className="w-full bg-gray-200 rounded h-5 mb-4 dark:bg-gray-700">
                <div className="h-5 rounded dark:bg-gray-300" style={{width: progress, backgroundColor: "#085385"}}></div>
            </div>
      </div>
    );
};

export default LandingPageProgress;