import { useState } from "react";
import { Avatar, FormHelperText } from "@mui/material";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_jm2.jpg";

interface AdminMutualFundsTableProps {
  title: string;
  mutualFundsData: any;
}

const AdminMutualFundsTable: React.FC<AdminMutualFundsTableProps> = ({
  title,
  mutualFundsData,
}) => {

console.log(mutualFundsData)
  return (
    <div
      style={{ width: "100%" }}
      className="py-5 text-white"
    >
      <h1 className="text-white">ข้อมูลของกองทุน ณ วันที่ {mutualFundsData.LastUpdate}</h1>
      <div className="grid grid-cols-4 py-5">
        <div className="flex items-center justify-center h-20 text-white">
          <Avatar>
            <Image src={icon1} alt="Profile Image" priority={true}/>
          </Avatar>
        </div>
        <div className="flex grid items-center justify-center h-20 grid-rows-3 text-lg">
          <h1>ชื่อกองทุน: {mutualFundsData.FundName}</h1>
          <FormHelperText
            id="my-helper-text"
            className="flex items-center justify-center text-sm text-gray-400"
          >
            ชื่อย่อกองทุน: {mutualFundsData.FundAbbrName}
          </FormHelperText>
        </div>
        <div className="flex items-center justify-center h-20 text-white">
          <h1>ระดับความเสี่ยง: {mutualFundsData.RiskSpectrum}</h1>
        </div>
        <div className="flex items-center justify-center h-20">
          <h1>ประเภทกองทุน: {mutualFundsData.SpecDesc}</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminMutualFundsTable;
