import React, { useRef, useEffect } from 'react';
interface Progress1Props {
    title: string;
}

const Progress1: React.FC<Progress1Props> = (props) => {
    const progress = 50;

    
    return (
      <div>
            <progress value={progress} max="100" />
            <span>{progress}%</span>
      </div>
    );
};

export default Progress1;