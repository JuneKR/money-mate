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


  return (
    <div
      style={{ width: "100%" }}
      className="bg-gray-50 dark:bg-gray-800 py-5 text-black"
    >
      <h1 className="text-black">a</h1>
      <div className="grid grid-cols-4 py-5">
        <div className="text-black h-20 flex items-center justify-center">
          <Avatar>
            <Image src={icon1} alt="Profile Image" priority={true}/>
          </Avatar>
        </div>
        <div className="h-20 flex items-center justify-center text-lg grid grid-rows-2">
          <h1>b</h1>
          <FormHelperText
            id="my-helper-text"
            className="text-gray-400 text-sm flex items-center justify-center"
          >
            {status}
          </FormHelperText>
        </div>
        <div className="h-20 flex items-center justify-center text-gray-400">
          <h1>c น.</h1>
        </div>
        <div className="h-20 flex items-center justify-center">
          <h1>a บาท</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminMutualFundsTable;
