import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface EmergencyHidingColumn1Props {
    title: string;
}

const EmergencyHidingColumn1: React.FC<EmergencyHidingColumn1Props> = ({ title}) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(!isHidden);
    };
    return (
        <div className="relative">
            <div
            className="px-4 py-2 rounded-t-lg cursor-pointer flex justify-between items-center"
            onClick={handleClick}
            >
            {isHidden ? <ExpandMoreIcon className="text-lg font-bold" /> : <KeyboardArrowUpIcon className="text-lg font-bold" />}
            <span>กองทุนรวมผสม</span>
            
            </div>
            {!isHidden && (
            <div className="grid grid-cols-2 px-5  rounded-b-lg text-gray-500">
                <div className="py-2">
                    ABFC
                </div>
                <div className="py-2">
                    20%
                </div>
                <div className="py-2">
                    ASP-MRF
                </div>
                <div className="py-2">
                    10%
                </div>
            </div>
            )}
      </div>
  );
};

export default EmergencyHidingColumn1;