import { useState } from "react";
import { Avatar, FormHelperText } from "@mui/material";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_jm2.jpg";

interface TransactionTableProps {
  title: string;
  transaction: any;
  savingData: any;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  title,
  transaction,
  savingData,

}) => {

  function splitString(str: string): string[] {
    return str.split("T");
  }

  function extractString(str: string): string {
    return str.substring(0, 8);
  }

  function defineText(str: string): string {
    if (str == "deposit") {
      str = "เพิ่มเงินเข้า";
      return str;
    } else {
      str = "ถอนเงินออก";
      return str;
    }
  }

  const splitArray = splitString(transaction.TransactionDate);
  const time = extractString(splitArray[1]);
  const status = defineText(transaction.Type);
  return (
    <div
      style={{ width: "100%"}}
      className="py-5 text-black dark:text-white"
    >
      <h1 className="text-lg font-bold text-black dark:text-white">{splitArray[0]}</h1>
      <div className="grid grid-cols-4 py-5">
        <div className="flex items-center justify-center h-20 text-white">
          <Avatar>
            <Image src={icon1} alt="Profile Image" priority={true}/>
          </Avatar>
        </div>
        <div className="flex grid items-center justify-center h-20 grid-rows-2 text-lg font-bold text-black dark:text-white">
          <h1>{savingData.PlanName}</h1>
          <FormHelperText
            id="my-helper-text"
            className="flex items-center justify-center text-sm text-gray-600"
          >
            {status}
          </FormHelperText>
        </div>
        <div className="flex items-center justify-center h-20 text-gray-600 ">
          <h1>{time} น.</h1>
        </div>
        <div className="flex items-center justify-center h-20 text-2xl font-bold text-black dark:text-white">
          <h1>{transaction.Amount} บาท</h1>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
