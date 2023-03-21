import React, { useRef, useEffect } from 'react';
import { Progress, ProgressProps } from '@material-tailwind/react';
interface LandingPageProgressProps {
    title: string;
    progress: number
}

const LandingPageProgress: React.FC<LandingPageProgressProps> = ({progress}) => {
    

    
    return (
      <div className='w-full h-full'>
            <Progress 
            value={progress} 
            color="blue" 
            label="Completed" 
            style={{width: '100%', height: '100%'}}
            className="bg-gray-200"
            />
      </div>
    );
};

export default LandingPageProgress;