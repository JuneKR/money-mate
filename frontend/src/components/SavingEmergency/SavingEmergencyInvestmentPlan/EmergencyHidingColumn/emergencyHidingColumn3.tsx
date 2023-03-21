import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


interface EmergencyHidingColumn3Props {
    title: string;
}

const EmergencyHidingColumn3: React.FC<EmergencyHidingColumn3Props> = ({ title}) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(!isHidden);
    };
    return (
        <div className="relative">
            <div
            className=" px-4 py-2 rounded-t-lg cursor-pointer flex justify-between items-center"
            onClick={handleClick}
            >
            {isHidden ? <ExpandMoreIcon className="text-lg font-bold" /> : <KeyboardArrowUpIcon className="text-lg font-bold" />}
            <span>กองทุนรวมตราสารหนี้</span>
            </div>
            {!isHidden && (
            <div className="grid grid-cols-2 px-4  rounded-b-lg text-gray-500">
                <div className="py-2">
                    T-NM-RMF
                </div>
                <div className="py-2">
                    5%
                </div>
                <div className="py-2">
                    TCMF
                </div>
                <div className="py-2">
                    5%
                </div>
            </div>
            )}
      </div>
  );
};

export default EmergencyHidingColumn3;