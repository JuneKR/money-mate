import React, { useRef, useEffect } from 'react';
import { Progress, ProgressProps } from '@material-tailwind/react';
interface Progress1Props {
    title: string;
}

const Progress1: React.FC<Progress1Props> = (props) => {
    const progress = 50;

    
    return (
      <div className='w-full h-full'>
            <Progress 
            value={progress} 
            color="yellow" 
            label="Completed" 
            style={{width: "100%", height: 50}}
            className="bg-gray-200"
            />
      </div>
    );
};

export default Progress1;