import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface EmergencyHidingColumnProps {
    title: string;
    packageAllocation: any;
}

const EmergencyHidingColumn1: React.FC<EmergencyHidingColumnProps> = ({ title, packageAllocation}) => {
    const [isHidden, setIsHidden] = useState(true);

    const handleClick = () => {
        setIsHidden(!isHidden);
    };
    return (
    <div className="flex flex-col ">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8 ">
                    <div className="overflow-hidden ">
                        <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                            <th scope="col" className="px-6 py-4">ประเภทกองทุน</th>
                            <th scope="col" className="px-6 py-4">ชื่อย่อกองทุน</th>
                            <th scope="col" className="px-6 py-4">ผลตอบแทน (%)</th>
                            <th scope="col" className="px-6 py-4">สัดส่วนการลงทุน (%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b dark:border-neutral-500">
                                <td className="whitespace-nowrap px-6 py-4 font-medium">{packageAllocation.PolicyDesc}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation.FundAbbrName}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation.OneYearReturns}</td>
                                <td className="whitespace-nowrap px-6 py-4">{packageAllocation.AllocationRatio}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default EmergencyHidingColumn1;