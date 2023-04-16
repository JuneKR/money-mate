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
      className="py-5 text-white"
    >
      <h1 className="text-lg text-white font-bold">{splitArray[0]}</h1>
      <div className="grid grid-cols-4 py-5">
        <div className="text-white h-20 flex items-center justify-center">
          <Avatar>
            <Image src={icon1} alt="Profile Image" priority={true}/>
          </Avatar>
        </div>
        <div className="h-20 flex items-center justify-center text-lg text-white font-bold grid grid-rows-2">
          <h1>{savingData.PlanName}</h1>
          <FormHelperText
            id="my-helper-text"
            className="text-gray-400 text-sm flex items-center justify-center"
          >
            {status}
          </FormHelperText>
        </div>
        <div className="h-20 flex items-center justify-center text-gray-400 ">
          <h1>{time} น.</h1>
        </div>
        <div className="h-20 flex items-center justify-center text-2xl text-white font-bold">
          <h1>{transaction.Amount} บาท</h1>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
