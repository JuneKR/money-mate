import React from "react";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
interface PasswordProps {
  title: string;
}

const Password: React.FC<PasswordProps> = ({ title }) => {
  return (
    <div className="w-full xl:w-8/12 p-10">
      <FormControl>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "20ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="grid grid-rows-3 gap-4">
            <div>
              <TextField
                id="outlined-password-input"
                label="รหัสผ่านปัจจุบัน"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <div>
              <TextField
                id="outlined-password-input"
                label="รหัสผ่านใหม่"
                type="password"
                autoComplete="current-password"
              />
            </div>
            <div>
              <TextField
                id="outlined-password-input"
                label="ยืนยันรหัสผ่านใหม่"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </div>
        </Box>

        <div className="py-3">
          <div className="flex justify-end grid grid-cols-2 gap-3">
            <button className="bg-blue-300 hover:bg-blue-500 text-black font-bold py-2 px-4 rounded delay-150">
              ยืนยัน
            </button>
            <button className="bg-gray-300 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded delay-150">
              ยกเลิก
            </button>
          </div>
        </div>
      </FormControl>
    </div>
  );
};

export default Password;
