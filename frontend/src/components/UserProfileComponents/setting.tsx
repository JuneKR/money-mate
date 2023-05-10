import React, { useState } from "react";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_yk1.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, FormHelperText } from "@mui/material";
interface SettingProps {
  user: User;
  onSave: (updatedUser: User) => void;
}

type User = {
  fullName: string;
  birthDate: string;
  gender: "male" | "female" | "other";
  riskRate: number;
  email: string;
  phoneNumber: string;
};

type UserProfileProps = {
  user: User;
  onSave: (updatedUser: User) => void;
};
const Setting: React.FC<SettingProps> = ({ user, onSave }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [birthDate, setBirthDate] = useState(user.birthDate);
  const [gender, setGender] = useState(user.gender);
  const [riskRate, setRiskRate] = useState(user.riskRate);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedUser: User = {
      fullName,
      birthDate,
      gender,
      riskRate,
      email,
      phoneNumber,
    };

    onSave(updatedUser);
  };
  return (
    <div className="w-full p-10 xl:w-8/12">
      <div
        className="mb-4 text-center sm:text-left"
        style={{ borderRadius: "50%" }}
      >
        <h1 className="pb-2 text-gray-400">รูปโปรไฟล์</h1>
        <Image
          src={icon1}
          alt="Your Image"
          className="pb-3 rounded-full"
          width={100}
          height={100}
        />
      </div>
      <FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "60ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="pb-5">
              <p className="pb-2 text-gray-400">ชื่อจริง</p>
              <TextField
                id="filled-basic"
                label="เจนนี่ คิม"
                variant="standard"
              />
            </div>

            <div className="pb-5">
              <p className="pb-2 text-gray-400">เพศ</p>
              <TextField id="filled-basic" label="หญิง" variant="standard" />
            </div>
            <div className="pb-5">
              <p className="pb-2 text-gray-400">อีเมล</p>
              <TextField
                id="filled-basic"
                label="yokontp6112@gmail.com"
                variant="standard"
              />
            </div>

            <div className="pb-5">
              <p className="pb-2 text-gray-400">โทรศัพท์</p>
              <TextField
                id="filled-basic"
                label="098-750-0198"
                variant="standard"
              />
            </div>
            <div className="pb-5">
              <p className="pb-2 text-gray-400">ระดับความเสี่ยงที่รับได้</p>
              <TextField id="filled-basic" label="5/8" variant="standard" />
              <FormHelperText
                id="my-helper-text"
                className="text-gray-300 hover:text-blue-500"
              >
                หมายเหตุ: คลิกที่นี่เพื่อประเมินความเสี่ยงของคุณ
              </FormHelperText>
            </div>
            <div className="pb-5">
              <p className="pb-2 text-gray-400">วัน/เดือน/ปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker />
              </LocalizationProvider>
            </div>
          </div>
        </Box>
        <div className="py-3">
          <div className="flex grid justify-end grid-cols-2 gap-3">
            <button className="px-4 py-2 font-bold text-black delay-150 bg-blue-300 rounded hover:bg-blue-500">
              ยืนยัน
            </button>
            <button className="px-4 py-2 font-bold text-black delay-150 bg-gray-300 rounded hover:bg-gray-500">
              ยกเลิก
            </button>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default Setting;
