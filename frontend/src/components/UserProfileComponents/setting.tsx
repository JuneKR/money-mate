import React, { useState } from "react";
import Image from "next/image";
import icon1 from "@/images/Profile/img_pf_jm2.jpg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FormControl, FormHelperText } from "@mui/material";
interface SettingProps {
  
  userProfileData: any;
}

const Setting: React.FC<SettingProps> = ({ userProfileData }) => {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [riskRate, setRiskRate] = useState("");
  const [email2, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const urlServer = "http://localhost:8080/";

  const updateUserProfile = async () => {
    const updateUserProfileData = {
      first_name: fullName,
      last_name: "milionairegirl",
      date_of_birth: "1998-08-08",
      gender: gender,
      risk_level: riskRate,
      email: email2,
      password: "user123456",
      confPassword: "user123456"
    };

    try {
      console.log("Called");
      console.log(`${urlServer}user/${userProfileData.User_ID}`);
      const response = await fetch(
        `${urlServer}user/${userProfileData.User_ID}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateUserProfileData),
          credentials: "include",
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("done........................");
        console.log(updateUserProfileData);
        // setShowCongratulatoryMessage(true);
      } else {
        const errorData = await response.json();
        console.log(errorData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserProfile();
  };
  return (
    <div className="w-full xl:w-8/12 p-10">
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
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="pb-5">
              <p className="pb-2 text-gray-400">ชื่อจริง</p>
              <TextField
                id="filled-basic"
                label={userProfileData.FirstName}
                variant="standard"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="pb-5">
              <p className="pb-2 text-gray-400">เพศ</p>
              <TextField
                id="filled-basic"
                label={userProfileData.Gender}
                variant="standard"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="pb-5">
              <p className="pb-2 text-gray-400">อีเมล</p>
              <TextField
                id="filled-basic"
                label={userProfileData.Email}
                variant="standard"
                value={email2}
                onChange={(e) => setEmail(e.target.value)}
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
              <TextField
                id="filled-basic"
                label={userProfileData.RiskLevel}
                variant="standard"
                value={riskRate}
                onChange={(e) => setRiskRate(e.target.value)}
              />
              <FormHelperText
                id="my-helper-text"
                className="text-gray-300 hover:text-blue-500"
              >
                หมายเหตุ: คลิกที่นี่เพื่อประเมินความเสี่ยงของคุณ
              </FormHelperText>
            </div>
            <div className="pb-5">
              <p className="pb-2 text-gray-400">วัน/เดือน/ปีเกิด</p>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                  label={userProfileData.DateOfBirth}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div className="py-3">
            <div className="flex justify-end grid grid-cols-2 gap-3">
              <button className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded delay-150">
                ยืนยัน
              </button>
            </div>
          </div>
        </Box>
      </FormControl>
    </div>
  );
};

export default Setting;
